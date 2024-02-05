import {DataSource} from 'typeorm'
import {environment} from './environment.config'
import {Agente} from '../entity/Agent.entity'
import {Country} from '../entity/Country.entity'
import {Data} from '../entity/Data.entity'
import {Role} from '../entity/Role.entity'
import {Segment} from '../entity/Segment.entity'
import {Type} from '../entity/Type.entity'
import {Via} from '../entity/Via.entity'


export const AppDataSource = new DataSource({
    type: "postgres",
    host: environment['DB_HOST'],
    port: environment['DB_PORT'],
    username: environment['DB_USER'],
    password: environment['DB_PASSWORD'],
    database: environment['DB_NAME'],
    synchronize: true,
    logging: false,
    entities: [Agente, Country, Data, Role, Segment, Type, Via],
    subscribers: [],
    migrations: [],
    ssl: true
})