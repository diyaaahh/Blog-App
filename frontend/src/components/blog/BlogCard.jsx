import React from 'react';
import Button from '../button';

const PostCard = ({ post, onEdit, onDelete, onView }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2" 
         style={{ borderColor: '#f3f4f6', boxShadow: '0 4px 10px -1px rgba(76, 8, 39, 0.5)' }}>
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#200116' }}>{post.title}</h3>
      <p className="text-gray-600 mb-3">{truncateContent(post.content)}</p>
      
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full"
              style={{ 
                backgroundColor: 'rgba(76, 8, 39, 0.3)', 
                color: '#200116' 
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>By {post.author}</span>
        <span>{formatDate(post.createdAt)}</span>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button size="sm" variant="outline" onClick={() => onView(post)}>
          View
        </Button>
        <Button size="sm" variant="secondary" onClick={() => onEdit(post)}>
          Edit
        </Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(post.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PostCard;