const { DataSource } = require("typeorm");
const { User } = require("../models");

const dataSource = new DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize:true
})

const connectionDB = async()=> {
    await dataSource.initialize()
        .then(() => {
            console.log("Connection with PostgreSQL database established...");
            return dataSource;
        })
        .catch((err) => {
            console.error("Error connecting to the database:", err);
        });
}

module.exports = {dataSource, connectionDB};