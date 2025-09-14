// app/api/gemini/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request) {
  try {
    // Check if the API key is available
    if (!API_KEY) {
      console.error("GEMINI_API_KEY environment variable is not set.");
      return Response.json(
        { error: "AI service temporarily unavailable" },
        { status: 503 },
      );
    }

    const body = await request.json();
    const { mood, weather, location, timeOfDay } = body;

    

    // Validate required parameters
    if (!mood) {
      return Response.json(
        { error: "Mood parameter is required" },
        { status: 400 },
      );
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build comprehensive prompt
    const prompt = buildActivityPrompt(mood, weather, location, timeOfDay);

    

    // Generate AI suggestions
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    

    // Parse the AI response into structured activity suggestions
    const suggestions = parseAIResponse(text);

    return Response.json({
      suggestions,
      source: "ai",
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return Response.json(
      { error: "Failed to generate AI suggestions", details: error.message },
      { status: 500 },
    );
  }
}

function buildActivityPrompt(mood, weather, location, timeOfDay) {
  const weatherInfo = weather
    ? `Weather: ${weather.condition}, Temperature: ${weather.temperature}°C`
    : "Weather: Unknown";
  const locationInfo = location || "Location: Unknown";
  const timeInfo = timeOfDay || new Date().getHours();

  return `You are a weekend activity planner AI. Generate exactly 4 personalized activity suggestions based on the following context:

User Mood: ${mood}
${weatherInfo}
Location: ${locationInfo}
Time of Day: ${timeInfo}:00

Requirements:
1. Each suggestion must be realistic and achievable
2. Consider the weather conditions and time
3. Match the user's mood preference (${mood})
4. Include a mix of indoor/outdoor activities as appropriate
5. Provide specific time suggestions

Please respond in this exact JSON format:
[
  {
    "title": "Activity name",
    "category": "fun|fitness|food|social|relax",
    "mood": "energetic|happy|calm",
    "time": "HH:MM",
    "weatherDependent": true/false
  }
]

Make each suggestion unique and tailored to the context provided. Focus on weekend-appropriate activities.`;
}

function parseAIResponse(aiText) {
  try {
    // Try to extract JSON from the AI response
    const jsonMatch = aiText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const suggestions = JSON.parse(jsonMatch[0]);

      // Validate and format suggestions
      return suggestions.map((suggestion, index) => ({
        id: `ai-suggestion-${Date.now()}-${index}`,
        title: suggestion.title || `Activity ${index + 1}`,
        category: suggestion.category || "fun",
        mood: suggestion.mood || "happy",
        time: suggestion.time || "10:00",
        weatherDependent: suggestion.weatherDependent !== false, // default to true
      }));
    }
  } catch (error) {
    console.error("Error parsing AI response:", error);
  }

  // Fallback parsing if JSON extraction fails
  const lines = aiText.split("\n").filter((line) => line.trim());
  const suggestions = [];

  for (let i = 0; i < Math.min(4, lines.length); i++) {
    const line = lines[i];
    suggestions.push({
      id: `ai-suggestion-fallback-${Date.now()}-${i}`,
      title: line.replace(/^\d+\.\s*/, "").trim() || `AI Suggestion ${i + 1}`,
      category: "fun",
      mood: "happy",
      time: `${10 + i * 2}:00`,
      weatherDependent: true,
    });
  }

  return suggestions.length > 0
    ? suggestions
    : [
        {
          id: `ai-suggestion-default-${Date.now()}`,
          title: "Explore something new today!",
          category: "fun",
          mood: "happy",
          time: "10:00",
          weatherDependent: false,
        },
      ];
}
