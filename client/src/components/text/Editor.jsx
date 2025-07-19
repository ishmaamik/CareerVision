import React, { forwardRef, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Editor = forwardRef(({ 
    readOnly = false, 
    defaultValue = null, 
    onTextChange = null, 
    onSelectionChange = null 
}, ref) => {
    const containerRef = useRef(null);
    const quillInstance = useRef(null);
    const editorRef = useRef(document.createElement('div')); // Create element once

    useEffect(() => {
        // Initialize Quill only once
        if (!quillInstance.current && containerRef.current) {
            // Clear any existing content
            containerRef.current.innerHTML = '';
            
            // Append our editor div
            containerRef.current.appendChild(editorRef.current);
            
            // Initialize Quill
            quillInstance.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['blockquote', 'code-block'],
                        ['clean']
                    ]
                },
                readOnly,
                placeholder: 'Write your blog content here...'
            });

            // Set initial content
            if (defaultValue) {
                quillInstance.current.setContents(defaultValue);
            }

            // Expose Quill instance via ref
            if (ref) {
                if (typeof ref === 'function') {
                    ref(quillInstance.current);
                } else {
                    ref.current = quillInstance.current;
                }
            }

            // Set up event handlers
            if (onTextChange) {
                quillInstance.current.on('text-change', onTextChange);
            }

            if (onSelectionChange) {
                quillInstance.current.on('selection-change', onSelectionChange);
            }
        }

        return () => {
            if (quillInstance.current) {
                // Remove event listeners
                quillInstance.current.off('text-change');
                quillInstance.current.off('selection-change');
                quillInstance.current = null;
            }
        };
    }, []); // Empty dependency array ensures this runs only once

    useEffect(() => {
        if (quillInstance.current) {
            quillInstance.current.enable(!readOnly);
        }
    }, [readOnly]);

    return <div ref={containerRef} style={{ height: '200px', width:'528px' }} />;
});

Editor.displayName = 'Editor';

export default Editor;