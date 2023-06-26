import React, { useEffect, useState } from 'react';

import { IMAGE_URL } from '../helpers/image_url';
import { Photo } from '../types/Photo';
import axios from 'axios';

type CityImageProps = {
    city: string;
    onImageLoaded: (hasImage: boolean) => void
};

const CityImage = ({ city, onImageLoaded }: CityImageProps) => {
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [city]);

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                let cityName = city.toLowerCase();
                if (cityName === 'kyiv') {
                    cityName = 'kiev';
                } else if (cityName === 'san francisco') {
                    cityName = 'san francisco bay area';
                }
                const urbanAreasResponse = await axios.get(IMAGE_URL);
                const urbanAreas = urbanAreasResponse.data['_links']['ua:item'];
                const matchedUrbanArea = urbanAreas.find((ua: any) => ua.name.toLowerCase() === cityName);

                if (matchedUrbanArea) {
                    const urbanAreaResponse = await axios.get(matchedUrbanArea.href);
                    const imagesUrl = urbanAreaResponse.data['_links']['ua:images']['href'];
                    const imagesResponse = await axios.get(imagesUrl);
                    const photos = imagesResponse.data.photos;

                    if (photos && photos.length > 0) {
                        setPhoto(photos[0]);
                        onImageLoaded(true);
                    }
                } else {
                    console.log(`Urban area not found for ${city}`);
                    onImageLoaded(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCityData();
    }, [city, onImageLoaded]);

    return (
        <div>
            {photo ? (
                <div>
                    {isLoading ? (
                        <div className='animate-pulse bg-gray-300 h-20 w-full'></div>
                    ) : (
                        <div>
                            <img
                                src={photo.image.web}
                                alt={`Image of ${city}`}
                                className='w-full h-20 rounded-md shadow-md'
                            />
                            <div className='flex justify-evenly mt-1'>
                                <p className='text-xs'>Фотограф: {photo.attribution.photographer}</p>
                                <a className='text-xs hover:text-sky-700' href={photo.attribution.source}>
                                    Джерело
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default CityImage;
