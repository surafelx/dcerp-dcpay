import pool from './config/pool'
import fs from 'fs'
import path from 'path'



export const initializeDatabase = async () => {
    const initialSQLPath = path.join(__dirname, '../data/initial.sql');
    const initialSQLQueries = fs.readFileSync(initialSQLPath, 'utf8').split(';');
    try {
        for (const query of initialSQLQueries) {
            await pool.query(query);
          }
          console.log("Initialize Database")
    } catch(e) {
        console.error(e)
    }
}


export const querySampleData = async () => {
    const sampleSQLPath = path.join(__dirname, '../data/sample.sql');
    const sampleSQLQueries = fs.readFileSync(sampleSQLPath, 'utf8').split(';');
    try {
        for (const query of sampleSQLQueries) {
            await pool.query(query);
          }
          console.log("Samples Queries Ran")

    } catch(e) {
        console.error(e)
    }
}


export const queryTables = async () => {
    const tablesSQLPath = path.join(__dirname, '../data/tables.sql');
    const tablesSQLQueries = fs.readFileSync(tablesSQLPath, 'utf8').split(';');
    try {
        for (const query of tablesSQLQueries) {
            await pool.query(query);
          }
          console.log("Table Queries Ran")

    } catch(e) {
        console.error(e)
    }
}

export const templateQuery = async () => {
    const tablesSQLPath = path.join(__dirname, '../data/autofill.sql');
    const tablesSQLQueries = fs.readFileSync(tablesSQLPath, 'utf8').split(';');
    try {
        for (const query of tablesSQLQueries) {
            await pool.query(query);
          }
          console.log("Template Autofill Queries Ran")

    } catch(e) {
        console.error(e)
    }
}