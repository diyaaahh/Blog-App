import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import PostForm from '../blog/CreateBlog';
import Button from '../button';
import Navbar from '../navbar';

const EditPostPage = () => {
  const { user, logout } = useAuth();
  const { updatePost, getPost, loading } = usePosts();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const foundPost = getPost(id);
    if (foundPost) {
      setPost(foundPost);
    } else {
      setNotFound(true);
    }
  }, [id, getPost]);

  const handleUpdatePost = async (postData) => {
    const result = await updatePost(parseInt(id), postData);
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The post you're trying to edit doesn't exist.</p>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
        <Navbar />

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
            <h2 className="text-2xl font-bold text-gray-900">Edit Post</h2>
            <p className="text-gray-600">Update your blog post</p>
          </div>

          {/* Post Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <PostForm
              post={post}
              onSubmit={handleUpdatePost}
              onCancel={handleCancel}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;