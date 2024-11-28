import pgPromise from "pg-promise";

const pgp = pgPromise();
const connection = pgp('postgresql://admin:admin123@localhost:5432/shooper');

export default connection;