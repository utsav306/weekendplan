// app/api/weather/route.js

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  // console.log("Weather API called with:", { city, lat, lon });

  if (!city && (!lat || !lon)) {
    return Response.json(
      { error: "Either city parameter or lat/lon coordinates are required" },
      { status: 400 },
    );
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    

    let url;

    if (lat && lon) {
      // Use coordinates for more accurate location
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
      // Fallback to city name
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    }

    // console.log("Fetching from URL:", url.replace(apiKey, "HIDDEN_API_KEY"));

    const response = await fetch(url);

    // console.log("OpenWeather API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenWeather API error:", errorText);
      return Response.json(
        { error: "Failed to fetch weather data", details: errorText },
        { status: response.status },
      );
    }

    const data = await response.json();
    // console.log("Weather data received:", data);

    return Response.json(data);
  } catch (error) {
    console.error("Weather API error:", error);
    return Response.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
