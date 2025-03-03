import mongoose, { Document } from 'mongoose';

interface IBlog extends Document {
  blogId: string;
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
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema<IBlog>({
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
  isBanner: {
    type: Boolean,
    required: true,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
  strict: true,
  validateBeforeSave: true,
});

// Ensure boolean fields are properly set before saving
blogSchema.pre('save', function(next) {
  if (typeof this.isBanner !== 'undefined') {
    this.isBanner = Boolean(this.isBanner);
  }
  if (typeof this.isFeatured !== 'undefined') {
    this.isFeatured = Boolean(this.isFeatured);
  }
  next();
});

// Add a method to properly serialize the document
blogSchema.methods.toJSON = function() {
  const obj = this.toObject();
  obj.isBanner = Boolean(obj.isBanner);
  obj.isFeatured = Boolean(obj.isFeatured);
  return obj;
};

const Blog = mongoose.models.Blog as mongoose.Model<IBlog> || mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
