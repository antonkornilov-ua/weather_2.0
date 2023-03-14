import { useState } from 'react';
import WeatherCard from './WeatherCard';
import { HiSearch } from 'react-icons/hi';
import axios from 'axios';
import { WeatherData } from '../types/WeatherData';

import errorImg from '../assets/404.png';


export const WeatherApp = () => {
    const [city, setCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getWeatherData = async () => {
        setIsLoading(true);
        setError(null);
        const API_KEY = 'ab54429ab157825232cab97e89867df3';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ua`;

        try {
            const response = await axios.get(url);
            const { data } = response;

            setWeatherData({
                city: data.name,
                temperature: data.main.temp,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                feelsLike: data.main.feels_like,
                tempMax: data.main.temp_max,
                tempMin: data.main.temp_min,
                windSpeed: data.wind.speed,
                windDeg: data.wind.deg,
            });
        } catch (error) {
            console.error(error);
            setError('Ми оглянули всю мапу, проте такого міста не знайшли');
            setWeatherData(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-slate-300'>
            <h1 className='uppercase tracking-wide text-2xl font-semibold mb-5 text-gray-600'>Прогноз погоди</h1>
            <div className='flex items-center '>
                <input
                    type='text'
                    className='border rounded-l py-2 px-6 border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                    placeholder='Введіть назву міста'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && getWeatherData()}
                />
                <button
                    className=' border rounded-r py-2 px-4 bg-blue-600 text-white hover:bg-blue-700'
                    onClick={getWeatherData}
                    style={{ height: '2.7rem' }}>
                    <HiSearch />
                </button>
            </div>

            {isLoading && <div className='text-gray-600 font-bold text-xl'>Зачекайте, дані завантажуються...</div>}

            {!isLoading && error && (
                <div className='flex flex-col items-center justify-center mt-5'>
                    <img src={errorImg} alt='404' className='h-32 w-38' />
                    <div className='text-gray-600 font-bold text-xl'>{error}</div>
                </div>
            )}

            {!isLoading && weatherData && <WeatherCard weatherData={weatherData} />}
        </div>
    );
};
