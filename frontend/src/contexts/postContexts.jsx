import React, { createContext, useState, useEffect } from 'react';
import { fetchPostsAPI, createPostAPI, updatePostAPI, deletePostAPI } from '../services/postServices';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with mock data
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchPostsAPI();
      if (response.success) {
        setPosts(response.data);
      } else {
        setError('Failed to fetch posts');
      }
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createPostAPI(postData);
      if (response.success) {
        setPosts(prevPosts => [response.data, ...prevPosts]);
        return { success: true, post: response.data };
      } else {
        setError('Failed to create post');
        return { success: false, error: 'Failed to create post' };
      }
    } catch (err) {
      setError('Failed to create post');
      return { success: false, error: 'Failed to create post' };
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (postId, postData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updatePostAPI(postId, postData);
      if (response.success) {
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === postId 
              ? { ...post, ...postData, updatedAt: new Date().toISOString() }
              : post
          )
        );
        return { success: true };
      } else {
        setError('Failed to update post');
        return { success: false, error: 'Failed to update post' };
      }
    } catch (err) {
      setError('Failed to update post');
      return { success: false, error: 'Failed to update post' };
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deletePostAPI(postId);
      if (response.success) {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        return { success: true };
      } else {
        setError('Failed to delete post');
        return { success: false, error: 'Failed to delete post' };
      }
    } catch (err) {
      setError('Failed to delete post');
      return { success: false, error: 'Failed to delete post' };
    } finally {
      setLoading(false);
    }
  };

  const getPost = (postId) => {
    return posts.find(post => post.id === parseInt(postId));
  };

  const value = {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    getPost
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};