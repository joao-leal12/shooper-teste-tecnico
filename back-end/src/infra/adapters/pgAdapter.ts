import pgPromise from "pg-promise";

const pgp = pgPromise();
 
const connection = pgp({
    host: process.env.DB_HOST || 'localhost', 
    port: 5432,
    database: process.env.DB_NAME ||'shooper', 
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin123'
});

export default connection;