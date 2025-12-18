# 🎬 FlopFlix

> A modern, AI-powered movie and TV show discovery platform built with Next.js 15

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

![FlopFlix Demo](./public/demo.gif)

## ✨ Features

### 🎥 Content Discovery
- **10,000+ Movies & TV Shows** powered by TMDB API
- **Advanced Filtering** by genre, year, rating, and popularity
- **Actor Profiles** with complete filmography
- **TV Show Seasons** with episode breakdowns
- **Movie Collections** and franchises

### 🤖 AI-Powered
- **Smart Recommendations** using Gemini 2.5 Flash
- **Natural Language Search** for movies
- **Personalized Suggestions** based on watch history

### 📊 User Features
- **Watch History** tracking with analytics
- **Favorites Management** for movies, shows, and actors
- **Review System** with 1-10 ratings
- **Analytics Dashboard** with genre insights

### 💎 Premium Features
- **Ad-Free Experience**
- **Advanced Analytics**
- **Early Access** to new features
- **Priority Support**

### 🎨 Beautiful UI
- **Smooth Animations** with Framer Motion
- **3D Tilt Effects** on cards
- **Image Trail** cursor effects
- **Expanding Transitions** between pages
- **Dark Mode** support

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - App Router with Server Components
- **React 19** - Latest features and hooks
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality components
- **Framer Motion** - Advanced animations
- **GSAP** - Timeline animations

### Backend
- **Next.js API Routes** - RESTful endpoints
- **Prisma ORM** - Type-safe database queries
- **PostgreSQL** - Relational database
- **Clerk** - Authentication & payments

### State Management
- **TanStack Query** - Server state & caching
- **Zustand** - Client state with Immer

### APIs
- **TMDB API** - Movie/TV data
- **OMDB API** - Extended metadata
- **Gemini 2.5 Flash** - AI recommendations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- TMDB API key
- OMDB API key
- Gemini API key
- Clerk account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/flopflix.git
cd flopflix
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```env
# Database
DATABASE_URL="postgresql://..."

# APIs
NEXT_PUBLIC_TMDB_API_KEY="your_tmdb_key"
NEXT_PUBLIC_OMDB_API_KEY="your_omdb_key"
GEMINI_API_KEY="your_gemini_key"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_key"
CLERK_SECRET_KEY="your_clerk_secret"
```

4. **Set up database**
```bash
npx prisma generate
npx prisma migrate dev
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure
```
flopflix/
├── app/
│   ├── (dashboard)/          # Protected routes
│   ├── api/                  # API routes
│   └── layout.tsx
├── components/
│   ├── Movie/                # Movie components
│   ├── TvShow/               # TV show components
│   ├── actor/                # Actor components
│   └── ui/                   # shadcn/ui components
├── hooks/                    # Custom React hooks
├── lib/
│   ├── actions/              # Server actions
│   ├── mutations/            # TanStack mutations
│   └── queryOptions/         # Query configurations
├── prisma/
│   └── schema.prisma         # Database schema
└── store/                    # Zustand stores
```

## 🎯 Key Features Implementation

### Image Trail Effect
Custom GSAP-powered cursor trail with multiple animation variants:
```typescript
// 8 different animation styles
// Configurable speed, threshold, and trail length
// Touch and mouse support
```

### Expanding Card Transition
Smooth page transitions with shared element animations:
```typescript
// Captures initial card position
// Expands to fullscreen
// Navigates to detail page
```

### AI Chat Integration
Streaming responses with movie recommendations:
```typescript
// Gemini 2.5 Flash API
// JSON parsing for movie suggestions
// Real-time card rendering
```

## 📊 Database Schema

- **Users** - Clerk integration
- **WatchedHistory** - View tracking
- **Favorites** - Saved content
- **Reviews** - User ratings
- **WatchList** - To-watch queue

## 🎨 UI Components

### Custom Components
- `MovieCard` - Tilt effect with hover animations
- `ActorShowcase` - Biography with filmography
- `TvSeasonDetails` - Episode listings
- `AnalyticsComp` - Recharts visualizations

### Motion Primitives
- `Tilt` - 3D tilt on hover
- `ImageTrail` - Cursor trail effect
- `ExpandingOverlay` - Page transitions

## 🔒 Premium Features

Integrated with Clerk's payment system:
- Subscription management
- Feature gating
- Analytics access
- AI recommendations
---

⭐ Star this repo if you find it useful!
