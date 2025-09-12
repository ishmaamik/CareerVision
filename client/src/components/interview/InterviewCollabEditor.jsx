import React, { useState, useEffect, useRef } from 'react';
import { 
  FaUsers, 
  FaCopy, 
  FaCheck, 
  FaEdit, 
  FaPaintBrush, 
  FaCode 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import InterviewSocket from '../../api/socket/interviewSocket.js';
import Whiteboard from '../pages/Whiteboard.jsx';
import MonacoEditor from '@monaco-editor/react';
import { useSelector } from 'react-redux';

const InterviewCollabEditor = ({ roomId, username }) => {
  const { user } = useSelector((state) => state.user);
  const [userCount, setUserCount] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [editorType, setEditorType] = useState('text');
  const [code, setCode] = useState('# Start your interview preparation here...');
  const [theme, setTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('python');

  const languages = [
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'javascript', name: 'JavaScript', icon: '✨' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'cpp', name: 'C++', icon: '⚡' }
  ];

  useEffect(() => {
    // Connect to socket
    const socket = InterviewSocket.connect(roomId, username);

    // Setup event listeners
    InterviewSocket.on('content-change', (delta) => {
      setCode(delta);
    });

    // User count tracking
    socket.on('user-count', (count) => {
      setUserCount(count);
    });

    // Cleanup on unmount
    return () => {
      InterviewSocket.disconnect();
    };
  }, [roomId, username]);

  const handleEditorChange = (value) => {
    setCode(value);
    // Send changes to other users
    InterviewSocket.sendChanges(roomId, value);
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy room ID:", err);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-50 dark:from-[#18181b] dark:to-black py-8 px-6 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[95%] mx-auto"
      >
        <div className="flex gap-6 ml-12">
          {/* Editor Section */}
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(237,211,14,0.5)] overflow-hidden border border-yellow-100"
          >
            {/* Header Section */}
            <div className="px-8 py-6 border-b border-yellow-200 bg-gradient-to-r from-white via-yellow-50 to-white">
              <div className="flex justify-between items-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-4"
                >
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <FaUsers className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                      Interview Preparation Room
                    </h2>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                      {userCount} active collaborators
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-white px-4 py-2.5 rounded-xl border border-yellow-200">
                    <span className="text-sm font-medium text-gray-700">
                      Room:
                    </span>
                    <code className="px-3 py-1.5 bg-white rounded-lg text-sm font-mono border border-yellow-200 shadow-sm">
                      {roomId}
                    </code>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyRoomId}
                      className="p-2 hover:bg-yellow-100 rounded-full transition-all duration-200"
                      title="Copy room ID"
                    >
                      {isCopied ? (
                        <FaCheck className="text-green-500 h-4 w-4" />
                      ) : (
                        <FaCopy className="text-yellow-600 h-4 w-4" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEditorType('text')}
                    className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                      editorType === 'text'
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <FaEdit className="h-4 w-4" />
                    Text Editor
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEditorType('whiteboard')}
                    className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                      editorType === 'whiteboard'
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <FaPaintBrush className="h-4 w-4" />
                    Whiteboard
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEditorType('code')}
                    className={`px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                      editorType === 'code'
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <FaCode className="h-4 w-4" />
                    Code Editor
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Editor Container */}
            <div className="relative bg-white p-4 min-h-[calc(100vh-300px)]">
              {editorType === 'text' && (
                <textarea 
                  className="w-full h-full min-h-[500px] p-4 border rounded"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    InterviewSocket.sendChanges(roomId, e.target.value);
                  }}
                  placeholder="Start your interview preparation here..."
                />
              )}

              {editorType === 'code' && (
                <div>
                  <select 
                    value={language} 
                    onChange={handleLanguageChange}
                    className="mb-4 p-2 border rounded"
                  >
                    {languages.map(lang => (
                      <option key={lang.id} value={lang.id}>
                        {lang.icon} {lang.name}
                      </option>
                    ))}
                  </select>
                  <MonacoEditor
                    height="500px"
                    language={language}
                    theme={theme}
                    value={code}
                    onChange={handleEditorChange}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                    }}
                  />
                </div>
              )}

              {editorType === 'whiteboard' && (
                <Whiteboard 
                  socket={InterviewSocket.socket} 
                  roomId={roomId} 
                />
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewCollabEditor;
