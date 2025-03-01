'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  createdAt: string;
  status: 'draft' | 'published';
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin?callbackUrl=/admin/blog');
    },
  });

  useEffect(() => {
    if (status === 'loading') return;
    if (session?.user?.role !== 'admin') {
      redirect('/dashboard');
    }
    fetchPosts();
  }, [session, status]);

  const fetchPosts = async () => {
    try {
      // TODO: Replace with actual API call
      // Simulated data for now
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Getting Started with AfriSaaS',
          excerpt: 'Learn how to build your first SaaS application with our boilerplate',
          author: 'John Doe',
          createdAt: '2025-02-28',
          status: 'published',
        },
        {
          id: '2',
          title: 'Best Practices for African Markets',
          excerpt: 'Discover key insights for building successful SaaS products in Africa',
          author: 'Jane Smith',
          createdAt: '2025-02-27',
          status: 'draft',
        },
      ];
      setPosts(mockPosts);
    } catch (err: any) {
      setError(err.message || 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      // TODO: Implement delete functionality
      console.log('Deleting post:', postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 my-4">
        <div className="text-red-500 text-center">
          <h3 className="font-semibold mb-2">Error Loading Blog Posts</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Blog Management</h1>
          <p className="mt-2 text-sm text-gray-300">
            Create, edit, and manage your blog posts
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/admin/blog/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Create New Post
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Author
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-900">
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div>
                          <div className="font-medium text-white">{post.title}</div>
                          <div className="text-gray-400">{post.excerpt}</div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {post.author}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {post.createdAt}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/blog/edit/${post.id}`}
                            className="text-primary hover:text-primary/80"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
