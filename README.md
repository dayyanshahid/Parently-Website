# Parently Web

AI-powered Family Life Admin Assistant designed to help busy parents manage their family's activities, connect with other families, coordinate events, and streamline daily tasks.

## 🚀 Features

- **Family Directory** - Connect faces and names to families in your network
- **Event Coordination** - Create, invite, and coordinate parties, playdates, and sports events
- **Group Gifting** - Handle group gifts and contributions without messy reconciliation
- **24/7 AI Assistant** - Voice and chat interface for managing family schedules
- **Cross-Platform** - Access from iOS, Android, or web browser
- **Smart Reminders** - AI-powered reminders that adapt to your family's routine

## 📱 Pages

- **Home** (`/`) - Main landing page with all features and waitlist signup
- **Terms & Conditions** (`/terms`) - Legal terms and service agreement
- **Privacy Policy** (`/privacy`) - Comprehensive privacy and data protection policy

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, CSS Modules
- **Routing:** React Router DOM
- **Icons:** React Icons
- **Backend Ready:** Express.js + MySQL integration scaffold
- **Styling:** Responsive design with CSS Modules

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd parently-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📦 Build & Deploy

### Production Build
```bash
npm run build
```
Creates optimized build in `dist/` folder.

### Preview Build
```bash
npm run preview
```
Serves the production build locally for testing.

### Deploy
Upload the `dist/` folder contents to any static hosting service:
- Vercel
- Netlify  
- GitHub Pages
- Cloudflare Pages

## 🗄️ Database Integration

### Backend Setup (Optional)

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MySQL credentials
   ```

4. **Create database schema**
   ```bash
   mysql -u your_user -p your_database < schema.sql
   ```

5. **Start backend server**
   ```bash
   npm run dev
   ```

### Frontend Integration

1. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```

2. **Enable backend integration**
   ```env
   VITE_BACKEND_ENABLED=true
   VITE_API_BASE_URL=http://localhost:3001
   ```

## 📁 Project Structure

```
parently-web/
├── src/
│   ├── components/
│   │   ├── Hero/              # Main landing section with waitlist form
│   │   ├── Stats/             # User statistics display
│   │   ├── Waitlist/          # Waitlist signup component
│   │   ├── TermsAndConditions/ # Legal terms page
│   │   ├── PrivacyPolicy/     # Privacy policy page
│   │   └── ...
│   ├── services/
│   │   └── waitlistService.js # API integration layer
│   ├── config/
│   │   └── env.js            # Environment configuration
│   └── App.jsx               # Main app with routing
├── server/                   # Backend API (optional)
│   ├── index.js             # Express server
│   ├── schema.sql           # MySQL database schema
│   └── package.json         # Server dependencies
├── docs/
│   └── INTEGRATION.md       # Database integration guide
└── dist/                    # Production build output
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Components

### Waitlist Integration
- Feature-flagged backend integration
- Email deduplication
- Real-time stats updates
- Comprehensive logging for debugging

### Legal Pages
- Full-width responsive design
- Professional legal content
- Easy navigation with back buttons
- SEO-friendly structure

### Performance Optimizations
- React.memo for component optimization
- Lazy loading for images
- CSS Modules for scoped styling
- Tree-shaking and code splitting

## 🔒 Environment Variables

### Frontend (.env.local)
```env
VITE_BACKEND_ENABLED=false
VITE_API_BASE_URL=
```

### Backend (server/.env)
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=parently_db
PORT=3001
```

## 📊 Database Schema

### Waitlist Table
```sql
CREATE TABLE wait_list (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100),
  last_name VARCHAR(100), 
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  country VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔍 Console Logging

Extensive console logging has been added to track:

**Frontend:**
- `[ENV]` - Environment variable loading and configuration
- `[WAITLIST FORM]` - Form submission flow and results
- `[WAITLIST]` - API service calls for waitlist submission
- `[STATS COMPONENT]` - Stats component lifecycle and data fetching
- `[STATS]` - API service calls for stats retrieval

**Backend:**
- `[SERVER]` - Server startup, database connection, and configuration
- Request/response logging for `/waitlist` and `/stats` endpoints
- Database query results and error handling

## 🧪 Testing the Integration

1. **Check Console Logs**: Open browser dev tools to see detailed logging
2. **Submit Waitlist Form**: Fill out and submit - check console for API calls
3. **View Live Stats**: The "Eager Parents" count should update from database
4. **Test Duplicate Prevention**: Submit same email twice - should see 409 response
5. **Health Check**: Visit http://localhost:3000/healthz to test database connection

## 🛠️ Troubleshooting

**Backend won't start:**
- Check MySQL credentials in `server/.env`
- Ensure MySQL server is running
- Verify database and table exist

**Frontend not calling backend:**
- Check `.env.local` has `VITE_BACKEND_ENABLED=true`
- Restart frontend dev server after changing env vars
- Check console for `[ENV]` logs showing configuration

**Database connection issues:**
- Test with `curl http://localhost:3000/healthz`
- Check server console for `[SERVER]` database connection logs
- Verify MySQL user has proper permissions

## 🚀 Git & Deployment

### Prepare for Git Push
```bash
# Check what will be committed
git status

# Add all files
git add .

# Commit changes
git commit -m "feat: add Terms & Privacy pages with full-width responsive design

- Add Terms & Conditions page with comprehensive legal content
- Add Privacy Policy page with detailed privacy documentation
- Implement React Router for navigation between pages
- Add responsive full-width layout for legal pages
- Create reusable BackButton component with gradient styling
- Update Hero component links to navigate to legal pages
- Maintain all existing functionality and styling
- Add comprehensive console logging for debugging
- Prepare MySQL backend integration scaffold"

# Push to repository
git push origin main
```

### Production Deployment

1. Set production environment variables
2. Update `FRONTEND_ORIGIN` in server/.env for CORS
3. Use production MySQL instance
4. Build frontend: `npm run build`
5. Deploy backend with process manager (PM2, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Support

For questions or support, please contact:
- Email: support@parently.com
- Website: [parently.com](https://parently.com)

---

**Made with ❤️ for busy parents everywhere**
