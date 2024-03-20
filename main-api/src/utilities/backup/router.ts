import { Request, Response, NextFunction, Router } from "express";
import { execSync } from "child_process";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let host = process.env.PGHOST;
    let user = process.env.PGUSER;
    let dbname = process.env.PGDATABASE;
    let port = process.env.PGPORT;
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
