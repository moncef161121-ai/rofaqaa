# Rofaqaa - Complete Source Code

A production-ready private social platform exclusively for Moroccan students.

## 📦 What's Included

### ✅ Complete Features
- ✨ User Authentication (sign up, sign in, password reset)
- 👤 User Profiles with avatars and bios
- 👫 Friend System (requests, accept, reject, remove, block)
- 💬 Private Messaging with real-time updates
- 👥 Group Chat creation and management
- 🔔 Notifications system
- 🔍 Search functionality
- 📱 Responsive design (mobile, tablet, desktop)
- 🌓 Dark mode support
- 🎨 Beautiful UI with Tailwind CSS
- 🚀 Production-ready code

### 📁 Project Structure

```
rofaqaa/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (dashboard)/    # Main app pages
│   │   ├── admin/          # Admin panel
│   │   ├── api/            # API routes
│   │   └── layout.tsx      # Root layout
│   ├── components/          # React components
│   │   ├── ui/             # UI components
│   │   ├── auth/           # Auth components
│   │   ├── chat/           # Chat components
│   │   ├── profile/        # Profile components
│   │   ├── group/          # Group components
│   │   ├── search/         # Search components
│   │   ├── common/         # Common components
│   │   └── providers/      # Context providers
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── lib/                # Utility functions
│   ├── types/              # TypeScript types
│   ├── stores/             # Zustand stores
│   ├── contexts/           # React contexts
│   ├── utils/              # General utilities
│   ├── constants/          # App constants
│   └── styles/             # Global styles
├── supabase/
│   └── migrations/         # Database migrations
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── next.config.ts          # Next.js config
├── tailwind.config.ts      # Tailwind config
├── jest.config.json        # Jest config
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone and install:**
```bash
git clone https://github.com/moncef161121-ai/rofaqaa.git
cd rofaqaa
npm install
```

2. **Setup environment:**
```bash
cp .env.example .env.local
```

3. **Add Supabase credentials to `.env.local`:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. **Run database migrations:**
   - Go to Supabase SQL Editor
   - Run migrations from `supabase/migrations/` in order

5. **Start development server:**
```bash
npm run dev
```

6. **Open browser:**
   Visit http://localhost:3000

## 📚 Key Technologies

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - High-quality UI components
- **Framer Motion** - Animations
- **React Query** - Data fetching
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Next.js Route Handlers** - API endpoints
- **Supabase** - Backend-as-a-service
- **PostgreSQL** - Database
- **Row Level Security** - Access control

### Deployment
- **Vercel** - Next.js hosting
- **Supabase** - Database hosting

## 🔐 Security Features

- ✅ Email verification
- ✅ Secure password hashing
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ Row Level Security (RLS)
- ✅ Secure headers
- ✅ Rate limiting
- ✅ Input validation

## 📖 Documentation

- [API Documentation](./API.md) - API endpoints and usage
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to production
- [Contributing](./CONTRIBUTING.md) - Contribute to the project
- [Security Policy](./SECURITY.md) - Security guidelines
- [Changelog](./CHANGELOG.md) - Version history

## 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 📦 Build for Production

```bash
# Build
npm run build

# Start production server
npm start
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 🗄️ Database Schema

The database includes tables for:
- **profiles** - User profile information
- **friend_requests** - Friend request management
- **friends** - Confirmed friendships
- **chats** - Private conversations
- **messages** - Private messages
- **groups** - Group chats
- **group_members** - Group membership
- **group_messages** - Group messages
- **notifications** - User notifications
- **blocked_users** - User blocks
- **reports** - Content reports
- **attachments** - File attachments

All tables have:
- Proper indexes for performance
- Row Level Security policies
- Foreign key constraints
- Timestamp tracking

## 🎨 Design

- **Primary Color**: #1B4332 (Green)
- **Accent Color**: #D4AF37 (Gold)
- **Inspired by**: Discord, Telegram, WhatsApp
- **Style**: Modern, minimal, beautiful animations
- **Dark Mode**: Fully supported

## 📱 Responsive

- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1919px)
- ✅ Mobile (320px - 767px)

## 🌍 Supported Languages

- English
- Arabic (العربية)
- French (Français)

## 📄 License

All rights reserved. This project is exclusive to Moroccan students.

## 📞 Support

- Email: support@rofaqaa.ma
- Documentation: See docs/
- Issues: GitHub Issues

## 👨‍💻 Author

Created with ❤️ for Moroccan students

---

**Note**: This is a complete, production-ready application. All features are fully implemented and tested.
