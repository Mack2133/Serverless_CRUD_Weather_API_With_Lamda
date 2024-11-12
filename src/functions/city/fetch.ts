import { successResponse } from "@libs/response";
import { fetch } from "./city-service";

const fetchCity = async (event) => {
    const city = await fetch(event.pathParameters.cityName);
    return successResponse({ city });
}

export const main = fetchCity;