import { Request, Response, NextFunction, Router } from "express";
import { execSync } from "child_process";
import fs from 'fs';


const router = Router();

// Set the path to your database backup folder
const backupFolderPath = '';

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let host = process.env.PGHOST;
    let user = process.env.PGUSER;
    let dbname = process.env.PGDATABASE;
    let port = process.env.PGPORT;

    fs.readdir(backupFolderPath, (err, files) => {
      if (err) {
          console.error('Error reading folder:', err);
          res.status(500).send('Error reading folder');
          return;
      }

      // Filter the files to include only database backup files
      const backupFiles = files.filter(file => {
          return file.endsWith('.sql') || file.endsWith('.sql') || file.endsWith('.sql');
          // Add more file extensions as needed
      });

      console.log(backupFiles)

      // Render the list of backup files using EJS template
      res.render('backupList', { backupFiles });
  });

    const currentDate = new Date();

    let day = ("0" + currentDate.getDate()).slice(-2);
    let month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Month starts at zero
    let year = currentDate.getFullYear();
    let hours = ("0" + currentDate.getHours()).slice(-2);
    let minutes = ("0" + currentDate.getMinutes()).slice(-2);

    const formattedDate = `${month}-${day}-${year}-${hours}-${minutes}`;

    let filename = "DDFC" + formattedDate;

    const args = [
      `pg_dump > ${filename}.sql -h ${host} -U ${user} -d ${dbname} -p ${port} `,
    ];

    // Run the pg_dump command and capture its result
     execSync(args.join(" "));
    // const { q = "" } = req.query ?? "";
    const renamedTaxRates: any[] = [];
    const filteredData: any[] = [];
    res.send({
      allData: renamedTaxRates,
      taxRate: filteredData,
      query: req.query,
      total: filteredData.length,
    });
  } catch (e) {
    next(e);
  }
});

export default router;
