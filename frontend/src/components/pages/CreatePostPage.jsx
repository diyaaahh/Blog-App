import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import PostForm from '../blog/CreateBlog';
import Button from '../button';
import Navbar from '../navbar';

const CreatePostPage = () => {
  const { user, logout } = useAuth();
  const { createPost, loading } = usePosts();
  const navigate = useNavigate();

  const handleCreatePost = async (postData) => {
    const result = await createPost({
      ...postData,
      author: user.name,
      authorId: user.id
    });
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
    <Navbar/>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">← Back to Dashboard</Button>
              </Link>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
            <p className="text-gray-600">Write and publish your blog post</p>
          </div>

          {/* Post Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <PostForm
              onSubmit={handleCreatePost}
              onCancel={handleCancel}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;