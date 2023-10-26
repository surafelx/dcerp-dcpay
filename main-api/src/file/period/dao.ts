import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'
let ethiopic = require('ethiopic-js')

// interface Period {
//     organizationId: number;
    
// }
export const create = async (newPeriod: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        periodCount,
        periodName,
        periodYear,
        monthName,
        startDate,
        endDate,
        periodPaid,
        periodCurrent,
        periodBack,
        periodProof,
        periodFinal,
        periodReport
    } = newPeriod
    const query = `
	INSERT INTO 
        periods 
        (
            id,
            organization_id,
            period_count,
            period_name, 
            period_year,
            month_name, 
            start_date,
            end_date,
            period_paid,
            period_current,
            period_back,
            period_proof,
            period_final,
            period_report
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        periodCount,
        periodName,
        periodYear,
        monthName,
        startDate,
        endDate,
        periodPaid,
        periodCurrent,
        periodBack,
        periodProof,
        periodFinal,
        periodReport
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: Periods } = await pool.query(`
    SELECT 
    id,
    organization_id,
    period_count,
    period_name, 
    period_year,
    month_name, 
    start_date,
    end_date,
    period_paid,
    period_current,
    period_back,
    period_proof,
    period_final,
    period_report,
    period_process
    FROM periods
    WHERE organization_id=$1 ORDER BY CAST(period_count AS NUMERIC) ASC`,
        [organizationId])
    return Periods
}



export const deletePeriod = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM periods WHERE id=$1', [branchId])
}


export const updatePeriod = async (updatedPeriod: any): Promise<string> => {
    const {
        id,
        periodCount,
        periodName,
        periodYear,
        monthName,
        startDate,
        endDate,
        periodPaid,
        periodCurrent,
        periodBack,
        periodProof,
        periodFinal,
        periodReport
    } = updatedPeriod
    const query = `
    UPDATE 
    periods
    SET 
    period_count = $1,
    period_name = $2,
    period_year = $3,
    month_name = $4,
    start_date = $5,
    end_date = $6,
    period_paid = $7,
    period_current = $8,
    period_back = $9,
    period_proof = $10,
    period_final = $11,
    period_report = $12
    WHERE id = $13
    RETURNING *;
    `
    const res = await pool.query(query, [
        periodCount,
        periodName,
        periodYear,
        monthName,
        startDate,
        endDate,
        periodPaid,
        periodCurrent,
        periodBack,
        periodProof,
        periodFinal,
        periodReport,
        id])
    const branchId = res.rows[0]
    return branchId
}

export const updatePeriodProcess = async (periodId: any, processValue: any): Promise<string> => {
    const query = `
    UPDATE 
    periods
    SET 
    period_process = $1
    WHERE id = $2
    RETURNING *;
    `
    const res = await pool.query(query, [
        processValue, periodId])
    const branchId = res.rows[0]
    return branchId
}

export const getInfo = async (periodId: string): Promise<any> => {
    const { rows: periods } = await pool.query(`
    SELECT 
    id,
    organization_id,
    period_count,
    period_name, 
    period_year,
    month_name, 
    start_date,
    end_date,
    period_paid,
    period_current,
    period_back,
    period_proof,
    period_final,
    period_report,
    period_process
    FROM periods
    WHERE id=$1 `,
        [periodId])
    return periods
}


export const getCurrentPeriod = async (organizationId: string): Promise<any> => {
    const { rows: Periods } = await pool.query(`
    SELECT 
    id,
    organization_id,
    period_count,
    period_name, 
    period_year,
    month_name, 
    start_date,
    end_date,
    period_paid,
    period_current,
    period_back,
    period_proof,
    period_final,
    period_report,
    period_process
    FROM periods
    WHERE organization_id=$1 AND
    period_current = true`,
        [organizationId])
    return Periods
}

export const getNextPeriod = async (organizationId: string): Promise<any> => {
    const { rows: periods } = await pool.query(`
    SELECT 
    id,
    organization_id,
    period_count,
    period_name, 
    period_year,
    month_name, 
    start_date,
    end_date,
    period_paid,
    period_current,
    period_back,
    period_proof,
    period_final,
    period_report,
    period_process
    FROM periods
    WHERE organization_id=$1 AND
    period_current = true`,
        [organizationId])
    
    const current = periods[0]
        const nextPeriod = {
            periodCount: Number(current.period_count) + 1,
        };
        const { rows: nextPeriods } = await pool.query(`
        SELECT 
        id,
        organization_id,
        period_count,
        period_name, 
        period_year,
        month_name, 
        start_date,
        end_date,
        period_paid,
        period_current,
        period_back,
        period_proof,
        period_final,
        period_report,
        period_process
        FROM periods
        WHERE organization_id=$1 AND
        period_count = $2`,
            [organizationId, nextPeriod.periodCount])
    return nextPeriods
}


const generateGregorianPeriod = async (currentPeriod: number, organizationId: string) => {

    const currentYear = new Date().getFullYear();

    for (let i = 1; i <= 12; i++) {
        const monthName = new Date(currentYear, i - 1, 1).toLocaleString('default', { month: 'long' });
        const startDate = new Date(currentYear, i - 1, 1);
        const endDate = new Date(currentYear, i, 0);
        const periodCurrent = i === currentPeriod;

        const query = `INSERT INTO periods (id, organization_id, period_count, period_name, period_year, month_name, start_date, end_date, period_paid, period_current, period_back, period_proof, period_final, period_report, period_process) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;
        const values = [
            // Generate a unique ID for each period (e.g., using a UUID library)
            uuid(),
            organizationId,
            i.toString(),
            `Period ${i}`,
            currentYear.toString(),
            monthName,
            startDate,
            endDate,
            false, // Set other boolean columns to false by default
            periodCurrent,
            false,
            false,
            false,
            false,
            false,
        ];

        await pool.query(query, values);
    }
}


const generateEthiopianPeriod = async (ethiopianStartingPeriod: any, currentPeriod: any, organizationId: string) => {
    const ethiopianMonths = [
        { periodNumber: 3, ethiopianName: 'መስከረም', gregorianName: 'September' },
        { periodNumber: 4, ethiopianName: 'ጥቅምት', gregorianName: 'October' },
        { periodNumber: 5, ethiopianName: 'ኅዳር', gregorianName: 'November' },
        { periodNumber: 6, ethiopianName: 'ታኅሣሥ', gregorianName: 'December' },
        { periodNumber: 7, ethiopianName: 'ጥር', gregorianName: 'January' },
        { periodNumber: 8, ethiopianName: 'የካቲት', gregorianName: 'February' },
        { periodNumber: 9, ethiopianName: 'መጋቢት', gregorianName: 'March' },
        { periodNumber: 10, ethiopianName: 'ሚያዝያ', gregorianName: 'April' },
        { periodNumber: 11, ethiopianName: 'ግንቦት', gregorianName: 'May' },
        { periodNumber: 12, ethiopianName: 'ሰኔ', gregorianName: 'June' },
        { periodNumber: 1, ethiopianName: 'ሐምሌ', gregorianName: 'July' },
        { periodNumber: 2, ethiopianName: 'ነሐሴ', gregorianName: 'August' },

    ]

    const gregorianDate = ethiopic.toGregorian(ethiopianStartingPeriod, 11, 1)
    const startingPeriod: Date = new Date(gregorianDate);
    let currentYear = startingPeriod.getFullYear();

    const periodsGenerated = []
    // Generate and execute insert queries for 12 months
    try {
        for (let i = 1; i <= 12; i++) {
            const monthName = new Date(currentYear, i - 1, 1).toLocaleString('default', { month: 'long' });

            if (monthName === 'January' || monthName === 'February' || monthName === 'March' || monthName === 'April' || monthName === 'May' || monthName ===
                'June') {
                currentYear = startingPeriod.getFullYear();
                currentYear++

            }
            if (monthName === 'July' || monthName === 'August' || monthName === 'September' || monthName === 'October' || monthName === 'November' || monthName ===
                'December')
                currentYear = startingPeriod.getFullYear();

            // Calculate start and end dates for the period
            const startDate = new Date(currentYear, i - 1, startingPeriod.getDate());
            const gregorianMonth = startDate.toLocaleString('default', { month: 'long' });

            // Find the corresponding Ethiopian month name from the array
            const ethiopianMonthObj = ethiopianMonths.find(month => month.gregorianName === gregorianMonth);
            if (ethiopianMonthObj) {
                const ethiopianMonthName = ethiopianMonthObj ? ethiopianMonthObj.ethiopianName : '';
                const periodNumber = ethiopianMonthObj ? ethiopianMonthObj.periodNumber : '';
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 29);

                periodsGenerated.push({ periodNumber, ethiopianMonthName, monthName, currentYear: currentYear.toString(), startDate, endDate })
            } else {
                // Handle the case when ethiopianMonthObj is undefined
                // console.log(`Ethiopian month not found for gregorian month: ${gregorianMonth}`);
            }

        }

        periodsGenerated.sort((a: any, b: any) => a.periodNumber - b.periodNumber);

        for (const period of periodsGenerated) {
            const {
                periodNumber,
                ethiopianMonthName,
                monthName,
                currentYear,
                startDate,
                endDate
            } = period;

            const periodCurrent = periodNumber === currentPeriod

            if(periodNumber < currentPeriod) {
                const query = `
                INSERT INTO periods (
                  id, organization_id, period_count, period_name, period_year, 
                  month_name, start_date, end_date, period_paid, period_current, 
                  period_back, period_proof, period_final, period_report, period_process
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;
  
              const values = [
                  uuid(),
                  organizationId,
                  periodNumber.toString(),
                  ethiopianMonthName,
                  currentYear.toString(),
                  monthName,
                  startDate,
                  endDate,
                  true,
                  periodCurrent,
                  true,
                  true,
                  true,
                  true,
                  true,
              ];
  
              await pool.query(query, values);
            }

            if(periodNumber >= currentPeriod) {
                const query = `
                INSERT INTO periods (
                  id, organization_id, period_count, period_name, period_year, 
                  month_name, start_date, end_date, period_paid, period_current, 
                  period_back, period_proof, period_final, period_report, period_process
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;
  
              const values = [
                  uuid(),
                  organizationId,
                  periodNumber.toString(),
                  ethiopianMonthName,
                  currentYear.toString(),
                  monthName,
                  startDate,
                  endDate,
                  false,
                  periodCurrent,
                  false,
                  false,
                  false,
                  false,
                  false,
              ];
  
              await pool.query(query, values);
            }
           
        }

    } catch (e) {
        console.error(e)
    }

}


export default {
    create,
    deletePeriod,
    generateGregorianPeriod,
    generateEthiopianPeriod,
    // setupPeriod,
    getInfo,
    getAllFromOrganization,
    getCurrentPeriod,
    getNextPeriod,
    updatePeriod,
    updatePeriodProcess
}