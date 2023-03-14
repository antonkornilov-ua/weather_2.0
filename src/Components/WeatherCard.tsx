import { WeatherData } from '../types/WeatherData';
import { getIconUrl } from '../utils/getIconUrl';
import { getWindDirection } from '../utils/getWindDirection';

const WeatherCard = ({ weatherData }: { weatherData: WeatherData }) => {
    const windDirection = getWindDirection(weatherData.windDeg);

    const iconUrl = getIconUrl(weatherData.icon);

    return (
        <div className='max-w-xs rounded overflow-hidden shadow-lg bg-zinc-200 leading-8 mt-2'>
            <div className='p-4'>
                <div className={`flex justify-between items-center ${weatherData.city.length > 10 ? 'flex-col' : ''}`}>
                    <div className='font-bold text-xl'>{weatherData.city}</div>
                    <div className='text-gray-600'>{new Date().toLocaleDateString()}</div>
                </div>
                <div className='flex justify-center items-center my-4'>
                    <img className='h-20 w-20' src={iconUrl} alt={weatherData.description} />
                    <div className='text-gray-600 font-bold text-5xl mx-4'>
                        {Math.round(weatherData.temperature)}&deg;C
                    </div>
                </div>
                <div className='text-gray-600 capitalize'>{weatherData.description}</div>
                <div className='text-sm text-gray-600'>Відчувається як: {Math.round(weatherData.feelsLike)}&deg;C</div>
                <div className='text-sm text-gray-600'>
                    Макс. температура: {Math.round(weatherData.tempMax)}&deg;C
                </div>
                <div className='text-sm text-gray-600'>
                    Мін. температура: {Math.round(weatherData.tempMin)}&deg;C
                </div>
                <div className='text-sm text-gray-600'>
                    Вітер: {weatherData.windSpeed} м/с, напрям: {windDirection}
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
