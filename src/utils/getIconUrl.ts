import clearIcon from './../assets/clear.png';
import cloudIcon from '../assets/cloud.png';
import mistIcon from '../assets/mist.png';
import rainIcon from '../assets/rain.png';
import snowIcon from '../assets/snow.png';
import thunderIcon from '../assets/thunderstorm.png';

export const getIconUrl = (icon: string): string => {
    switch (icon) {
        case '01d':
        case '01n':
            return clearIcon;
        case '02d':
        case '02n':
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            return cloudIcon;
        case '09d':
        case '09n':
        case '10d':
        case '10n':
            return rainIcon;
        case '11d':
        case '11n':
            return thunderIcon;
        case '13d':
        case '13n':
            return snowIcon;
        case '50d':
        case '50n':
            return mistIcon;
        default:
            return '';
    }
};
