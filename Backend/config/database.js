require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mssql',
        port: Number(process.env.DB_PORT),
        logging: false,
        dialectOptions: {
            options: {
                encrypt: String(process.env.DB_ENCRYPT).toLowerCase() === 'true',
                trustServerCertificate: String(process.env.DB_TRUST_CERT).toLowerCase() !== 'false'
            }
        }
    }
)

module.exports = sequelize
