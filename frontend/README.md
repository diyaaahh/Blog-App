# 📝 Blog App

A modern, responsive blog application built using **React**, **Redux**, **React Router**, and **Tailwind CSS**, with JWT-based authentication and rich blogging features like search, filtering, and infinite scroll. This app uses **dummy APIs** to simulate a full-stack blogging platform.

---

## Features

- 🔐 **JWT Authentication**
  - Login, Register, and Logout flows
  - Token stored in memory or `localStorage`
  - Private and Public route handling

- 🧠 **State Management**
  - `useAuth` hook: Manages user auth state (login, logout, user info, isAuthenticated)
  - `usePosts` hook: Handles fetching, creating, editing, deleting blog posts
  - `AuthContext` and `PostContext` used 

- 📄 **Blog Management**
  - Create, edit, delete blogs
  - Rich Text Editor for writing blogs
  - View single blog in detail

- 🔎 **Search & Filter**
  - Search by title or content
  - Filter by tags or author

- **Styling with Tailwind CSS**
  - Consistent design using a custom color palette
  - Fully responsive across all devices

- **UX Enhancements**
  - Lazy loading / Infinite scroll for blog listing
  - Loading spinners for async actions
  - Custom form validation and feedback

- 🔐 **Route Protection**
  - `/dashboard`, `/posts/create`, `/posts/edit/:id` protected using `PrivateRoute`
  - `/login`, `/register` protected using `PublicRoute` to prevent access when authenticated

---

## 🛠️ Tech Stack

| Tech            | Purpose                            |
|-----------------|------------------------------------|
| React           | UI Library                         |
| Context API     | Global State Management            |
| React Router    | Client-side Routing                |
| Tailwind CSS    | Utility-first CSS Framework        |
| JWT             | Authentication (Simulated)         |

---
## 📁 Project Installation 

```bash
# 1. Clone the repository
git clone https://github.com/diyaaahh/Blog-App.git
cd Blog-App
cd frontend

# 2. Install dependencies
npm install

# 3. Run the application
npm start
