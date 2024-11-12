import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { clientErrorResponse, successResponse,  } from '@libs/response';
import fetch from 'node-fetch';
import { create, fetch as fetchCity } from './city-service';
import { City } from 'src/entities/city.entity';

const createCity: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    const { cityName } = event.body;

    if (!cityName) {
        return clientErrorResponse({ message: 'City name is required' });
    }

    let url = '';

    const cityFromDB = await fetchCity(cityName)
    if(cityFromDB) {
        return successResponse({ message: 'City already exists in DB', city: cityFromDB });
    } else {
      url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`;
    }


    if (!url) {
        return clientErrorResponse({ message: 'No weather data for ', cityName });
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();

        const city: City = {
            city: data[0].name,
            lat: data[0].lat,
            lon: data[0].lon,
            country: data[0].country,
            state: data[0].state,
        } as City;

        const cityWeather = await create(city);

        return successResponse({ cityWeather });
    } catch (error) {
        console.error('Error fetching city weather:', error);
        return clientErrorResponse({ message: 'Failed to retrieve city weather data' });
    }
};

export const main = middyfy(createCity);