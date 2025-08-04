import React, { useState } from 'react';
import Input from '../input';
import Textarea from '../textarea';
import Button from '../button';

const PostForm = ({ post, onSubmit, onCancel, loading }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const postData = {
      title: title.trim(),
      content: content.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    onSubmit(postData);
  };

  return (
    <div>
      <Input
        label="Title"
        value={title}
        onChange={setTitle}
        error={errors.title}
        placeholder="Enter post title"
      />
      
      <Textarea
        label="Content"
        value={content}
        onChange={setContent}
        error={errors.content}
        rows={10}
        placeholder="Write your blog post content here..."
      />
      
      <Input
        label="Tags (comma-separated)"
        value={tags}
        onChange={setTags}
        placeholder="react, javascript, tutorial"
      />
      
      <div className="flex justify-end space-x-3">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          loading={loading}
        >
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </div>
  );
};

export default PostForm;