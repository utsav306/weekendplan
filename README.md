# Wkn.ai - Your AI-Powered Weekend Planner

Wkn.ai is a smart and intuitive web application designed to help you plan the perfect weekend. Leveraging the power of Google's Gemini AI, this app provides personalized activity suggestions based on your mood and the current weather conditions. Say goodbye to decision fatigue and hello to memorable weekends!

## Live Demo

**[https://wknduts.vercel.app/]**

## Features

### Core Features

* **AI-Powered Suggestions**: Get personalized activity recommendations from Google's Gemini AI, tailored to your mood, the weather, your location, and the time of day.
* **Dynamic Weekend Timeline**: Plan your Saturday and Sunday with a clear and visually appealing timeline interface.
* **Add, Edit, and Delete Activities**: Easily manage your weekend schedule with intuitive controls for adding, editing, and removing activities.
* **Drag-and-Drop Interface**: Rearrange your plans effortlessly by dragging and dropping activities within a day or between Saturday and Sunday.
* **Weather Integration**: The app fetches real-time weather data to provide relevant and timely suggestions.
* **Mood-Based Planning**: Choose from a variety of moods like "lazy," "adventurous," "social," or "chill" to get curated activity suggestions.

### Advanced Features

* **Progress Tracking**: A beautiful progress bar visualizes your weekend's completion, motivating you to make the most of your time off.
* **Confetti Celebration**: Get a burst of confetti when you've completed all your planned activities for the weekend.
* **Smart Fallbacks**: If the AI is unavailable, the app seamlessly switches to a curated list of suggestions, ensuring you're never out of ideas.
* **Local Storage Persistence**: Your weekend plans are automatically saved to your browser's local storage, so you can pick up right where you left off.
* **Visually Rich and Responsive UI**: Enjoy a modern, responsive design with smooth animations and a delightful user experience, built with Tailwind CSS and Framer Motion.

## Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) 14 (with App Router)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **AI**: [Google Gemini AI](https://ai.google.dev/)
* **Weather**: [OpenWeatherMap API](https://openweathermap.org/api)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Drag and Drop**: [`@dnd-kit`](https://dndkit.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **State Management**: React Hooks (`useState`, `useEffect`, `useReducer`)
* **Deployment**: Vercel, Netlify, or similar

## Getting Started

### Prerequisites

* Node.js (v16.14.0 or later)
* npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/utsav306/weekendplan.git]
    cd weekendplan
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add your API keys. You can use the `.env.local.example` file as a template.

    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    OPENWEATHER_API_KEY=your_openweather_api_key_here
    ```

    * **Gemini AI API Key**: Get your key from [Google AI Studio](https://makersuite.google.com/app/apikey).
    * **OpenWeather API Key**: Get your key from [OpenWeatherMap](https://openweathermap.org/api).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Key Components and Logic

* **`useWeekendPlan.ts`**: This custom hook is the heart of the application's state management. It uses a reducer to handle all actions related to the weekend plan, such as adding, updating, deleting, and reordering activities. It also persists the plan to `localStorage`.
* **`useActivitySuggestions.ts`**: This hook encapsulates the logic for fetching activity suggestions. It provides a clean interface for getting suggestions from either the Gemini AI or the fallback curated list.
* **`DragDropProvider.tsx`**: This component wraps the main planner view and provides the context and logic for the drag-and-drop functionality using `@dnd-kit`.
* **`DayTimeline.tsx` and `ActivityCard.tsx`**: These components work together to create the visual representation of the weekend plan. `DayTimeline` manages the list of activities for a given day, and `ActivityCard` renders each individual activity with its details and actions.

## API Endpoints

* **`/api/weather`**: This endpoint fetches weather data from the OpenWeatherMap API based on either a city name or latitude/longitude coordinates.
* **`/api/gemini`**: This endpoint communicates with the Google Gemini AI to generate personalized activity suggestions. It takes the user's mood, weather, location, and time of day as input and returns a structured list of suggestions.

