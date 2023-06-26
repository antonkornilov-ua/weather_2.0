import { WeatherData } from '../types/WeatherData';
import { getIconUrl } from '../utils/getIconUrl';
import { getWindDirection } from '../utils/getWindDirection';
import { HPA_TO_MM } from './../utils/pressureConverter';
import { getTimeZone } from './../utils/timezone'


import CityImage from './CityImage';
import LocalTime from './LocalTime';

type WeatherCardProps = {
    weatherData: WeatherData;
    onImageLoaded: (hasImage: boolean) => void;
};


const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, onImageLoaded }: WeatherCardProps) => {
    const windDirection = getWindDirection(weatherData.windDeg);

    const iconUrl = getIconUrl(weatherData.icon);

    const searchTimeZone = getTimeZone(weatherData.timezone);

    console.log(searchTimeZone);

    return (
        <div className='max-w-xs rounded overflow-hidden shadow-xl bg-zinc-200 leading-8 mt-2'>
            <div className='p-4'>
                <div
                    className={`flex justify-between gap-2 items-center mb-2 ${
                        weatherData.city.length > 10 ? 'flex-col' : ''
                    }`}>
                    <p className='font-bold text-xl'>
                        {weatherData.city}, <span className=''>{weatherData.country}</span>
                    </p>
                    <p className='text-gray-600 text-sm'>{new Date().toLocaleDateString()}</p>
                </div>
                <div className='flex justify-between gap-2 items-center mb-2'>
                    <p className='text-gray-600 text-sm'>{searchTimeZone?.name}</p>
                    <p>
                        <LocalTime timezone={searchTimeZone} />
                    </p>
                </div>
                <CityImage onImageLoaded={onImageLoaded} city={weatherData.city} />

                <div className='flex justify-center items-center my-4'>
                    <img className='h-20 w-20' src={iconUrl} alt={weatherData.description} />
                    <div className='text-gray-600 font-bold text-5xl mx-4'>
                        {Math.round(weatherData.temperature)}&deg;C
                    </div>
                </div>
                <div className='text-gray-600 capitalize text-center mb-2'>{weatherData.description}</div>
                <p className='text-sm font-semibold text-gray-600'>
                    Відчувається як: <span className='font-bold'>{Math.round(weatherData.feelsLike)}&deg;C</span>
                </p>
                <p className='text-sm text-gray-600'>Макс. температура: {Math.round(weatherData.tempMax)}&deg;C</p>
                <p className='text-sm text-gray-600'>Мін. температура: {Math.round(weatherData.tempMin)}&deg;C</p>
                <p className='text-sm text-gray-600'>Вологість: {weatherData.humidity}%</p>
                <p className='text-sm text-gray-600'>Тиск: {Math.round(weatherData.pressure * HPA_TO_MM)} мм </p>
                <p className='text-sm text-gray-600'>
                    Вітер: {weatherData.windSpeed} м/с, напрям: {windDirection}
                </p>
            </div>
        </div>
    );
};

export default WeatherCard;
