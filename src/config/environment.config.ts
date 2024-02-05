import 'dotenv/config'

interface Environment {
    DB_HOST: string
    DB_PORT: number
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
    PORT: number
}

export const environment:Environment = {
    DB_HOST: String(process.env.POSTGRES_HOST),
    DB_PORT: Number(process.env.POSTGRES_PORT),
    DB_USER: String(process.env.POSTGRES_USER),
    DB_PASSWORD: String(process.env.POSTGRES_PASSWORD),
    DB_NAME: String(process.env.POSTGRES_DB),
    PORT: Number(process.env.PORT) || 3000,
}