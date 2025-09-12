import React, { useState, useEffect } from 'react';
import { 
  addComment, 
  getQuestionComments, 
  getCommentReplies, 
  voteComment 
} from '../../api/interview/comments';
import { 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Checkbox, 
  FormControlLabel,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const CommentThread = ({ 
  comment, 
  questionId, 
  onReply, 
  onVote, 
  isReply = false,  // Add default value
  depth = 0         // Add depth tracking
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);

  const fetchReplies = async () => {
    try {
      const fetchedReplies = await getCommentReplies(comment.id);
      setReplies(fetchedReplies);
      setShowReplies(true);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  return (
    <div 
      className={`
        ${isReply ? 'ml-6 mt-2' : 'border-l-4 border-amber-200 pl-4 mb-4'}
        ${depth > 0 ? `ml-${depth * 4}` : ''}
      `}
    >
      <div className="flex justify-between items-center">
        <div>
          <span className="font-semibold">
            {comment.isAnonymous ? 'Anonymous' : comment.user.name}
          </span>
          <p className="text-gray-600 text-sm">{comment.content}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            size="small" 
            variant="text" 
            color="primary"
            onClick={() => onReply(comment.id)}
          >
            Reply
          </Button>
          <Button 
            size="small" 
            variant="text" 
            color="primary"
            onClick={() => onVote(comment.id, 'like')}
          >
            👍 {comment.likes}
          </Button>
          <Button 
            size="small" 
            variant="text" 
            color="secondary"
            onClick={() => onVote(comment.id, 'dislike')}
          >
            👎 {comment.dislikes}
          </Button>
        </div>
      </div>

      {comment.parentComment === null && (
        <Button 
          size="small" 
          variant="text" 
          color="primary"
          onClick={fetchReplies}
        >
          {showReplies ? 'Hide Replies' : 'Show Replies'}
        </Button>
      )}

      {showReplies && replies.map(reply => (
        <CommentThread 
          key={reply.id} 
          comment={reply} 
          questionId={questionId} 
          onReply={onReply} 
          onVote={onVote} 
          isReply={true}
          depth={depth + 1}
        />
      ))}
    </div>
  );
};

const InterviewQuestionComments = ({ questionId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getQuestionComments(questionId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [questionId]);

  const handleAddComment = async () => {
    if (!user) {
      alert('Please log in to comment');
      return;
    }

    try {
      const commentData = await addComment(
        questionId, 
        user.id, 
        newComment, 
        replyingToCommentId, 
        isAnonymous
      );

      // Reset form
      setNewComment('');
      setIsAnonymous(false);
      setReplyingToCommentId(null);

      // Refresh comments
      const updatedComments = await getQuestionComments(questionId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleVote = async (commentId, voteType) => {
    try {
      await voteComment(commentId, voteType);
      // Refresh comments to show updated votes
      const updatedComments = await getQuestionComments(questionId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error voting on comment:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Discussion</h3>
        {replyingToCommentId && (
          <IconButton 
            size="small" 
            onClick={() => setReplyingToCommentId(null)}
          >
            <CloseIcon />
          </IconButton>
        )}
      </div>

      {/* Comment Input */}
      <div className="mb-6">
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder={
            replyingToCommentId 
              ? "Write your reply..." 
              : "Share your thoughts about this interview question..."
          }
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-between items-center mt-2">
          <FormControlLabel
            control={
              <Checkbox
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                color="primary"
              />
            }
            label="Post Anonymously"
          />
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            {replyingToCommentId ? 'Reply' : 'Post Comment'}
          </Button>
        </div>
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <p className="text-gray-500 text-center">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        comments.map(comment => (
          <CommentThread 
            key={comment.id} 
            comment={comment} 
            questionId={questionId}
            onReply={setReplyingToCommentId}
            onVote={handleVote}
          />
        ))
      )}
    </div>
  );
};

export default InterviewQuestionComments;