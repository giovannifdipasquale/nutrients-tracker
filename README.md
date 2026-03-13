# NutriTrack: AI-Powered Nutrition and Meal Planner

Welcome to NutriTrack (Food-App), a modern React application designed to help users track their daily nutritional intake and get smart, AI-generated meal suggestions to hit their daily macro and micro goals. 

This project was built to solve a real-world problem: What should I eat to hit my remaining daily goals? It combines a third-party nutrition database (USDA API) with an LLM (Google AI Studio) to provide a seamless and intelligent user experience.

---

## Features

- **User Authentication:** Secure signup and login flow managed via Supabase.
- **Food Search and Tracking:** Search for raw ingredients and foods using the USDA FoodData Central API.
- **Real-Time Dashboard:** View your accumulated macronutrients (Proteins, Fats, Carbs) and micronutrients vs. daily Recommended Dietary Allowances (RDA).
- **AI Meal Suggestions:** If you are missing specific macros to hit your daily goal, the app uses Google Gemini AI to instantly suggest 3 custom meals tailored to your missing nutrients.
- **Cloud Sync:** All tracked foods are saved to a Supabase PostgreSQL database, meaning your data is always safe and synced.

---

## Tech Stack

As a junior developer, I chose this stack to solidify my understanding of modern frontend ecosystems, state management, and API integrations:

- **Frontend:** React 19, Vite, React Router v7
- **Styling:** Tailwind CSS v4, Bootstrap Icons (for crisp, scalable iconography)
- **Backend as a Service (BaaS):** Supabase (PostgreSQL, Authentication)
- **APIs:** 
  - USDA FDC API (Food data)
  - Google Gemini AI API (@google/genai) for intelligent meal recommendations

---

## Project Structure

A quick look at how the code is organized:

```
src/
├── components/   # Reusable UI components (Navbar, ConsultAI, StatCard, Search)
├── context/      # Global state management (FoodContext, AuthProvider)
├── pages/        # Top-level route components (Dashboard, Login, SignUp)
├── services/     # API/BaaS integrations (aiGoogleGenAI.js, supabaseClient.js)
├── utils/        # Helper functions (e.g., foodMapper.jsx to normalize USDA API data)
└── App.jsx       # Main application routing
```

---

## Local Setup and Installation

Want to run this locally? Follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd food-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_USDA_API_KEY=your_usda_api_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to view it in the browser.

---

## What I Learned

Building this project was a huge learning experience:
- **API Orchestration:** Handling data normalization from the USDA API and feeding specific, formatted prompts into the Gemini AI model.
- **Context API:** Managing complex global states (user sessions, current food lists) cleanly without prop drilling.
- **Supabase Integration:** Learning how to effectively structure a standard relational database and implement Row Level Security (RLS) for user data.

---

*This project is part of my developer portfolio. Feel free to explore the code or reach out!*
