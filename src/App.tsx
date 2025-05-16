import  { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary
import NotFound from './pages/NotFound'; // Import NotFound

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
 <ErrorBoundary> {/* Wrap with ErrorBoundary */}
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
                <Route path="*" element={<NotFound />} /> {/* Use NotFound component for 404 */}  
              </Routes>
          </main>
          <Footer />
        </div>
      </JobProvider>
    </AuthProvider>
  </ErrorBoundary>
  );
}

export default App;
 