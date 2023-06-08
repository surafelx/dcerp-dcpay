import pool from './config/pool'
import { initializeDatabase, querySampleData, queryTables, templateQuery } from './queries';

const setupDatabase = async () => {
  try {
    console.log('Database setup started.');
    await initializeDatabase();
    await queryTables();
    await querySampleData();
    await templateQuery();
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database', error);
  } finally {
    pool.end();
  }
}

setupDatabase();