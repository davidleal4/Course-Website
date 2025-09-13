# CourseHub - Full-Stack Course Selling Platform

A modern, full-stack Next.js application for selling computer science courses online. Built with TypeScript, Tailwind CSS, Prisma, and Stripe for payments.

## 🚀 Features

- **🔐 User Authentication** - Sign up, sign in, and profile management
- **📚 Course Catalog** - Browse, search, and filter courses
- **💳 Stripe Payments** - Secure payment processing
- **📊 User Dashboard** - Track learning progress
- **📱 Responsive Design** - Mobile-friendly interface
- **🎯 Course Management** - Individual course pages with detailed content

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **UI**: Lucide React Icons

## 📸 Screenshots

### Homepage
![Homepage](https://github.com/user-attachments/assets/59aa4bab-1456-46a9-892a-cd909e8ac98f)

### Course Catalog
![Courses](https://github.com/user-attachments/assets/9c836a82-ab3d-429c-902e-2e88e811b458)

### Authentication
![Sign In](https://github.com/user-attachments/assets/e857c3b8-e122-4ee6-b3a8-8aedc5e01eb8)

### Course Detail
![Course Detail](https://github.com/user-attachments/assets/9ddf0b8e-f9d0-4e8a-88cf-389cb0ab56d7)

## 🚀 Quick Start

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd Course-Website
   npm install
   ```

2. **Set up environment variables** (see SETUP.md for details)
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Set up database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Visit** [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 🎯 Demo

**Demo Credentials:**
- Email: `admin@coursehub.com`
- Password: `password`

## 📄 License

This project is for educational purposes.
