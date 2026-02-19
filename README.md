#  Bookmark Manager — Full Stack Application

##  Live Demo
**Live Application URL:** <<<https://bookmark-manager-eta-lake.vercel.app/>>>

## GitHub Repository
**Source Code:** <<<https://github.com/NPC-navyaa/bookmark-manager>>>

---

#  Project Overview

This project is a full-stack Bookmark Manager web application built using:

- Next.js 14 (App Router)
- Supabase (Authentication, Database, Realtime)
- Tailwind CSS
- Vercel (Deployment)

The application allows users to:

- Sign in securely using Google OAuth
- Add personal bookmarks (Title + URL)
- Delete bookmarks
- View real-time updates without refreshing the page
- Access only their own bookmarks securely

This project demonstrates full-stack development skills, secure authentication integration, real-time data synchronization, and production deployment.

---

#  System Architecture

The application follows a modern serverless architecture.

## Frontend Layer
Built using Next.js App Router which handles UI rendering and client logic.

## Backend Services (Supabase)
Provides:
- Authentication system
- PostgreSQL database
- Real-time event engine

## Deployment Platform
The application is hosted on Vercel cloud infrastructure.

---

#  Technologies Used and Why

## Next.js (App Router)

Used for:
- Modern React architecture
- File-based routing
- Optimized performance
- Easy Vercel deployment

App Router was chosen because it is the latest and recommended Next.js architecture.

---

## Supabase

Supabase was used as a Backend-as-a-Service to provide:

### Authentication
- Google OAuth login
- Secure session handling

### Database
- PostgreSQL relational database
- Structured data storage

### Realtime
- Listens to database changes
- Pushes updates instantly to frontend

Supabase eliminates the need for building a custom backend.

---

## Tailwind CSS

Used for:
- Fast UI styling
- Responsive layouts
- Modern design system

---

# 🗄 Database Design

A single table named `bookmarks` was created.

Each row represents one bookmark.

## Table Structure

| Column | Description |
|--------|-------------|
| id | Unique bookmark ID |
| user_id | Owner of the bookmark |
| title | Bookmark title |
| url | Bookmark link |
| created_at | Timestamp |

---

#  Data Security — Row Level Security (RLS)

Row Level Security was enabled to ensure users can only access their own data.

Without RLS:
All users could see all bookmarks.

With RLS:
Users can only access records where:

auth.uid() = user_id

Policies were created for:
- SELECT
- INSERT
- DELETE

This ensures complete data privacy.

---

#  Real-Time Functionality — How It Works

Supabase Realtime allows the frontend to listen to database changes.

Steps:

1. A subscription channel is created in the dashboard.
2. It listens for INSERT, DELETE, and UPDATE events.
3. When a change occurs:
   - Supabase sends an event to the frontend.
   - The UI automatically refreshes the bookmark list.

This allows instant updates without page refresh.

---

#  Step-by-Step Development Process

## Step 1 — Project Initialization

Created Next.js project:

npx create-next-app@latest bookmark-manager

Configured:
- App Router
- Tailwind CSS
- TypeScript

Installed Supabase client:

npm install @supabase/supabase-js

---

## Step 2 — Supabase Setup

- Created Supabase project
- Created bookmarks table
- Enabled Row Level Security
- Added access policies
- Enabled realtime replication

---

## Step 3 — Google Authentication Setup

- Enabled Google provider in Supabase
- Created OAuth credentials in Google Cloud Console
- Added redirect URI:
https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback

---

## Step 4 — Frontend Development

Implemented:
- Login page
- Dashboard page
- Bookmark add/delete logic
- User session handling

---

## Step 5 — Real-Time Integration

- Enabled replication in Supabase
- Subscribed to database changes
- Implemented automatic UI refresh

---

## Step 6 — UI Development

Designed:
- Modern card layout
- Responsive forms
- Accessible colors
- Loading states
- Empty state messaging

---

## Step 7 — GitHub Setup

Initialized Git:

git init
git add .
git commit -m "Initial commit"

Connected to GitHub:

git remote add origin <<<https://github.com/NPC-navyaa/bookmark-manager>>>
git push -u origin main

---

## Step 8 — Deployment to Vercel

Steps:

1. Imported GitHub repo into Vercel
2. Added environment variables
3. Deployed application
4. Configured production OAuth URLs

---

# 🧪 How to Run Locally

## Clone repository

git clone <<<https://github.com/NPC-navyaa/bookmark-manager.git>>>
cd bookmark-manager

## Install dependencies

npm install

## Add environment variables

Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=<<<YOUR SUPABASE URL>>>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<<<sb_publishable_eNYo2g9gvXHjy41ptg7ECw_1t_YsJMZ>>>

## Run development server

npm run dev

Open:
http://localhost:3000

---

# 🧩 Challenges Faced

Google OAuth redirect errors were resolved by configuring correct redirect URLs.

Row Level Security initially blocked data, which was solved by implementing correct policies.

Realtime updates did not work until table replication was enabled.

PowerShell script errors were resolved by updating execution policy.

---

# 📈 Future Improvements

- Bookmark editing
- Search functionality
- Bookmark categories
- Dark mode support
- URL preview thumbnails

---

# 👩‍💻 Author

<<<YOUR NAME>>>

---

# ✅ Conclusion

This project demonstrates strong knowledge of:

- Full-stack development
- Authentication integration
- Database security
- Real-time systems
- Cloud deployment

The application is fully functional and production-ready.

---

## 🎉 Thank You

