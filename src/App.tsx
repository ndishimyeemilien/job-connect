import  { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobsList from './pages/JobsList';
import JobDetail from './pages/JobDetail';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PostJob from './pages/PostJob';
import AboutUs from './pages/AboutUs';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();

  // Add a class to the body for different pages if needed
  useEffect(() => {
    document.body.className = '';
    if (location.pathname === '/') {
      document.body.classList.add('home-page');
    }
  }, [location.pathname]);

  return (
    <AuthProvider>
      <JobProvider>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<JobsList />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/about" element={<AboutUs />} />
              <Route 
                path="/dashboard/*" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/post-job" 
                element={
                  <ProtectedRoute employerOnly>
                    <PostJob />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="*" 
                element={
                  <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                    <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
                    <p className="text-gray-600 mb-6">The page you are looking for doesn't exist or has been moved.</p>
                    <a href="/" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                      Go back to home
                    </a>
                  </div>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
 