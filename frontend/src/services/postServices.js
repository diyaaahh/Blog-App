// Mock Posts Data
export const MOCK_POSTS = [
  {
    id: 1,
    title: "Getting Started with React",
    content: "React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the basics of React and how to get started with your first component.",
    author: "John Doe",
    authorId: 1,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    tags: ["react", "javascript", "frontend"]
  },
  {
    id: 2,
    title: "Understanding State Management",
    content: "State management is crucial for building scalable applications. Let's dive into different approaches including Context API, Redux, and Zustand.",
    author: "John Doe",
    authorId: 1,
    createdAt: "2024-01-20T14:20:00Z",
    updatedAt: "2024-01-20T14:20:00Z",
    tags: ["state-management", "react", "redux"]
  },
  {
    id: 3,
    title: "A Deep Dive into useEffect",
    content: "The useEffect hook allows you to perform side effects in function components. We'll examine common patterns, cleanup functions, and dependency arrays.",
    author: "John Doe",
    authorId: 1,
    createdAt: "2024-01-25T11:00:00Z",
    updatedAt: "2024-01-25T11:00:00Z",
    tags: ["react", "hooks", "useEffect"]
  },
  {
    id: 4,
    title: "Building Forms in React",
    content: "Learn how to handle user input and form validation in React using controlled components and popular libraries like Formik and React Hook Form.",
    author: "John Doe",
    authorId: 1,
    createdAt: "2024-01-28T09:45:00Z",
    updatedAt: "2024-01-28T09:45:00Z",
    tags: ["react", "forms", "formik"]
  },
  {
    id: 5,
    title: "Routing in React with React Router",
    content: "React Router is the standard for routing in React applications. This post covers how to set up routes, nested routes, and dynamic route parameters.",
    author: "John Doe",
    authorId: 1,
    createdAt: "2024-02-01T13:30:00Z",
    updatedAt: "2024-02-01T13:30:00Z",
    tags: ["react", "routing", "react-router"]
  },
  {
    id: 6,
    title: "Optimizing Performance in React Apps",
    content: "Performance optimization is key to a great user experience. Explore memoization, lazy loading, and code-splitting techniques.",
    author: "John Doe",
    authorId: 1,
    createdAt: "2024-02-05T16:10:00Z",
    updatedAt: "2024-02-05T16:10:00Z",
    tags: ["react", "performance", "optimization"]
  },
  {
    id: 7,
    title: "Using Custom Hooks Effectively",
    content: "Custom hooks allow you to extract reusable logic from components. We'll look at how to create, organize, and use them efficiently.",
    author: "John Doe",
    authorId: 1,
    createdAt: "2024-02-08T10:00:00Z",
    updatedAt: "2024-02-08T10:00:00Z",
    tags: ["react", "hooks", "custom-hooks"]
  },
  {
    id: 8,
    title: "Styling in React: CSS Modules vs Styled Components",
    content: "Styling in React can be done in many ways. We'll compare CSS Modules and Styled Components, and help you decide which one fits your project best.",
    author: "John Doe",
    authorId: 1,
    createdAt: "2024-02-10T08:15:00Z",
    updatedAt: "2024-02-10T08:15:00Z",
    tags: ["react", "styling", "css-modules"]
  },
  {
    id: 9,
    title: "Connecting React with REST APIs",
    content: "Learn how to fetch data from REST APIs using fetch and Axios, and how to handle loading and error states in React components.",
    author: "John Doe",
    authorId: 1,
    createdAt: "2024-02-12T12:40:00Z",
    updatedAt: "2024-02-12T12:40:00Z",
    tags: ["react", "api", "axios"]
  },
  {
    id: 10,
    title: "Introduction to Next.js for React Developers",
    content: "Next.js extends React with powerful features like server-side rendering and static site generation. This post introduces its core concepts.",
    author: "John Doe",
    authorId: 1,
    createdAt: "2024-02-15T15:25:00Z",
    updatedAt: "2024-02-15T15:25:00Z",
    tags: ["nextjs", "react", "ssr"]
  },
  {
    id: 11,
    title: "Testing React Components with Jest and React Testing Library",
    content: "Testing is essential for reliable apps. Learn how to write unit and integration tests for React components using Jest and React Testing Library.",
    author: "John Doe",
    authorId: 1,
    createdAt: "2024-02-18T17:00:00Z",
    updatedAt: "2024-02-18T17:00:00Z",
    tags: ["react", "testing", "jest"]
  },
  {
    id: 12,
    title: "Deploying React Apps to Vercel and Netlify",
    content: "In this guide, we'll walk through deploying your React applications to platforms like Vercel and Netlify with ease.",
    author: "John Doe",
    authorId: 1,
    createdAt: "2024-02-20T19:15:00Z",
    updatedAt: "2024-02-20T19:15:00Z",
    tags: ["react", "deployment", "vercel"]
  }
];

// Mock API functions (replace with actual API calls later)
export const fetchPostsAPI = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, data: [...MOCK_POSTS] };
};

export const createPostAPI = async (postData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newPost = {
    id: Date.now(),
    ...postData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return { success: true, data: newPost };
};

export const updatePostAPI = async (postId, postData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  return { success: true };
};

export const deletePostAPI = async (postId) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};