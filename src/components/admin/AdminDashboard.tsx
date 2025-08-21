import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Calendar, 
  Crown,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Save,
  X
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { BlogPost, Member, Event, Leader } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'blog' | 'member' | 'event' | 'leader'>('blog');
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const {
    blogPosts,
    members,
    events,
    leaders,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    addMember,
    updateMember,
    deleteMember,
    addEvent,
    updateEvent,
    deleteEvent,
    addLeader,
    updateLeader,
    deleteLeader
  } = useData();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'blog', label: 'Blog Posts', icon: FileText },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'leaders', label: 'Leaders', icon: Crown }
  ];

  const handleAdd = (type: 'blog' | 'member' | 'event' | 'leader') => {
    setModalType(type);
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (type: 'blog' | 'member' | 'event' | 'leader', item: any) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = (type: 'blog' | 'member' | 'event' | 'leader', id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch (type) {
        case 'blog':
          deleteBlogPost(id);
          break;
        case 'member':
          deleteMember(id);
          break;
        case 'event':
          deleteEvent(id);
          break;
        case 'leader':
          deleteLeader(id);
          break;
      }
    }
  };

  const togglePublished = (type: 'blog' | 'event', id: string, currentStatus: boolean) => {
    switch (type) {
      case 'blog':
        updateBlogPost(id, { published: !currentStatus });
        break;
      case 'event':
        updateEvent(id, { published: !currentStatus });
        break;
    }
  };

  // Overview Tab Component
  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Blog Posts</p>
              <p className="text-3xl font-bold text-gray-900">{blogPosts.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Members</p>
              <p className="text-3xl font-bold text-gray-900">{members.length}</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Events</p>
              <p className="text-3xl font-bold text-gray-900">{events.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Leaders</p>
              <p className="text-3xl font-bold text-gray-900">{leaders.length}</p>
            </div>
            <Crown className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="text-gray-600">Latest blog post published</span>
            <span className="text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <span className="text-gray-600">New member added</span>
            <span className="text-gray-400">1 day ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            <span className="text-gray-600">Event updated</span>
            <span className="text-gray-400">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Blog Posts Tab Component
  const BlogTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
        <button
          onClick={() => handleAdd('blog')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Post</span>
        </button>
      </div>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">By {post.author} • {post.date}</p>
                <p className="text-gray-700 line-clamp-2">{post.content}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => togglePublished('blog', post.id, post.published)}
                  className={`p-2 rounded-lg ${post.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                  title={post.published ? 'Published' : 'Draft'}
                >
                  {post.published ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => handleEdit('blog', post)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete('blog', post.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Members Tab Component
  const MembersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Members</h2>
        <button
          onClick={() => handleAdd('member')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Member</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-xl shadow-lg">
            <img
              src={member.image}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{member.name}</h3>
            <p className="text-gray-600 text-sm text-center mb-4">{member.bio}</p>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => handleEdit('member', member)}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete('member', member.id)}
                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Events Tab Component
  const EventsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Events</h2>
        <button
          onClick={() => handleAdd('event')}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-xl shadow-lg">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.date} • {event.location}</p>
                <p className="text-gray-700 line-clamp-2">{event.description}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => togglePublished('event', event.id, event.published)}
                  className={`p-2 rounded-lg ${event.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                  title={event.published ? 'Published' : 'Draft'}
                >
                  {event.published ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => handleEdit('event', event)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete('event', event.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Leaders Tab Component
  const LeadersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Leaders</h2>
        <button
          onClick={() => handleAdd('leader')}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Leader</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {leaders.map((leader) => (
          <div key={leader.id} className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{leader.name}</h3>
                <p className="text-blue-600 font-medium">{leader.position}</p>
              </div>
            </div>
            <blockquote className="text-gray-700 italic mb-4">"{leader.quote}"</blockquote>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit('leader', leader)}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete('leader', leader.id)}
                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'blog':
        return <BlogTab />;
      case 'members':
        return <MembersTab />;
      case 'events':
        return <EventsTab />;
      case 'leaders':
        return <LeadersTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <nav className="mt-6">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeTab === id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderTabContent()}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          type={modalType}
          item={editingItem}
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            if (editingItem) {
              // Update existing item
              switch (modalType) {
                case 'blog':
                  updateBlogPost(editingItem.id, data);
                  break;
                case 'member':
                  updateMember(editingItem.id, data);
                  break;
                case 'event':
                  updateEvent(editingItem.id, data);
                  break;
                case 'leader':
                  updateLeader(editingItem.id, data);
                  break;
              }
            } else {
              // Add new item
              switch (modalType) {
                case 'blog':
                  addBlogPost(data);
                  break;
                case 'member':
                  addMember(data);
                  break;
                case 'event':
                  addEvent(data);
                  break;
                case 'leader':
                  addLeader(data);
                  break;
              }
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

// Modal Component
interface ModalProps {
  type: 'blog' | 'member' | 'event' | 'leader';
  item: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const Modal: React.FC<ModalProps> = ({ type, item, onClose, onSave }) => {
  const [formData, setFormData] = useState(() => {
    switch (type) {
      case 'blog':
        return {
          title: item?.title || '',
          content: item?.content || '',
          author: item?.author || '',
          date: item?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          image: item?.image || '',
          published: item?.published || false
        };
      case 'member':
        return {
          name: item?.name || '',
          image: item?.image || '',
          bio: item?.bio || '',
          email: item?.email || '',
          joinDate: item?.joinDate || ''
        };
      case 'event':
        return {
          title: item?.title || '',
          description: item?.description || '',
          image: item?.image || '',
          date: item?.date || '',
          location: item?.location || '',
          published: item?.published || false
        };
      case 'leader':
        return {
          name: item?.name || '',
          image: item?.image || '',
          position: item?.position || '',
          quote: item?.quote || '',
          bio: item?.bio || ''
        };
      default:
        return {};
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getTitle = () => {
    const action = item ? 'Edit' : 'Add';
    const typeMap = {
      blog: 'Blog Post',
      member: 'Member',
      event: 'Event',
      leader: 'Leader'
    };
    return `${action} ${typeMap[type]}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Common fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {type === 'blog' ? 'Post Title' : type === 'event' ? 'Event Title' : 'Name'}
            </label>
            <input
              type="text"
              required
              value={formData.title || formData.name}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                [type === 'blog' || type === 'event' ? 'title' : 'name']: e.target.value 
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                placeholder="Or enter image URL"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Type-specific fields */}
          {type === 'blog' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="mr-2"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">
                  Published
                </label>
              </div>
            </>
          )}

          {type === 'member' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  required
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {type === 'event' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="eventPublished"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="mr-2"
                />
                <label htmlFor="eventPublished" className="text-sm font-medium text-gray-700">
                  Published
                </label>
              </div>
            </>
          )}

          {type === 'leader' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                <textarea
                  required
                  rows={3}
                  value={formData.quote}
                  onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio (Optional)</label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};