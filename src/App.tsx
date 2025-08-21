import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  BookOpen, 
  Crown, 
  Menu, 
  X,
  MapPin,
  Clock,
  Quote,
  LogOut,
  Settings
} from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider, useData } from './contexts/DataContext';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Authentication wrapper component
const AuthWrapper: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return isLogin ? (
    <LoginForm onToggleMode={() => setIsLogin(false)} />
  ) : (
    <RegisterForm onToggleMode={() => setIsLogin(true)} />
  );
};

// Main website component
const MainWebsite: React.FC = () => {
  // State management for active page and mobile menu
  const [activePage, setActivePage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { blogPosts, members, events, leaders } = useData();

  // Navigation items configuration
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'leaders', label: 'Leaders', icon: Crown }
  ];

  // Handle navigation click and close mobile menu
  const handleNavigation = (pageId) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
  };

  // Navigation Bar Component
  const NavigationBar = () => (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">YSC</h1>
              <p className="text-sm text-gray-600 hidden sm:block">Youths Serving Christ</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleNavigation(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  activePage === id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
            
            {/* User Menu */}
            {user && (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                {user.role === 'admin' && (
                  <button
                    onClick={() => window.open('/admin', '_blank')}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Admin</span>
                  </button>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigationItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleNavigation(id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-300 ${
                    activePage === id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
              
              {/* Mobile User Menu */}
              {user && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="px-4 py-2 text-sm text-gray-600">
                    Welcome, {user.name}
                  </div>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => window.open('/admin', '_blank')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Settings className="h-5 w-5" />
                      <span className="font-medium">Admin Dashboard</span>
                    </button>
                  )}
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // Homepage Component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
              <Crown className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">YSC</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Youths Serving Christ - Building Faith, Creating Community, Changing Lives
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We are a vibrant community of young believers dedicated to growing in faith, serving our community, and spreading the love of Christ. Join us as we journey together in faith, fellowship, and service.
            </p>
          </div>

          {/* Call to Action Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Join Our Community</h3>
              <p className="text-gray-600">Connect with like-minded young believers and build lasting friendships.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Grow in Faith</h3>
              <p className="text-gray-600">Deepen your relationship with Christ through Bible study and prayer.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Calendar className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Serve Others</h3>
              <p className="text-gray-600">Make a difference in our community through service and outreach.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            To empower young people to live out their faith authentically, serve their communities passionately, and grow in their relationship with Jesus Christ daily. We believe that every young person has a unique calling and purpose that God wants to fulfill through them.
          </p>
        </div>
      </section>
    </div>
  );

  // Members Page Component
  const MembersPage = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Members</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the amazing young people who make up our YSC community. Each member brings unique talents, perspectives, and passion for serving Christ.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{member.name}</h3>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Events Gallery Component
  const EventsPage = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Events Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the exciting events and activities that bring our community together in faith, fellowship, and fun.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {events.filter(event => event.published).map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{event.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-600">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Blog/Sermons Page Component
  const BlogPage = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog & Sermons</h1>
          <p className="text-xl text-gray-600">
            Inspiring thoughts, spiritual insights, and messages to encourage your faith journey.
          </p>
        </div>

        <div className="space-y-8">
          {blogPosts.filter(post => post.published).map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
              <header className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">{post.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <time>{post.date}</time>
                </div>
              </header>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{post.content}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );

  // Leaders Page Component
  const LeadersPage = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Leaders</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated leaders who guide, inspire, and support our youth community with wisdom and compassion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {leaders.map((leader) => (
            <div key={leader.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center space-x-6 mb-6">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{leader.name}</h3>
                    <p className="text-blue-600 font-medium">{leader.position}</p>
                  </div>
                </div>
                <blockquote className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200" />
                  <p className="text-gray-700 italic text-lg pl-6 leading-relaxed">
                    "{leader.quote}"
                  </p>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Main render method with conditional page rendering
  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'members':
        return <MembersPage />;
      case 'events':
        return <EventsPage />;
      case 'blog':
        return <BlogPage />;
      case 'leaders':
        return <LeadersPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <main>
        {renderActivePage()}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-blue-400" />
              <h3 className="text-2xl font-bold">Youths Serving Christ</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Building faith, creating community, changing lives.
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Youths Serving Christ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Main App component with routing
function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthWrapper />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <MainWebsite />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;