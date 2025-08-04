import React from 'react';
import Modal from '../modal';

const PostViewModal = ({ post, isOpen, onClose }) => {
  if (!post) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="View Post" style={{ maxWidth: '300px', width: '90%' }} >
      <article className="prose max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.createdAt)}</span>
          {post.updatedAt !== post.createdAt && (
            <>
              <span className="mx-2">•</span>
              <span>Updated {formatDate(post.updatedAt)}</span>
            </>
          )}
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6" >
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full"
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
        
        <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
      </article>
    </Modal>
  );
};

export default PostViewModal;