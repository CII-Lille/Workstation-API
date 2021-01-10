import debug from 'debug'
import { config } from 'dotenv'
import { Sequelize } from 'sequelize'

config()

const log = debug('database')

const host = process.env.DB_HOST
const username = process.env.DB_USER
const password = process.env.DB_PASS
const database = process.env.DB_NAME

export const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mariadb',
    logging: log
})
