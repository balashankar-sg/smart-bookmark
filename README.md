# 🔖 Smart Bookmark App

A full-stack real-time bookmark manager built with Next.js (App Router), Supabase, and Tailwind CSS.

## 🚀 Live Demo
https://smart-bookmark-seven-kappa.vercel.app

---

## 🛠 Tech Stack

- Next.js 16 (App Router)
- Supabase (Auth, PostgreSQL, Realtime)
- Tailwind CSS
- Vercel (Deployment)

---

## ✨ Features

- Google OAuth authentication
- Add bookmark (title + URL)
- Delete bookmark
- Real-time sync across tabs
- Private bookmarks (Row Level Security)
- Case-insensitive duplicate prevention per user

---

## 🔐 Security

Bookmarks are secured using PostgreSQL Row Level Security (RLS).

Users can:
- View only their own bookmarks
- Insert only their own bookmarks
- Delete only their own bookmarks

Composite unique index prevents duplicate titles per user (case-insensitive).

---

## ⚡ Real-Time Functionality

Implemented using Supabase Realtime via PostgreSQL logical replication.

Replica identity set to FULL to support delete events in real-time.

---

## 🚧 Problems Faced & Solutions


###  OAuth returning `?code=` but not logging in
**Problem:** Session not created after redirect  
**Solution:** Used `supabase.auth.exchangeCodeForSession()` in client.

---

### 3️⃣ Realtime subscription TIMED_OUT
**Problem:** WebSocket closing in development  
**Solution:** Disabled React Strict Mode and handled cleanup properly.

