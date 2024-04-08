import { Request, Response, NextFunction, Router } from "express";
import { execSync } from "child_process";
import fs from "fs";

const router = Router();


const backupFolderPath = "./";

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    fs.readdir(backupFolderPath, (err, files) => {
      if (err) {
        console.error("Error reading folder:", err);
        res.status(500).send("Error reading folder");
        return;
      }

      // Filter the files to include only database backup files
      const backupFiles = files.filter((file) => {
        return (
          file.endsWith(".sql") ||
          file.endsWith(".sql") ||
          file.endsWith(".sql")
        );
        // Add more file extensions as needed
      });

      // Render the list of backup files using EJS template
      res.send({
        allData: backupFiles,
        restore: backupFiles,
        query: req.query,
        total: backupFiles.length,
      });

    });

   
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let host = process.env.PGHOST;
    let user = process.env.PGUSER;
    let dbname = process.env.PGDATABASE;
    let port = process.env.PGPORT;

    const databaseFileName = req.body.data.id;
    const args = [
      `psql < ${databaseFileName}.sql -h ${host} -U ${user} -d ${dbname} -p ${port} `,
    ];

    execSync(args.join(" "));
    res.send({});
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
    next(err);
  }
});

export default router;
