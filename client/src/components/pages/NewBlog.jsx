import React, { useEffect, useRef, useState } from 'react'
import * as fabric from 'fabric'
import { FaFont, FaSave, FaTrash } from 'react-icons/fa'

const NewBlog = ({ socket, roomId }) => {
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const [tool, setTool] = useState("text");

    useEffect(() => {
        // Make sure we have both the DOM ref and socket before creating canvas
        if (!canvasRef.current) return;

        // Create canvas with initial dimensions
        const canvasWidth = window.innerWidth * 0.65;
        const canvasHeight = window.innerHeight * 0.6;

        const canvas = new fabric.Canvas(canvasRef.current, {
            width: canvasWidth,
            height: canvasHeight,
            backgroundColor: "white",
        });

        fabricCanvasRef.current = canvas;

        // Resize handler
        const handleResize = () => {
            if (fabricCanvasRef.current) {
                const canvas = fabricCanvasRef.current;
                canvas.setWidth(window.innerWidth * 0.65);
                canvas.setHeight(window.innerHeight * 0.6);
                canvas.renderAll();
            }
        };

        window.addEventListener("resize", handleResize);

        // Clean up function
        return () => {
            window.removeEventListener("resize", handleResize);
            if (fabricCanvasRef.current) {
                fabricCanvasRef.current.dispose();
                fabricCanvasRef.current = null;
            }
        };
    }, []);



    const addText = () => {
        if (!fabricCanvasRef.current) return;

        const canvas = fabricCanvasRef.current;
        const text = new fabric.IText("Type here", {
            left: canvas.width / 2 - 50,
            top: canvas.height / 2 - 20,
            fill: 'black',
            fontSize: 20,
        });

        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();

        if (socket) {
            socket.emit("draw", { drawLine: canvas.toJSON(), roomId });
        }
    };

    const clearCanvas = () => {
        if (!fabricCanvasRef.current) return;

        const canvas = fabricCanvasRef.current;
        canvas.clear();
        canvas.setBackgroundColor("white", canvas.renderAll.bind(canvas));

        if (socket) {
            socket.emit("draw", { drawLine: canvas.toJSON(), roomId });
        }
    };

    const saveCanvas = () => {
        if (!fabricCanvasRef.current) return;

        const canvas = fabricCanvasRef.current;
        const dataUrl = canvas.toDataURL({ format: "png" });
        saveAs(
            dataUrl,
            `whiteboard-${roomId}-${new Date().toISOString().slice(0, 10)}.png`
        );
    };


    return (
        <>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex space-x-4">
                        
                        <button
                            onClick={() => {
                                setTool("text");
                                addText();
                            }}
                            className={`p-2 rounded transition-colors bg-white hover:bg-gray-100`}
                            title="Add Text"
                        >
                            <FaFont />
                        </button>
                        
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={saveCanvas}
                            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                            title="Save Whiteboard"
                        >
                            <FaSave />
                        </button>
                        <button
                            onClick={clearCanvas}
                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            title="Clear Whiteboard"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-hidden flex justify-center items-center bg-gray-100 p-4">
                    <div className="border border-gray-300 shadow-lg">
                        <canvas ref={canvasRef} id="whiteboard-canvas" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewBlog;