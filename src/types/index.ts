export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  published: boolean;
}

export interface Member {
  id: string;
  name: string;
  image: string;
  bio: string;
  email?: string;
  joinDate?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  published: boolean;
}

export interface Leader {
  id: string;
  name: string;
  image: string;
  position: string;
  quote: string;
  bio?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}