# 🎬 Sagar Bhavsar — Netflix-Style Portfolio

A cinematic, Netflix-inspired portfolio built with React and TypeScript. Features profile-based navigation, animated transitions, AI-powered job fit analysis, and a dynamic content system powered by DatoCMS.

**Live →** [your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

---

## ✨ Features

- 🎬 **Netflix Intro Animation** — Full cinematic splash screen on load
- 👤 **Profile Selection** — Recruiter, Developer, Friend, and Bot personas with tailored content
- 🚀 **Rocket Timeline** — Animated experience timeline with scroll-triggered rocket launch
- 🤖 **Find Your Fit** — Paste a job description and get AI-powered fit analysis (Groq LLM)
- 📊 **Bento Grid Projects** — Dynamic project showcase with glassmorphism cards
- 📝 **Blog & Certifications** — Integrated content sections
- 🎯 **Recommendations** — LinkedIn-style recommendation cards
- 📬 **Contact Form** — Direct email integration
- 📱 **Fully Responsive** — Optimized for desktop and mobile

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React 18, TypeScript, Framer Motion |
| **Styling** | Vanilla CSS with custom animations |
| **CMS** | DatoCMS (GraphQL) |
| **AI** | Groq API (LLaMA) via Vercel Serverless Functions |
| **Routing** | React Router v6 |
| **Hosting** | Vercel |

---

## 📚 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repo
git clone https://github.com/sagarbhavsar1/netflix_portfolio.git
cd netflix_portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
REACT_APP_DATOCMS_ROR_TOKEN=your_datocms_token
REACT_APP_RESUME_URL=your_resume_google_drive_link
GROQ_API_KEY=your_groq_api_key
```

### Run Locally

```bash
# Frontend only
npm start

# Full stack (with serverless functions)
vercel dev --listen 3000
```

Open [http://localhost:3000](http://localhost:3000) to view it.

---

## 📁 Project Structure

```
netflix_portfolio/
├── api/                    # Vercel serverless functions
│   └── analyze-fit.js      # Groq AI job fit analysis endpoint
├── public/                 # Static assets & index.html
├── src/
│   ├── browse/             # Profile selection page
│   ├── components/         # Shared components (NavBar, ScrollToTop)
│   ├── images/             # Static images & logos
│   ├── pages/              # Page components
│   │   ├── WorkExperience  # Rocket timeline experience page
│   │   ├── Projects        # Bento grid project showcase
│   │   ├── Skills          # Skills section
│   │   ├── FindYourFit     # AI job fit analysis
│   │   ├── ContactMe       # Contact form
│   │   ├── Blogs           # Blog posts
│   │   ├── Certifications  # Certifications
│   │   └── Recommendations # LinkedIn recommendations
│   ├── profilePage/        # Profile page layout & sections
│   ├── queries/            # DatoCMS GraphQL queries
│   ├── NetflixTitle.tsx     # Splash screen intro animation
│   └── App.tsx             # Route definitions
├── vercel.json             # Vercel deployment config
└── package.json
```

---

## 🚀 Deployment (Vercel)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables in the Vercel dashboard:
   - `REACT_APP_DATOCMS_ROR_TOKEN`
   - `REACT_APP_RESUME_URL`
   - `GROQ_API_KEY`
4. Deploy — Vercel auto-detects the framework and handles the rest

---

## 📧 Contact

- 💼 [LinkedIn](https://www.linkedin.com/in/sagarbhavsar1/)
- 🐙 [GitHub](https://github.com/sagarbhavsar1)
- ✍️ [Medium](https://medium.com/@sagarbhavsar2001)
- 📧 Email: sagarbhavsar2001@gmail.com

---

## 📜 License

MIT License
