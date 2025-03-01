import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  excerpt: {
    type: String,
    required: [true, 'Summary preview is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  coverImage: {
    type: String,
    required: [true, 'Cover image is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  readingTime: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
