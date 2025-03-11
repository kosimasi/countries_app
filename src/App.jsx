import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/homePage/HomePage';
import PostsPage from './pages/PostsPage';
import CommentsPage from './pages/CommentsPage';
import Users from './pages/Users';
// import HomePage from './pages/homePage/HomePage';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
