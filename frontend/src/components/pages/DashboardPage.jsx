import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import Input from '../input';
import Button from '../button';
import Modal from '../modal';
import PostCard from '../blog/BlogCard';
import PostViewModal from '../blog/ViewBlog';
import Navbar from '../navbar';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { posts, loading, error, deletePost } = usePosts();
  const [viewingPost, setViewingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const navigate = useNavigate();
  const observerRef = useRef();
  const loadingTriggerRef = useRef();

  const POSTS_PER_PAGE = 6; // Number of posts to load per batch

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Load more posts function
  const loadMorePosts = useCallback(() => {
    if (isLoadingMore || !hasMorePosts) return;

    setIsLoadingMore(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;
      const newPosts = filteredPosts.slice(startIndex, endIndex);
      
      if (newPosts.length === 0) {
        setHasMorePosts(false);
      } else {
        setDisplayedPosts(prev => [...prev, ...newPosts]);
        setCurrentPage(prev => prev + 1);
        
        // Check if we've loaded all posts
        if (endIndex >= filteredPosts.length) {
          setHasMorePosts(false);
        }
      }
      
      setIsLoadingMore(false);
    }, 300);
  }, [currentPage, filteredPosts, isLoadingMore, hasMorePosts]);

  // Intersection Observer callback
  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting && hasMorePosts && !isLoadingMore) {
      loadMorePosts();
    }
  }, [loadMorePosts, hasMorePosts, isLoadingMore]);

  // Setup Intersection Observer
  useEffect(() => {
    const element = loadingTriggerRef.current;
    const option = {
      root: null,
      rootMargin: '100px', 
      threshold: 0
    };

    observerRef.current = new IntersectionObserver(handleObserver, option);
    if (element) observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [handleObserver]);

  // Reset pagination when search term changes or posts change
  useEffect(() => {
    setCurrentPage(2);
    setHasMorePosts(true);
    
    // Load initial batch
    const initialPosts = filteredPosts.slice(0, POSTS_PER_PAGE);
    setDisplayedPosts(initialPosts);
    
    // Check if there are more posts to load
    if (filteredPosts.length <= POSTS_PER_PAGE) {
      setHasMorePosts(false);
    }
  }, [searchTerm, posts]);

 const handleDeletePost = async (postId) => {
  if (window.confirm('Are you sure you want to delete this post?')) {
    const result = await deletePost(postId);
    if (result.success) {
      setDisplayedPosts(prev => prev.filter(post => post.id !== postId));
    }
  }
};


  const handleEditPost = (post) => {
    navigate(`/posts/edit/${post.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
    <Navbar/>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0 text-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#200116' }}>
                My Blog Posts
              </h2>
              <p className="text-gray-600 text-lg">
                Manage and organize your creative content
              </p>
            </div>
            <Link to="/posts/create">
              <Button className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                     style={{ 
                       backgroundColor: '#80D39B', 
                       color: '#200116',
                       boxShadow: '0 4px 15px rgba(128, 211, 155, 0.3)'
                     }}>
                ✨ Create New Post
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto md:mx-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <Input
                placeholder="Search posts by title, content, or tags..."
                value={searchTerm}
                onChange={setSearchTerm}
                className="pl-10 py-3 rounded-xl border-2 focus:ring-2 transition-all duration-200"
                style={{ 
                  backgroundColor: 'white',
                  borderColor: '#4C0827',
                  color: '#200116'
                }}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl border-l-4 shadow-lg"
                 style={{ 
                   backgroundColor: '#4C0827', 
                   borderLeftColor: '#80D39B',
                   color: 'white'
                 }}>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" style={{ color: '#80D39B' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && posts.length === 0 && (
            <div className="flex flex-col justify-center items-center py-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-600" 
                     style={{ borderTopColor: '#80D39B' }}></div>
                <div className="absolute inset-0 rounded-full h-12 w-12 border-4 border-transparent animate-pulse"
                     style={{ borderTopColor: '#4C0827' }}></div>
              </div>
              <span className="mt-4 text-gray-600 text-lg font-medium">Loading your posts...</span>
            </div>
          )}

          {/* Posts Grid */}
          {displayedPosts.length > 0 ? (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedPosts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="transform transition-all duration-200 hover:scale-105"
                    style={{
                      animationDelay: `${(index % POSTS_PER_PAGE) * 100}ms`,
                      animation: 'fadeInUp 0.5s ease-out forwards'
                    }}
                  >
                    <PostCard
                      post={post}
                      onEdit={handleEditPost}
                      onDelete={handleDeletePost}
                      onView={setViewingPost}
                    />
                  </div>
                ))}
              </div>

              {/* Loading More Indicator */}
              {hasMorePosts && (
                <div 
                  ref={loadingTriggerRef}
                  className="flex justify-center items-center py-8"
                >
                  {isLoadingMore ? (
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300" 
                             style={{ borderTopColor: '#80D39B' }}></div>
                      </div>
                      <span className="mt-2 text-gray-600 text-sm">Loading more posts...</span>
                    </div>
                  ) : (
                    <button
                      onClick={loadMorePosts}
                      className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 border-2"
                      style={{ 
                        borderColor: '#80D39B',
                        color: '#80D39B',
                        backgroundColor: 'transparent'
                      }}
                    >
                      Load More Posts
                    </button>
                  )}
                </div>
              )}

              {/* End of Posts Indicator */}
              {!hasMorePosts && displayedPosts.length > POSTS_PER_PAGE && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                       style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}>
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    You've reached the end of your posts
                  </div>
                </div>
              )}
            </div>
          ) : !loading && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: '#2D0605' }}>
                  <svg className="w-12 h-12" style={{ color: '#80D39B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#200116' }}>
                  {searchTerm ? 'No posts found' : 'Ready to start blogging?'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Try adjusting your search terms or clear the search to see all posts.' 
                    : 'Create your first blog post and share your thoughts with the world.'}
                </p>
                {!searchTerm && (
                  <Link to="/posts/create">
                    <Button 
                      variant="outline" 
                      className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 border-2"
                      style={{ 
                        borderColor: '#80D39B',
                        color: '#80D39B',
                        backgroundColor: 'transparent'
                      }}
                    >
                      🚀 Create Your First Post
                    </Button>
                  </Link>
                )}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 border-2"
                    style={{ 
                      borderColor: '#4C0827',
                      color: '#4C0827',
                      backgroundColor: 'transparent'
                    }}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Post Modal */}
      <PostViewModal
        post={viewingPost}
        isOpen={!!viewingPost}
        onClose={() => setViewingPost(null)}
      />

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;