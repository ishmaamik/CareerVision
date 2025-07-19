import React, { useContext, useEffect, useRef, useState } from 'react';
import Editor from '../text/Editor';
import 'quill/dist/quill.snow.css'; // Don't forget the styles
import { User } from '../../context/UserContext';
import { createBlog } from '../../api/blog/blog';
import { Button } from '@mui/material';

const NewBlog = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const quillRef = useRef();
    const randomString = Math.random().toString(36).substring(2, 8);

    const submitBlog = async () => {
        try {
            const blog = {
                title: title,
                author: author,
                content: content
            };
    
            const createdBlog = await createBlog(blog);
            
            // Check if we actually got a response
            if (createdBlog) {
                console.log('Blog created:', createdBlog);
                alert(`Blog created successfully! ID: ${createdBlog.id || 'N/A'}`);
                
                // Clear form
                setTitle('');
                setContent('');
                if (quillRef.current) {
                    quillRef.current.setContents([{ insert: '\n' }]);
                }
            } else {
                throw new Error('No response data received');
            }
        } catch (error) {
            console.error('Submission failed:', error);
            alert(`Failed to create blog: ${error.message}`);
        }
    };

    useEffect(() => {
        setAuthor(localStorage.getItem('name') ?
            localStorage.getItem('name') :
            `Anonymous_${randomString}`
        )
    }, [])

    return (
        <>
            <div className='mt-20'>
                <p style={{ fontSize: '12px' }}>Author: {author}</p>
                <input onChange={(e) => { setTitle(e.target.value) }} className='bg-white w-132 mt-2' style={{ fontSize: '14px' }} placeholder='Title' />
                <div className=" mt-2 bg-white" style={{ height: '240px', width: '528px' }}>
                    <Editor
                        ref={quillRef}
                        defaultValue={{}}
                        onTextChange={() => {
                            if (quillRef.current) {
                                setContent(quillRef.current.getText());
                            }
                        }}
                    />


                </div>
            </div>

            <Button disableRipple variant="text" sx={{color:'gray', ":hover":{backgroundColor:'transparent'}, ":focus-visible":{outline:'none'}, marginTop:'10px'}} onClick={submitBlog}>
                Submit Blog
            </Button>
        </>
    );
};

export default NewBlog;