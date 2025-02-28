# African SaaS Boilerplate

A modern, full-stack SaaS boilerplate built with Next.js 14, specifically designed for African businesses and startups. This boilerplate provides essential features needed to quickly launch a SaaS product while considering African market needs and payment integrations.

## Features

### Authentication & Authorization
- Email/Password authentication using NextAuth.js
- JWT-based session management
- Role-based access control (User/Admin)
- Protected routes and API endpoints
- Secure password hashing with bcryptjs

### User Dashboard
- Modern, responsive dashboard layout
- User profile management
- Activity tracking
- Subscription management
- Document management
- Analytics visualization

### Admin Dashboard
- Comprehensive admin panel
- User management
- Subscription oversight
- Analytics and reporting
- Role management
- System settings

### Database
- MongoDB integration with Mongoose
- Efficient data modeling
- Type-safe database operations
- Automatic connection management

### UI/UX
- Modern, responsive design
- Dark theme
- Tailwind CSS for styling
- Headless UI components
- Hero Icons integration
- Mobile-first approach

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Headless UI
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **State Management**: React Hooks
- **Icons**: Hero Icons
- **Type Safety**: TypeScript
- **API**: Next.js API Routes

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- MongoDB database
- npm or yarn package manager

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/african-saas-boilerplate.git
cd african-saas-boilerplate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   └── dashboard/         # User dashboard
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── models/               # Mongoose models
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Authentication Flow

The application uses NextAuth.js with JWT strategy for authentication:
1. User signs in with email/password
2. Credentials are verified against the database
3. JWT token is generated with user role and ID
4. Session is maintained using JWT
5. Protected routes check user authentication and role

## Role-Based Access

Two main roles are supported:
- **User**: Regular user access to dashboard
- **Admin**: Full access to admin dashboard and management features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@yourdomain.com or open an issue in the repository.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting solutions
- MongoDB for database services
- All contributors and supporters
