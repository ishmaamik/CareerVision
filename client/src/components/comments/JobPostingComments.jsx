import React, { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, Avatar, IconButton, 
    List, ListItem, ListItemAvatar, ListItemText, 
    Paper, Divider, Tooltip, Chip
} from '@mui/material';
import {
    Send as SendIcon, 
    ThumbUp as ThumbUpIcon, 
    ThumbDown as ThumbDownIcon, 
    Edit as EditIcon, 
    Delete as DeleteIcon,
    Reply as ReplyIcon
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import JobPostingCommentsAPI from '../../api/jobPostingComments';

const JobPostingComments = ({ jobPostingId }) => {
    const { user } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);
    const [page, setPage] = useState(0);
    const [totalComments, setTotalComments] = useState(0);

    // Fetch comments
    const fetchComments = async () => {
        try {
            const commentsData = await JobPostingCommentsAPI.getComments(jobPostingId, page);
            setComments(page === 0 ? commentsData.content : [...comments, ...commentsData.content]);
            
            // Fetch total comment count
            const count = await JobPostingCommentsAPI.countComments(jobPostingId);
            setTotalComments(count);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // Add a new comment
    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const addedComment = await JobPostingCommentsAPI.addComment(jobPostingId, newComment);
            setComments([addedComment, ...comments]);
            setNewComment('');
            setTotalComments(totalComments + 1);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Edit a comment
    const handleEditComment = async (commentId, newContent) => {
        try {
            const updatedComment = await JobPostingCommentsAPI.updateComment(jobPostingId, commentId, newContent);
            setComments(comments.map(comment => 
                comment.id === commentId ? updatedComment : comment
            ));
            setEditingComment(null);
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    // Delete a comment
    const handleDeleteComment = async (commentId) => {
        try {
            await JobPostingCommentsAPI.deleteComment(jobPostingId, commentId);
            setComments(comments.filter(comment => comment.id !== commentId));
            setTotalComments(totalComments - 1);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    // Upvote/Downvote comment
    const handleVoteComment = async (commentId, voteType) => {
        try {
            const voteFn = voteType === 'upvote' 
                ? JobPostingCommentsAPI.upvoteComment 
                : JobPostingCommentsAPI.downvoteComment;
            
            const updatedComment = await voteFn(jobPostingId, commentId);
            setComments(comments.map(comment => 
                comment.id === commentId ? updatedComment : comment
            ));
        } catch (error) {
            console.error(`Error ${voteType}ing comment:`, error);
        }
    };

    // Load more comments
    const loadMoreComments = () => {
        setPage(page + 1);
    };

    // Fetch comments on component mount and when page changes
    useEffect(() => {
        fetchComments();
    }, [jobPostingId, page]);

    // Render comment actions
    const renderCommentActions = (comment) => {
        const isAuthor = comment.author.id === user?.id;

        return (
            <Box display="flex" alignItems="center" gap={1}>
                {/* Upvote/Downvote */}
                <Tooltip title="Upvote">
                    <IconButton 
                        size="small" 
                        color={comment.upvotes > 0 ? 'primary' : 'default'}
                        onClick={() => handleVoteComment(comment.id, 'upvote')}
                    >
                        <ThumbUpIcon fontSize="small" />
                        <Typography variant="caption" ml={0.5}>
                            {comment.upvotes}
                        </Typography>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Downvote">
                    <IconButton 
                        size="small" 
                        color={comment.downvotes > 0 ? 'error' : 'default'}
                        onClick={() => handleVoteComment(comment.id, 'downvote')}
                    >
                        <ThumbDownIcon fontSize="small" />
                        <Typography variant="caption" ml={0.5}>
                            {comment.downvotes}
                        </Typography>
                    </IconButton>
                </Tooltip>

                {/* Reply */}
                <Tooltip title="Reply">
                    <IconButton 
                        size="small" 
                        onClick={() => setReplyingTo(comment.id)}
                    >
                        <ReplyIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                {/* Edit/Delete for author */}
                {isAuthor && (
                    <>
                        <Tooltip title="Edit">
                            <IconButton 
                                size="small" 
                                onClick={() => setEditingComment(comment)}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleDeleteComment(comment.id)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </Box>
        );
    };

    // Render comment input
    const renderCommentInput = () => {
        return (
            <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                </Avatar>
                <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    variant="outlined"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <IconButton 
                                color="primary" 
                                onClick={handleAddComment}
                                disabled={!newComment.trim()}
                            >
                                <SendIcon />
                            </IconButton>
                        )
                    }}
                />
            </Box>
        );
    };

    // Render individual comment
    const renderComment = (comment) => {
        const isEditing = editingComment?.id === comment.id;
        const isReplying = replyingTo === comment.id;

        return (
            <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {comment.author.name?.[0]?.toUpperCase() || 'U'}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle2">
                                {comment.author.name || 'Anonymous'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {new Date(comment.createdAt).toLocaleString()}
                            </Typography>
                        </Box>
                    }
                    secondary={
                        isEditing ? (
                            <TextField
                                fullWidth
                                multiline
                                maxRows={4}
                                defaultValue={comment.content}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        handleEditComment(comment.id, e.target.value);
                                    }
                                }}
                            />
                        ) : (
                            <>
                                <Typography variant="body2">
                                    {comment.content}
                                </Typography>
                                {renderCommentActions(comment)}
                            </>
                        )
                    }
                />
            </ListItem>
        );
    };

    return (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                    Comments ({totalComments})
                </Typography>
            </Box>

            {/* Comment Input */}
            {user && renderCommentInput()}

            {/* Comments List */}
            <List>
                {comments.map(renderComment)}
            </List>

            {/* Load More Button */}
            {comments.length < totalComments && (
                <Box textAlign="center" mt={2}>
                    <Button 
                        variant="outlined" 
                        onClick={loadMoreComments}
                    >
                        Load More Comments
                    </Button>
                </Box>
            )}
        </Paper>
    );
};

export default JobPostingComments;
