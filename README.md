# Weekend Planner App

A Next.js application that helps you plan perfect weekends with AI-powered activity suggestions based on weather and your mood.

## Features

✨ **AI-Powered Suggestions**: Get personalized activity recommendations from Google's Gemini AI
🌤️ **Weather Integration**: Activity suggestions adapt to current weather conditions
🎯 **Mood-Based Planning**: Choose from lazy, adventurous, social, or chill moods
📍 **Location Aware**: Uses your location for more accurate suggestions
⚡ **Smart Fallbacks**: Automatically falls back to curated suggestions if AI is unavailable
🎨 **Beautiful UI**: Modern, responsive design with smooth animations

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd project
npm install
```

### 2. Environment Variables

Copy the example environment file and add your API keys:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

### 3. Get API Keys

#### Gemini AI API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key to your `.env.local` file

#### OpenWeather API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Copy the default API key to your `.env.local` file

### 4. Run the Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app running!

## How It Works

1. **Weather Detection**: The app detects your location and fetches current weather data
2. **Mood Selection**: Choose what type of weekend experience you want
3. **AI Generation**: Gemini AI creates personalized suggestions based on your mood, weather, location, and time
4. **Smart Fallbacks**: If AI is unavailable, the app shows curated suggestions instead
5. **Activity Planning**: Add suggested activities to your weekend schedule

## Features Overview

### AI vs Curated Mode

- **AI Mode**: Real-time suggestions from Gemini AI based on multiple factors
- **Curated Mode**: Hand-picked suggestions organized by mood and weather
- Toggle between modes anytime with the switch in the suggestions modal

### Error Handling

- Graceful fallbacks when APIs are unavailable
- Clear error messages and alternative options
- Offline-capable with cached suggestions

### Privacy

- Location data is only used for weather and suggestions
- No personal data is stored or transmitted
- All API calls are made securely from your browser

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **AI**: Google Gemini AI
- **Weather**: OpenWeatherMap API
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks

## Troubleshooting

### AI Suggestions Not Working

1. Check that `GEMINI_API_KEY` is set in `.env.local`
2. Verify your API key is valid and has quota remaining
3. Check the browser console for error messages
4. The app will automatically fall back to curated suggestions

### Weather Not Loading

1. Allow location access when prompted
2. Check that `OPENWEATHER_API_KEY` is set in `.env.local`
3. Verify your OpenWeather API key is active

### General Issues

1. Restart the development server: `npm run dev`
2. Clear browser cache and reload
3. Check the console for any JavaScript errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
