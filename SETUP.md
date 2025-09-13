# CourseHub - Course Selling Platform

A full-stack Next.js application for selling computer science courses with user authentication, payment processing, and course management.

## Features

### 🎯 Core Features
- **User Authentication**: Sign up, sign in, and profile management with NextAuth.js
- **Course Catalog**: Browse and search courses with filtering by category and level
- **Payment Processing**: Secure payments with Stripe integration
- **Course Access**: Protected course content for enrolled users
- **User Dashboard**: Track learning progress and manage enrolled courses
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

### 🛠 Technical Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: NextAuth.js with credentials provider
- **Payments**: Stripe for secure payment processing
- **UI Components**: Lucide React icons, custom components

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Course-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.local` and update the values:
   ```bash
   # Database
   DATABASE_URL="file:./dev.db"

   # NextAuth.js
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # Stripe (get from https://dashboard.stripe.com/)
   STRIPE_PUBLISHABLE_KEY="pk_test_your_key"
   STRIPE_SECRET_KEY="sk_test_your_key"
   STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # Seed the database with sample data
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   Visit [http://localhost:3000](http://localhost:3000)

## Usage

### Demo Credentials
- **Email**: admin@coursehub.com
- **Password**: password

### Key Pages
- **Homepage**: `/` - Hero section with featured courses
- **Courses**: `/courses` - Browse all available courses
- **Course Detail**: `/courses/[id]` - Individual course information
- **Sign In**: `/auth/signin` - User authentication
- **Sign Up**: `/auth/signup` - User registration
- **Dashboard**: `/dashboard` - User learning dashboard (requires login)

### Payment Flow
1. User browses courses
2. Clicks "Enroll Now" on course detail page
3. Redirected to Stripe Checkout
4. Upon successful payment, gains access to course content

## Development

### Project Structure
```
src/
├── app/                  # Next.js app router pages
│   ├── api/             # API routes
│   ├── auth/            # Authentication pages
│   ├── courses/         # Course pages
│   └── dashboard/       # User dashboard
├── components/          # React components
├── lib/                # Utilities and configurations
└── types/              # TypeScript type definitions

prisma/
├── schema.prisma       # Database schema
└── seed.ts            # Database seeding script
```

### Database Schema
- **Users**: Authentication and profile data
- **Courses**: Course information and metadata
- **Lessons**: Individual course lessons
- **Purchases**: Course enrollment records
- **Accounts/Sessions**: NextAuth.js tables

### API Routes
- `POST /api/register` - User registration
- `GET /api/courses` - Fetch courses with filtering
- `POST /api/stripe/checkout` - Create Stripe checkout session
- `/api/auth/*` - NextAuth.js authentication endpoints

## Deployment

### Environment Setup
1. Set up a PostgreSQL database
2. Update `DATABASE_URL` in environment variables
3. Configure Stripe with production keys
4. Set `NEXTAUTH_URL` to your domain

### Build for Production
```bash
npm run build
npm start
```

### Database Migration
```bash
npx prisma migrate deploy
npx prisma generate
```

## Features Implementation Status

✅ **Completed**
- Homepage with hero section and featured courses
- Course catalog with search and filtering
- Individual course detail pages
- User authentication (sign up/sign in)
- User dashboard for enrolled courses
- Responsive design and navigation
- Database schema and relationships
- Stripe payment integration setup
- Course access control

🚧 **Ready for Enhancement**
- Video player for course content
- Progress tracking for lessons
- Course completion certificates
- Admin panel for course management
- Email notifications
- Advanced search and recommendations
- Course reviews and ratings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes. Please ensure proper licensing for commercial use.

## Support

For questions or issues, please open a GitHub issue or contact the development team.