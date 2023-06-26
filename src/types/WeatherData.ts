export interface WeatherData {
    city: string;
    temperature: number;
    description: string;
    icon: string;
    feelsLike: number;
    tempMax: number;
    tempMin: number;
    windSpeed: number;
    windDeg: number;
    country: string;
    humidity: number;
    pressure: number;
    timezone: number
}