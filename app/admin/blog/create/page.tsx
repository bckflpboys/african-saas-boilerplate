'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import {
  PhotoIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  ArrowLeftIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { createBlogPost, uploadToCloudinary } from '@/app/actions/blog';
import { debounce } from 'lodash';
import readingTime from 'reading-time';
import { Switch } from '@headlessui/react';

interface BlogPostForm {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  readingTime: string;
  tags: string[];
  author: string;
  isBanner: boolean;
  isFeatured: boolean;
}

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
  type: 'image' | 'video' | 'audio';
  title: string;
}

const MediaModal = ({ isOpen, onClose, onSubmit, type, title }: MediaModalProps) => {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploading(true);
      try {
        // TODO: Implement actual file upload to your server/cloud storage
        // For now, we'll use a local URL
        const url = URL.createObjectURL(selectedFile);
        setUrl(url);
      } catch (error) {
        console.error('Failed to upload file:', error);
        alert('Failed to upload file. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleModalSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (url) {
      onSubmit(url);
      setUrl('');
      setFile(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Enter URL or upload file
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={`Enter ${type} URL`}
                className="flex-1 rounded-md border border-gray-700 bg-gray-900 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={
                  type === 'image' ? 'image/*' : 
                  type === 'video' ? 'video/*' : 
                  'audio/*'
                }
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 flex items-center gap-2"
              >
                {type === 'image' ? <PhotoIcon className="h-5 w-5" /> :
                 type === 'video' ? <VideoCameraIcon className="h-5 w-5" /> :
                 <MusicalNoteIcon className="h-5 w-5" />}
                Upload
              </button>
            </div>
          </div>

          {file && (
            <div className="mt-4">
              <p className="text-sm text-gray-300">Selected file: {file.name}</p>
            </div>
          )}

          {isUploading && (
            <div className="flex items-center gap-2 text-gray-300">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
              <span>Uploading...</span>
            </div>
          )}

          {type === 'image' && url && (
            <div className="mt-4 relative rounded-lg overflow-hidden border border-gray-700 aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="Preview" className="object-contain w-full h-full" />
            </div>
          )}

          {type === 'video' && url && (
            <div className="mt-4">
              <iframe
                src={url}
                className="w-full aspect-video rounded-lg"
                allowFullScreen
              />
            </div>
          )}

          {type === 'audio' && url && (
            <div className="mt-4">
              <audio src={url} controls className="w-full" />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleModalSubmit}
              disabled={!url || isUploading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuBar = ({ editor }: any) => {
  const [activeModal, setActiveModal] = useState<'image' | 'video' | 'audio' | null>(null);

  if (!editor) {
    return null;
  }

  const handleMediaSubmit = (url: string) => {
    if (activeModal === 'image') {
      // Insert image with proper attributes
      editor.chain().focus().setImage({ 
        src: url,
        alt: 'Blog image',
        title: 'Blog image'
      }).run();
    } else if (activeModal === 'video') {
      // Handle YouTube URLs by extracting video ID
      const videoId = extractYouTubeVideoId(url);
      if (videoId) {
        editor.chain().focus().setYoutubeVideo({
          src: `https://www.youtube.com/embed/${videoId}`,
          width: 640,
          height: 480
        }).run();
      } else {
        // For direct video files, insert video element
        editor.chain().focus().insertContent(`
          <video controls width="100%" height="auto">
            <source src="${url}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        `).run();
      }
    } else if (activeModal === 'audio') {
      // Insert audio with controls
      editor.chain().focus().insertContent(`
        <audio controls style="width: 100%; margin: 1em 0;">
          <source src="${url}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      `).run();
    }
  };

  // Helper function to extract YouTube video ID
  const extractYouTubeVideoId = (url: string): string | null => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^/?]+)/i,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^/?]+)/i
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  const handleMediaCancel = () => {
    setActiveModal(null);
  };

  const handleEditorButtonClick = (callback: () => boolean) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.currentTarget.type = 'button'; // Prevent form submission
      callback();
    };
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 p-2 bg-gray-800 border-b border-gray-700 rounded-t-md">
        <div className="flex items-center gap-2 border-r border-gray-700 pr-2 mr-2">
          <button
            type="button"
            onClick={handleEditorButtonClick(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
            className={`px-2 py-1 rounded ${
              editor.isActive('heading', { level: 1 }) ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            h1
          </button>
          <button
            type="button"
            onClick={handleEditorButtonClick(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
            className={`px-2 py-1 rounded ${
              editor.isActive('heading', { level: 2 }) ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            h2
          </button>
          <button
            onClick={handleEditorButtonClick(() => editor.chain().focus().toggleBold().run())}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('bold') ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            bold
          </button>
          <button
            onClick={handleEditorButtonClick(() => editor.chain().focus().toggleItalic().run())}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('italic') ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            italic
          </button>
          <button
            onClick={handleEditorButtonClick(() => editor.chain().focus().toggleStrike().run())}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('strike') ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            strike
          </button>
          <button
            onClick={handleEditorButtonClick(() => editor.chain().focus().toggleCode().run())}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('code') ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            code
          </button>
          <button
            onClick={handleEditorButtonClick(() => editor.chain().focus().setParagraph().run())}
            className={`px-2 py-1 rounded ${
              editor.isActive('paragraph') ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            paragraph
          </button>
          <button
            onClick={handleEditorButtonClick(() => editor.chain().focus().toggleBulletList().run())}
            className={`px-2 py-1 rounded ${
              editor.isActive('bulletList') ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            bullet list
          </button>
          <button
            onClick={handleEditorButtonClick(() => editor.chain().focus().toggleOrderedList().run())}
            className={`px-2 py-1 rounded ${
              editor.isActive('orderedList') ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            ordered list
          </button>
          <button
            onClick={handleEditorButtonClick(() => editor.chain().focus().toggleCodeBlock().run())}
            className={`px-2 py-1 rounded ${
              editor.isActive('codeBlock') ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            code block
          </button>
          <button
            onClick={handleEditorButtonClick(() => editor.chain().focus().toggleBlockquote().run())}
            className={`px-2 py-1 rounded ${
              editor.isActive('blockquote') ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            blockquote
          </button>
        </div>

        <div className="flex items-center gap-2 border-r border-gray-700 pr-2 mr-2">
          <button
            type="button"
            onClick={() => setActiveModal('image')}
            className="flex items-center gap-1 px-2 py-1 rounded text-gray-300 hover:bg-gray-700"
            title="Add Image"
          >
            <PhotoIcon className="h-5 w-5" />
            <span>Image</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('video')}
            className="flex items-center gap-1 px-2 py-1 rounded text-gray-300 hover:bg-gray-700"
            title="Add Video"
          >
            <VideoCameraIcon className="h-5 w-5" />
            <span>Video</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('audio')}
            className="flex items-center gap-1 px-2 py-1 rounded text-gray-300 hover:bg-gray-700"
            title="Add Audio"
          >
            <MusicalNoteIcon className="h-5 w-5" />
            <span>Audio</span>
          </button>
        </div>
      </div>

      <MediaModal
        isOpen={activeModal === 'image'}
        onClose={handleMediaCancel}
        onSubmit={handleMediaSubmit}
        type="image"
        title="Add Image"
      />

      <MediaModal
        isOpen={activeModal === 'video'}
        onClose={handleMediaCancel}
        onSubmit={handleMediaSubmit}
        type="video"
        title="Add Video"
      />

      <MediaModal
        isOpen={activeModal === 'audio'}
        onClose={handleMediaCancel}
        onSubmit={handleMediaSubmit}
        type="audio"
        title="Add Audio"
      />
    </>
  );
};

// Common blog categories
const BLOG_CATEGORIES = [
  'Technology',
  'Business',
  'Marketing',
  'Design',
  'Development',
  'Tutorial',
  'News',
  'Case Study',
  'Industry Insights',
  'Product Updates',
  'How-to Guide',
  'Best Practices',
] as const;

export default function CreateBlogPost() {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin?callbackUrl=/admin/blog/create');
    },
  });

  const coverImageRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<BlogPostForm>({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: '',
    readingTime: '',
    tags: [],
    author: '',
    isBanner: false,
    isFeatured: false
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate reading time whenever content changes
  const calculateReadingTime = (content: string) => {
    // Remove HTML tags for accurate reading time
    const textContent = content.replace(/<[^>]*>/g, '');
    const stats = readingTime(textContent);
    return `${Math.ceil(stats.minutes)} min read`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const blogId = Date.now().toString();
      // Extract all media URLs from the content
      const mediaRegex = /src="(blob:[^"]+)"/g;
      let content = editor?.getHTML() || '';
      const mediaMatches = [...content.matchAll(mediaRegex)];

      // Upload each blob URL to Cloudinary
      for (const match of mediaMatches) {
        const blobUrl = match[1];
        // Fetch the blob
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        
        // Convert blob to base64
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });

        // Upload to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(base64, blogId, 'content');
        // Replace blob URL with Cloudinary URL
        content = content.replace(blobUrl, cloudinaryUrl);
      }

      // Upload cover image if it's a blob URL
      let coverImage = formData.coverImage;
      if (coverImage.startsWith('blob:')) {
        const response = await fetch(coverImage);
        const blob = await response.blob();
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
        coverImage = await uploadToCloudinary(base64, blogId, 'cover');
      }

      console.log('Submitting blog post with data:', {
        ...formData,
        content,
        coverImage,
        blogId,
        isBanner: formData.isBanner,
        isFeatured: formData.isFeatured
      });

      // Create blog post with Cloudinary URLs
      const result = await createBlogPost({
        ...formData,
        content,
        coverImage,
        blogId,
        isBanner: formData.isBanner,
        isFeatured: formData.isFeatured
      });

      // Redirect to the blog list page
      router.push('/admin/blog');
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      setError(error.message || 'Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  // Debounce the content update to prevent rapid state updates
  const debouncedContentUpdate = useCallback(
    debounce((content: string) => {
      setFormData(prev => ({
        ...prev,
        content,
        readingTime: calculateReadingTime(content)
      }));
    }, 500),
    []
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2]
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            style: 'list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0;'
          }
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            style: 'list-style-type: decimal; padding-left: 1.5rem; margin: 1rem 0;'
          }
        },
        listItem: {
          HTMLAttributes: {
            style: 'margin-bottom: 0.5rem; color: #D1D5DB;'
          }
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-lg',
        },
      }),
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
        .replace(/<h1[^>]*>/g, '<h1>')  // Clean any extra attributes from h1
        .replace(/<h2[^>]*>/g, '<h2>'); // Clean any extra attributes from h2
      debouncedContentUpdate(content);
    },
    editorProps: {
      attributes: {
        class: [
          'prose prose-sm prose-invert max-w-none min-h-[200px] p-4 focus:outline-none',
          'prose-h1:text-4xl prose-h1:font-bold prose-h1:text-white prose-h1:mb-6',
          'prose-h2:text-3xl prose-h2:font-semibold prose-h2:text-white prose-h2:mb-4',
          'prose-p:mb-4 prose-p:text-gray-300',
          'prose-p:empty:mt-8', // Add extra margin for empty paragraphs (line breaks)
          'prose-ul:list-disc prose-ul:pl-4',
          'prose-ol:list-decimal prose-ol:pl-4',
          'prose-li:mb-1',
          'prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic',
          'prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg'
        ].join(' '),
      },
    },
    immediatelyRender: false,
  });

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // TODO: Implement actual image upload to your server/cloud storage
        // For now, we'll use a local URL
        const url = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, coverImage: url }));
      } catch (error) {
        console.error('Failed to upload cover image:', error);
        alert('Failed to upload cover image. Please try again.');
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-semibold text-white">Create New Blog Post</h1>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
        <p className="text-sm text-red-500">{error}</p>
      </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300">
            Summary Preview
          </label>
          <p className="text-sm text-gray-400 mb-2">
            A brief summary of your post (150-160 characters). This will appear in search results and social media shares.
          </p>
          <textarea
            id="excerpt"
            rows={3}
            maxLength={160}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Enter a compelling summary of your post to attract readers..."
            required
          />
          <p className="mt-1 text-sm text-gray-400">
            {formData.excerpt.length}/160 characters
          </p>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">Select a category</option>
            {BLOG_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-300">
            Author
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Enter author name"
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, author: 'Admin' }))}
              className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Set as Admin
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-400">
            Only administrators can edit the author name. Click "Set as Admin" to quickly set yourself as the author.
          </p>
        </div>

        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-300">
            Cover Image
          </label>
          <p className="text-sm text-gray-400 mb-2">
            Upload an image or provide a URL for your blog post cover
          </p>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                id="coverImage"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="Enter image URL or upload a file"
                className="flex-1 rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              <input
                type="file"
                ref={coverImageRef}
                onChange={handleCoverImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => coverImageRef.current?.click()}
                className="flex items-center gap-1 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              >
                <PhotoIcon className="h-5 w-5" />
                <span>Upload</span>
              </button>
            </div>
            {formData.coverImage && (
              <div className="relative rounded-lg overflow-hidden border border-gray-700 aspect-[16/9] max-w-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                  className="absolute top-2 right-2 p-1 bg-red-500/80 text-white rounded-full hover:bg-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="ml-1 inline-flex items-center justify-center"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
              placeholder="Add a tag"
              className="flex-1 rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Content
          </label>
          <div className="flex items-center gap-2 mb-2">
            <ClockIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">{formData.readingTime}</span>
          </div>
          <div className="prose-editor border border-gray-700 rounded-md bg-gray-800">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex items-center gap-3">
            <Switch
              checked={formData.isBanner}
              onChange={() => setFormData(prev => ({ ...prev, isBanner: !prev.isBanner }))}
              className={`${
                formData.isBanner ? 'bg-primary' : 'bg-gray-700'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800`}
            >
              <span
                className={`${
                  formData.isBanner ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
            <span className="text-sm font-medium text-gray-300">Show in Banner</span>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              checked={formData.isFeatured}
              onChange={() => setFormData(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
              className={`${
                formData.isFeatured ? 'bg-primary' : 'bg-gray-700'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800`}
            >
              <span
                className={`${
                  formData.isFeatured ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
            <span className="text-sm font-medium text-gray-300">Featured Post</span>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/blog"
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
