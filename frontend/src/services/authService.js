// Helper functions for user storage
const getRegisteredUsers = () => {
  const users = localStorage.getItem('registeredUsers');
  return users ? JSON.parse(users) : [];
};

const saveRegisteredUsers = (users) => {
  localStorage.setItem('registeredUsers', JSON.stringify(users));
};

// Mock default users 
const defaultUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password'
  }
];

// Initialize users in localStorage if not exists
if (!localStorage.getItem('registeredUsers')) {
  saveRegisteredUsers(defaultUsers);
}

// Mock API functions for authentication
export const mockLogin = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get users from localStorage
  const users = getRegisteredUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    return {
      success: true,
      data: {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    };
  } else {
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }
};

export const mockRegister = async (name, email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (email && password && name) {
    const users = getRegisteredUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return {
        success: false,
        error: 'User with this email already exists'
      };
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password
    };
    
    // Add to users array and save to localStorage
    users.push(newUser);
    saveRegisteredUsers(users);
    
    return {
      success: true,
      data: {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }
      }
    };
  } else {
    return {
      success: false,
      error: 'All fields are required'
    };
  }
};