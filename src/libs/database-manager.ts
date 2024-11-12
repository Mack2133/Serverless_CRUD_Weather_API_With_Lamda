import { City } from "src/entities/city.entity";
import {DataSource, EntityManager} from "typeorm"

let dataSource: DataSource;

const getDatabaseConnection = async():Promise<EntityManager>=>{
    if(dataSource && dataSource.isInitialized){
        console.log("Database connection already available. reusing existing connection")
        return dataSource.manager;
    } else {
        console.log("Database connection not already available. creating new connection")
        dataSource = new DataSource({
            applicationName: 'Weather-app-crud',
            type: "postgres",
            host: process.env.DBHOSTNAME,
            port: +process.env.DBPORT,
            database: process.env.DBDATABASE,
            username: process.env.DBUSERNAME,
            password: process.env.DBPASSWORD,
            schema: process.env.DBSCHEMA,
            connectTimeoutMS: 30000,
            synchronize: true,
            logging: false,
            useUTC: true,
            entities: [City]
        })
        return await dataSource
        .initialize()
        .then(()=>{
            console.trace("new database connection made")
            return dataSource.manager;
        })
    }
}

export {getDatabaseConnection};