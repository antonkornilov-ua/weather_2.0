import React, { useEffect, useState } from 'react';

type Timezone = {
    name: string;
    info: string;
    seconds: number;
    country?: string;
};

type LocalTimeProps = {
    timezone: Timezone | undefined;
};

const LocalTime: React.FC<LocalTimeProps> = ({ timezone }) => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            const timeString = getTimeWithOffset(date, timezone);
            setCurrentTime(timeString);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [timezone]);

    const getTimeWithOffset = (date: Date, timezone: Timezone | undefined) => {
        if (timezone) {
            const offsetSeconds = timezone.seconds;
            const offsetMilliseconds = offsetSeconds * 1000;
            const utcMilliseconds = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
            const localMilliseconds = utcMilliseconds + offsetMilliseconds;
            const localDate = new Date(localMilliseconds);
            return localDate.toLocaleTimeString();
        }
        return '';
    };

    return <div className='text-gray-600 text-sm'>{currentTime}</div>;
};

export default LocalTime;
