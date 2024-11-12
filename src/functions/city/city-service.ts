import { getDatabaseConnection } from "@libs/database-manager";
import { City } from "src/entities/city.entity";

const create = async (city: City): Promise<City> => {
    const cityRepository = (await getDatabaseConnection()).getRepository(City);
    const newCity: City = await cityRepository.save(city).catch((error) => {
        console.debug("Error while saving city: ", error);
        throw new Error("Error while saving city", error);
    });
    return newCity;
}

const fetch = async (cityName: string): Promise<City> => {
    const cityRepository = (await getDatabaseConnection()).getRepository(City);
    const newCity: City = await cityRepository.findOne({where: {city: cityName}}).catch((error) => {
        console.debug("Error while saving city: ", error);
        throw new Error("Error while saving city", error);
    });
    return newCity;
}

export { create, fetch };