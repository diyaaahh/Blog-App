import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import Input from '../input';
import Button from '../button';
import Modal from '../modal';
import PostCard from '../blog/BlogCard';
import PostForm from '../blog/CreateBlog';
import PostViewModal from '../blog/ViewBlog';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { posts, loading, error, createPost, updatePost, deletePost } = usePosts();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [viewingPost, setViewingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreatePost = async (postData) => {
    const result = await createPost({
      ...postData,
      author: user.name,
      authorId: user.id
    });
    
    if (result.success) {
      setShowCreateModal(false);
    }
  };

  const handleUpdatePost = async (postData) => {
    const result = await updatePost(editingPost.id, postData);
    
    if (result.success) {
      setEditingPost(null);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Blog Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Blog Posts</h2>
              <p className="text-gray-600">Manage your blog posts</p>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              Create New Post
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search posts by title, content, or tags..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && posts.length === 0 && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading posts...</span>
            </div>
          )}

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={setEditingPost}
                  onDelete={handleDeletePost}
                  onView={setViewingPost}
                />
              ))}
            </div>
          ) : !loading && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                {searchTerm ? 'No posts found matching your search.' : 'No blog posts yet.'}
              </div>
              {!searchTerm && (
                <Button
                  onClick={() => setShowCreateModal(true)}
                  variant="outline"
                  className="mt-4"
                >
                  Create Your First Post
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Post"
        size="lg"
      >
        <PostForm
          onSubmit={handleCreatePost}
          onCancel={() => setShowCreateModal(false)}
          loading={loading}
        />
      </Modal>

      {/* Edit Post Modal */}
      <Modal
        isOpen={!!editingPost}
        onClose={() => setEditingPost(null)}
        title="Edit Post"
        size="lg"
      >
        <PostForm
          post={editingPost}
          onSubmit={handleUpdatePost}
          onCancel={() => setEditingPost(null)}
          loading={loading}
        />
      </Modal>

      {/* View Post Modal */}
      <PostViewModal
        post={viewingPost}
        isOpen={!!viewingPost}
        onClose={() => setViewingPost(null)}
      />
    </div>
  );
};

export default Dashboard;