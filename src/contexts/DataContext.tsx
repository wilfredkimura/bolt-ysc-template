import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BlogPost, Member, Event, Leader } from '../types';

interface DataContextType {
  blogPosts: BlogPost[];
  members: Member[];
  events: Event[];
  leaders: Leader[];
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addLeader: (leader: Omit<Leader, 'id'>) => void;
  updateLeader: (id: string, leader: Partial<Leader>) => void;
  deleteLeader: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Initial data
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: "Finding Purpose in Service",
      content: "True fulfillment comes not from what we receive, but from what we give. As young Christians, we are called to serve others with the same love and compassion that Christ showed us. Through service, we discover our purpose and make a meaningful impact in our communities.",
      date: "January 15, 2024",
      author: "Pastor Mark",
      published: true
    },
    {
      id: '2',
      title: "The Power of Prayer in Daily Life",
      content: "Prayer is not just a ritual; it's a conversation with God that transforms our hearts and minds. When we make prayer a daily habit, we find strength in challenges, peace in chaos, and guidance in uncertainty. Let prayer be the foundation of your spiritual journey.",
      date: "January 8, 2024",
      author: "Sarah Johnson",
      published: true
    },
    {
      id: '3',
      title: "Building Faith in Modern Times",
      content: "In a world filled with distractions and challenges, maintaining strong faith requires intentional effort. We must ground ourselves in Scripture, surround ourselves with believing community, and practice spiritual disciplines that draw us closer to God daily.",
      date: "December 30, 2023",
      author: "Michael Chen",
      published: true
    }
  ]);

  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      name: "Sarah Johnson",
      image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Youth leader passionate about community service and spreading God's love through action."
    },
    {
      id: '2',
      name: "Michael Chen",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Music ministry coordinator who believes in the power of worship to transform lives."
    },
    {
      id: '3',
      name: "Emily Rodriguez",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Volunteer coordinator dedicated to organizing outreach programs for the community."
    },
    {
      id: '4',
      name: "David Thompson",
      image: "https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Bible study leader who enjoys helping young people grow in their faith journey."
    },
    {
      id: '5',
      name: "Grace Kim",
      image: "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Prayer ministry coordinator committed to fostering spiritual growth through prayer."
    },
    {
      id: '6',
      name: "James Wilson",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Sports ministry leader who uses athletics to build character and community bonds."
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: "Annual Youth Retreat",
      description: "A three-day spiritual retreat focused on personal growth, fellowship, and deepening our relationship with Christ.",
      image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "March 15-17, 2024",
      location: "Mountain View Camp",
      published: true
    },
    {
      id: '2',
      title: "Community Service Day",
      description: "Join us as we serve our local community through various volunteer activities and outreach programs.",
      image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "February 10, 2024",
      location: "Downtown Community Center",
      published: true
    },
    {
      id: '3',
      title: "Youth Worship Night",
      description: "An evening of contemporary worship, praise, and fellowship designed specifically for young believers.",
      image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "January 20, 2024",
      location: "Main Sanctuary",
      published: true
    },
    {
      id: '4',
      title: "Bible Study Marathon",
      description: "Deep dive into scripture with interactive discussions, group activities, and spiritual reflection.",
      image: "https://images.pexels.com/photos/8468406/pexels-photo-8468406.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "April 5, 2024",
      location: "Fellowship Hall",
      published: true
    }
  ]);

  const [leaders, setLeaders] = useState<Leader[]>([
    {
      id: '1',
      name: "Pastor Mark Williams",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      position: "Senior Pastor",
      quote: "Young people are not the church of tomorrow; they are the church of today."
    },
    {
      id: '2',
      name: "Sister Janet Moore",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400",
      position: "Youth Ministry Director",
      quote: "Every young person has a calling, our job is to help them discover it."
    },
    {
      id: '3',
      name: "Deacon Robert Davis",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      position: "Youth Counselor",
      quote: "Faith is not about having all the answers, but trusting the One who does."
    },
    {
      id: '4',
      name: "Minister Lisa Brown",
      image: "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=400",
      position: "Worship Leader",
      quote: "Worship is the heartbeat of our relationship with God."
    }
  ]);

  // Blog post functions
  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost = { ...post, id: Date.now().toString() };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (id: string, updatedPost: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  // Member functions
  const addMember = (member: Omit<Member, 'id'>) => {
    const newMember = { ...member, id: Date.now().toString() };
    setMembers(prev => [...prev, newMember]);
  };

  const updateMember = (id: string, updatedMember: Partial<Member>) => {
    setMembers(prev => prev.map(member => 
      member.id === id ? { ...member, ...updatedMember } : member
    ));
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  // Event functions
  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, updatedEvent: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  // Leader functions
  const addLeader = (leader: Omit<Leader, 'id'>) => {
    const newLeader = { ...leader, id: Date.now().toString() };
    setLeaders(prev => [...prev, newLeader]);
  };

  const updateLeader = (id: string, updatedLeader: Partial<Leader>) => {
    setLeaders(prev => prev.map(leader => 
      leader.id === id ? { ...leader, ...updatedLeader } : leader
    ));
  };

  const deleteLeader = (id: string) => {
    setLeaders(prev => prev.filter(leader => leader.id !== id));
  };

  const value: DataContextType = {
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
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};