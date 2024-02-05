import "reflect-metadata"
import {AppDataSource} from './config/db.config'
import {logGenerator} from './logs/logsGenerator'
import { DataService } from "./services/data.services"
import { InvgateService } from "./invgate/invgate.service"
import { CountryService } from "./services/country.services"
import { TipoService } from "./services/type.services"
import { ViaSolicitudService } from "./services/via.services"
import { AxiosAdapter } from "./common/http.adapter"
import { Country } from "./entity/Country.entity"
import { Data } from "./entity/Data.entity"
import { Type } from "./entity/Type.entity"
import { Via } from "./entity/Via.entity"



(async ()=>{
    try {
        await AppDataSource.initialize()
        logGenerator('Base de datos inicializada')
        new DataService(
            new InvgateService(
                new AxiosAdapter()
            ),
            new CountryService(
                new InvgateService(
                    new AxiosAdapter()
                ),
                AppDataSource.getRepository(Country)
            ),
            new TipoService(
                new InvgateService(
                    new AxiosAdapter()
                ),
                AppDataSource.getRepository(Type)
            ),
            new ViaSolicitudService(
                AppDataSource.getRepository(Via)
            ),
            AppDataSource.getRepository(Data),
        )
    } catch (error) {
        logGenerator('Error al inicializar la base de datos')
        logGenerator(error)
    }
})()
