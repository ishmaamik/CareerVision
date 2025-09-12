import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import { Groq } from "groq-sdk";
import {
    Code2,
    Copy,
    Download,
    Play,
    RefreshCw,
    Trash2,
    Wand2,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import io from "socket.io-client";
const languageExamples = {
    c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    python3: `print("Hello, World!")`,
    javascript: `console.log("Hello, World!");`,
    typescript: `const greeting: string = "Hello, World!";
console.log(greeting);`,
    rust: `fn main() {
    println!("Hello, World!");
}`,
    go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
};

export default function Compiler({ roomId, username }) {
    const [code, setCode] = useState(languageExamples.python3);
    const socketRef = useRef(null);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [groqAnalysis, setGroqAnalysis] = useState("");
    const [language, setLanguage] = useState("python3");
    const [loading, setLoading] = useState(false);
    const [inputNeeded, setInputNeeded] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [theme, setTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(14);
    const [userCount, setUserCount] = useState(1);
    const [autoSave, setAutoSave] = useState(true);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [panelHeight, setPanelHeight] = useState(20);
    const [isDragging, setIsDragging] = useState(false);
    const { currentUser } = useSelector((state) => state.user);

    const languages = [
        { id: "c", name: "C", icon: "🎯" },
        { id: "cpp", name: "C++", icon: "⚡" },
        { id: "java", name: "Java", icon: "☕" },
        { id: "python3", name: "Python", icon: "🐍" },
    ];

    const inputKeywords = {
        c: ["scanf"],
        cpp: ["cin"],
        java: ["Scanner"],
        python3: ["input"],
    };

    useEffect(() => {
        const socket = io("https://socket-1-pmz3.onrender.com");
        socketRef.current = socket;

        // Join the room when component mounts
        socket.emit("join-room", { roomId, username });

        socket.on("user-count", (count) => {
            setUserCount(count);
        });

        socket.on("receive-changes", (delta) => {
            setCode(delta); // Sync the changes when received
        });

        // When changing editor type, sync the content
        socket.on("load-document", (document) => {
            setCode(document);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [roomId, username]);

    const handleEditorChange = (value) => {
        setCode(value);

        // Emit changes to the server for collaboration
        if (socketRef.current) {
            socketRef.current.emit("send-changes", { delta: value, roomId });
        }

        // Save code to localStorage (for autoSave)
        if (autoSave) {
            localStorage.setItem(`code-${language}`, value);
        }

        // Check for input functions (optional, based on your requirements)
        checkForInputFunctions();
    };


    useEffect(() => {
        setCode(languageExamples[language]); // Always set to languageExamples
    }, [language]);



    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
        setCode(languageExamples[newLanguage]);
        setOutput("");
        setGroqAnalysis("");
    };

    const checkForInputFunctions = () => {
        const keywords = inputKeywords[language] || [];
        const needsInput = keywords.some((keyword) => code.includes(keyword));
        setInputNeeded(needsInput);
        return needsInput;
    };

    const groq = new Groq({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    const compileCode = async () => {
        if (inputNeeded && !input) {
            alert("This code requires input. Please provide input data.");
            return;
        }

        setLoading(true);
        try {
            // Execute the code
            const executionResponse = await axios.post("https://serverz-78ek.onrender.com/api/execute", {
                script: code,
                language: language,
                input: input,
            });
            const executionOutput = executionResponse.data.output;
            setOutput(executionOutput);
            // Format the current date in `dd-mm-yyyy` format
            const now = new Date();
            const formattedDate = `${now.getDate().toString().padStart(2, "0")}-${(
                now.getMonth() + 1
            )
                .toString()
                .padStart(2, "0")}-${now.getFullYear()}`;

            // Save run details
            try {
                await axios.post("https://serverz-78ek.onrender.com/api/run", {
                    userId: currentUser._id,
                    date: formattedDate,
                    language,
                });
                console.log("Run details saved successfully!");
            } catch (saveError) {
                console.error("Error saving run details:", saveError);
                alert("Failed to save run details. Please try again.");
            }

            // Analyze the code using Groq AI
            const analysisResponse = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                temperature: 0.7,
                max_tokens: 1024,
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a programming expert. Analyze the provided code for its space and time complexity. Suggest any potential improvements for performance optimization in a clear and concise way. Format your response in markdown.",
                    },
                    {
                        role: "user",
                        content: `Here is the code:\n\nLanguage: ${language}\n\nCode:\n${code}`,
                    },
                ],
            });

            const aiAnalysis =
                analysisResponse.choices[0]?.message?.content ||
                "No analysis available.";
            setGroqAnalysis(aiAnalysis);
        } catch (error) {
            setOutput("Error: Failed to execute code. Please try again.");
            setGroqAnalysis("Error: Failed to analyze code.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const container = document.getElementById("main-content");
        if (!container) return;

        const containerHeight = container.clientHeight;
        const mouseY = e.clientY;
        const containerTop = container.getBoundingClientRect().top;
        const relativeY = mouseY - containerTop;

        // Convert to percentage and clamp between 20% and 70%
        const newHeight = Math.min(
            Math.max((1 - relativeY / containerHeight) * 100, 20),
            70
        );
        setPanelHeight(newHeight);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isDragging]);

    const copyCode = () => {
        navigator.clipboard.writeText(code);
    };

    const clearOutput = () => {
        setOutput("");
        setInput("");
        setGroqAnalysis("");
    };

    const downloadCode = () => {
        const extensions = {
            c: ".c",
            cpp: ".cpp",
            java: ".java",
            python3: ".py",
        };

        const blob = new Blob([code], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `code${extensions[language]}`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleEditorDidMount = (editor, monaco) => {
        monaco.editor.defineTheme("customDark", {
            base: "vs-dark",
            inherit: true,
            rules: [
                { token: "comment", foreground: "6A9955", fontStyle: "italic" },
                { token: "keyword", foreground: "569CD6", fontStyle: "bold" },
                { token: "string", foreground: "CE9178" },
                { token: "function", foreground: "DCDCAA" },
                { token: "variable", foreground: "9CDCFE" },
                { token: "number", foreground: "B5CEA8" },
            ],
            colors: {
                "editor.background": "#1E1E1E",
                "editor.foreground": "#D4D4D4",
                "editor.lineHighlightBackground": "#2F3139",
                "editorLineNumber.foreground": "#858585",
            },
        });

        monaco.editor.defineTheme("customLight", {
            base: "vs",
            inherit: true,
            rules: [
                { token: "comment", foreground: "008000", fontStyle: "italic" },
                { token: "keyword", foreground: "0000FF", fontStyle: "bold" },
                { token: "string", foreground: "A31515" },
                { token: "function", foreground: "795E26" },
            ],
            colors: {
                "editor.background": "#FFFFFF",
                "editor.foreground": "#000000",
                "editor.lineHighlightBackground": "#F7F7F7",
                "editorLineNumber.foreground": "#237893",
            },
        });

        monaco.editor.setTheme(theme === "vs-dark" ? "customDark" : "customLight");
    };

    return (
        <div className="flex min-h-screen bg-yellow-50 dark:bg-[#18181b] font-['Poppins'] overflow-hidden">
            <div
                id="main-content"
                className="flex-1 transition-all duration-300"
                style={{ marginLeft: isExpanded ? "0px" : "80px" }}
            >
                <div className="flex flex-col h-screen">
                    {/* Header */}
                    <div
                        className={`${theme === "vs-dark"
                            ? "bg-black border-[#404040]"
                            : "bg-white border-gray-200"
                            } p-4 border-b shadow-sm flex-none`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Code2 className="text-yellow-500" size={24} />
                                <h1
                                    className={`text-xl font-semibold ${theme === "vs-dark" ? "text-white" : "text-gray-800"
                                        }`}
                                >
                                    Online Code Compiler
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <select
                                    value={language}
                                    onChange={handleLanguageChange}
                                    className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${theme === "vs-dark"
                                        ? "bg-[#3C3C3C] text-white border-[#505050]"
                                        : "bg-white text-gray-800 border-gray-300"
                                        }`}
                                >
                                    {languages.map((lang) => (
                                        <option key={lang.id} value={lang.id}>
                                            {lang.icon} {lang.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() =>
                                        setTheme(theme === "vs-dark" ? "vs" : "vs-dark")
                                    }
                                    className={`p-2 rounded-lg transition-colors ${theme === "vs-dark"
                                        ? "bg-[#3C3C3C] text-white hover:bg-[#4C4C4C]"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    <RefreshCw size={20} />
                                </button>
                                <button
                                    onClick={downloadCode}
                                    className={`p-2 rounded-lg transition-colors ${theme === "vs-dark"
                                        ? "bg-[#3C3C3C] text-white hover:bg-[#4C4C4C]"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    title="Download Code"
                                >
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex flex-col flex-grow h-[calc(100vh-4rem)] overflow-hidden">
                        {/* Editor Section - Fixed 60% height */}
                        <div className="h-[110%] relative">
                            <MonacoEditor
                                height="100%"
                                defaultLanguage={language}
                                language={language}
                                theme={theme === "vs-dark" ? "customDark" : "customLight"}
                                value={code}
                                onChange={handleEditorChange}
                                onMount={handleEditorDidMount}
                                options={{
                                    fontSize: fontSize,
                                    minimap: { enabled: true },
                                    scrollBeyondLastLine: false,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    wordWrap: "on",
                                    folding: true,
                                    automaticLayout: true,
                                    lineHeight: 21,
                                    suggestOnTriggerCharacters: true,
                                    formatOnPaste: true,
                                    formatOnType: true,
                                }}
                            />
                            <div className="absolute bottom-4 right-4 flex space-x-2">
                                <button
                                    onClick={copyCode}
                                    className={`p-2 rounded-lg transition-colors ${theme === "vs-dark"
                                        ? "bg-[#3C3C3C] text-white hover:bg-[#4C4C4C]"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    title="Copy Code"
                                >
                                    <Copy size={20} />
                                </button>
                                <button
                                    onClick={compileCode}
                                    disabled={loading}
                                    className={`p-2 rounded-lg ${loading
                                        ? "bg-yellow-600 cursor-not-allowed"
                                        : "bg-yellow-500 hover:bg-yellow-600"
                                        } text-black transition-colors flex items-center space-x-2`}
                                    title="Run Code"
                                >
                                    <Play size={20} />
                                    <span>{loading ? "Running..." : "Run"}</span>
                                </button>
                            </div>
                        </div>
                        <div
                            className={`h-1 cursor-row-resize ${theme === "vs-dark" ? "bg-[#404040]" : "bg-gray-200"
                                } hover:bg-yellow-500 transition-colors`}
                            onMouseDown={handleMouseDown}
                        />

                        <div
                            className={`${theme === "vs-dark"
                                ? "bg-[#2D2D2D] border-[#404040]"
                                : "bg-gray-50 border-gray-200"
                                } border-t flex-none`}
                            style={{ height: `${panelHeight}%` }}
                        >
                            <div className="flex h-[calc(100%-2rem)]">
                                {/* Input Panel */}
                                {inputNeeded && (
                                    <div
                                        className={`w-1/2 ${theme === "vs-dark"
                                            ? "border-[#404040]"
                                            : "border-gray-200"
                                            } border-r p-4`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h2
                                                className={`font-medium ${theme === "vs-dark" ? "text-white" : "text-gray-800"
                                                    }`}
                                            >
                                                Input
                                            </h2>
                                        </div>
                                        <textarea
                                            className={`w-full h-[calc(100%-2rem)] p-2 rounded border resize-none focus:outline-none focus:border-yellow-500 ${theme === "vs-dark"
                                                ? "bg-[#1E1E1E] text-white border-[#404040]"
                                                : "bg-white text-gray-800 border-gray-300"
                                                }`}
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Enter input for your program..."
                                        />
                                    </div>
                                )}

                                {/* Output Panel */}
                                <div
                                    className={`${inputNeeded ? "w-1/2" : "flex-1"} p-4 ${showAnalysis ? "border-r" : ""
                                        } ${theme === "vs-dark" ? "border-[#404040]" : "border-gray-200"
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <h2
                                            className={`font-medium ${theme === "vs-dark" ? "text-white" : "text-black"
                                                }`}
                                        >
                                            Output
                                        </h2>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setShowAnalysis(!showAnalysis)}
                                                className={`p-1 rounded ${theme === "vs-dark"
                                                    ? "text-gray-400 hover:text-white"
                                                    : "text-gray-500 hover:text-gray-700"
                                                    } transition-colors flex items-center space-x-1`}
                                                title="Toggle Analysis"
                                            >
                                                <Wand2 size={16} />
                                                <span className="text-sm">Analysis</span>
                                            </button>
                                            <button
                                                onClick={clearOutput}
                                                className={`p-1 rounded ${theme === "vs-dark"
                                                    ? "text-gray-400 hover:text-white"
                                                    : "text-gray-500 hover:text-gray-700"
                                                    } transition-colors`}
                                                title="Clear Output"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className={`h-[calc(100%-2rem)] p-2 rounded border overflow-y-auto ${theme === "vs-dark"
                                            ? "bg-[#18181b] text-white border-[#404040]"
                                            : "bg-white text-black border-gray-300"
                                            }`}
                                    >
                                        <pre className="whitespace-pre-wrap font-mono text-sm">
                                            {output || "Output will appear here..."}
                                        </pre>
                                    </div>
                                </div>

                                {/* Analysis Panel - Conditional Render */}
                                {showAnalysis && (
                                    <div className="w-1/2 p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h2
                                                className={`font-medium ${theme === "vs-dark" ? "text-white" : "text-black"
                                                    }`}
                                            >
                                                Code Analysis
                                            </h2>
                                        </div>
                                        <div
                                            className={`h-[calc(100%-2rem)] p-4 rounded border overflow-y-auto ${theme === "vs-dark"
                                                ? "bg-[#18181b] text-white border-[#404040]"
                                                : "bg-white text-black border-gray-300"
                                                }`}
                                        >
                                            <ReactMarkdown
                                                className={`prose ${theme === "vs-dark" ? "prose-invert" : ""
                                                    } max-w-none prose-sm`}
                                            >
                                                {groqAnalysis || "Code analysis will appear here..."}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}