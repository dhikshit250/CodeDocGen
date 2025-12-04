# Installation Instructions

## Prerequisites
- Node.js 18+ 
- PostgreSQL database

## Installation Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values:
- `NEXTAUTH_SECRET` - Generate a random string
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- `DISCORD_CLIENT_ID` & `DISCORD_CLIENT_SECRET` - From Discord Developer Portal
- `DATABASE_URL` - Your PostgreSQL connection string

3. **Set up the database:**
```bash
# Create database tables (you'll need to run migrations)
npx drizzle-kit push:pg
```

4. **Start the development server:**
```bash
npm run dev
```

## Dependencies Added

The following packages have been added to handle the backend functionality:

### Database & ORM
- `drizzle-orm` - SQL toolkit for TypeScript
- `drizzle-zod` - Zod schemas from Drizzle
- `postgres` - PostgreSQL client

### File Handling
- `jszip` - ZIP file creation for project downloads

### Type Definitions
- `@types/jszip` - TypeScript types for JSZip

## Troubleshooting

If you still see "Cannot find module" errors after running `npm install`:

1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Restart your TypeScript server in your IDE

3. Ensure all dependencies are properly installed by checking:
```bash
npm list drizzle-orm
npm list postgres
npm list jszip
```
