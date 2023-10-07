import { Pool } from 'pg';
import * as dotenv from 'dotenv'



dotenv.config()


const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : undefined,
    database: process.env.PGDATABASE
})


export default pool