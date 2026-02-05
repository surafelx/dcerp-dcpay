// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'


// import LinearProgress from '@mui/material/LinearProgress'

// ** Store  Imports
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'

// ** Actions Imports
import { fetchData } from 'src/store/apps/Reports/PayrollSheet'
import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchDepartment } from 'src/store/apps/File/EntityManagement/Department'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


const emptyValues = {
    branch: 'All',
    department: 'All'
}


const schema = yup.object().shape({
    branch: yup.string(),
    department: yup.string()
})


import { utils, writeFile } from 'sheetjs-style';

export const generateExcelFile = (store: any) => {
    const dataStartRow = 0
    const headers = [
        'No.',
        'ID',
        'Employee Name',
        'Basic Salary',
        'Leave',
        '',
        'Working Hours',
        'Hardship',
        '',
        'Overtime Hours',
        '',
        '',
        '',
        'Overtime Amount',
        '',
        'Allowance',
        '',
        '',
        'Absence',
        '',
        'Gross Pay',
        'Gross Taxable Salary',
        'Income Tax',
        'Pension 7%',
        'Pension Company',
        'Labour Union',
        'Idir',
        'Cr. Ass.',
        'Cost Sharing',
        'Red Cross',
        'Bond',
        'Credit Sale',
        'Long Term Loan',
        'Other Loan',
        'Other Deductions',
        'Medical',
        'Advance',
        'Fine',
        'Total Deductions',
        'Net Pay'
    ];

    const uppercaseHeaders = headers.map(header => header.toUpperCase());
    const merges = [];

    const tableData: any = [uppercaseHeaders, [], []]

    let currentDepartment: any = null;
   
    let departmentBasicSalary = 0
    let departmentLeaveHours = 0
    let departmentLeaveAmount = 0
    let departmentWorkingHours = 0
    let departmentHardship20 = 0
    let departmentHardship15 = 0
    let departmentOverTime150 = 0
    let departmentOverTime170 = 0
    let departmentOverTime200 = 0
    let departmentOverTime250 = 0
    let departmentOverTimeTotal170 = 0
    let departmentOverTimeTotal208 = 0
    let departmentActingAllowance = 0
    let departmentHouseAllowance = 0
    let departmentTaxiAllowance = 0
    let departmentAbsenceHour = 0
    let departmentAbsenceAmount = 0
    let departmentGrossPay = 0
    let departmentGrossTaxableSalary = 0
    let departmentIncomeTax = 0
    let departmentPension7 = 0
      let departmentPension11 = 0
    let departmentLabourUnion = 0
    let departmentIdir = 0
    let departmentCreditAssociation = 0
    let departmentCostSharing = 0
    let departmentRedCross = 0
    let departmentBond = 0
    let departmentCreditSale = 0
    let departmentLongTermLoan = 0
    let departmentOtherLoan = 0
    let departmentOtherDeductions = 0
    let departmentMedicalExpense = 0
    let departmentAdvance = 0
    let departmentFine = 0
    let departmentTotalDeductions = 0
    let departmentNetPay = 0

    let totalDepartmentBasicSalary = 0
    let totalDepartmentLeaveHours = 0
    let totalDepartmentLeaveAmount = 0
    let totalDepartmentWorkingHours = 0
    let totalDepartmentHardship20 = 0
    let totalDepartmentHardship15 = 0
    let totalDepartmentOverTime150 = 0
    let totalDepartmentOverTime170 = 0
    let totalDepartmentOverTime200 = 0
    let totalDepartmentOverTime250 = 0
    let totalDepartmentOverTimeTotal170 = 0
    let totalDepartmentOverTimeTotal208 = 0
    let totalDepartmentActingAllowance = 0
    let totalDepartmentHouseAllowance = 0
    let totalDepartmentTaxiAllowance = 0
    let totalDepartmentAbsenceHour = 0
    let totalDepartmentAbsenceAmount = 0
    let totalDepartmentGrossPay = 0
    let totalDepartmentGrossTaxableSalary = 0
    let totalDepartmentIncomeTax = 0
    let totalDepartmentPension7 = 0
      let totalDepartmentPension11 = 0
    let totalDepartmentLabourUnion = 0
    let totalDepartmentIdir = 0
    let totalDepartmentCreditAssociation = 0
    let totalDepartmentCostSharing = 0
    let totalDepartmentRedCross = 0
    let totalDepartmentBond = 0
    let totalDepartmentCreditSale = 0
    let totalDepartmentLongTermLoan = 0
    let totalDepartmentOtherLoan = 0
    let totalDepartmentOtherDeductions = 0
    let totalDepartmentMedicalExpense = 0
    let totalDepartmentAdvance = 0
    let totalDepartmentFine = 0
    let totalDepartmentTotalDeductions = 0
    let totalDepartmentNetPay = 0

    


    store.data.filter(({ employeeStatusName }: any) => employeeStatusName == 'Active').forEach(({ employeeCode, employeeName, transactions, employeeDepartment, monthlyWorkingHours }: any, index: any) => {
        const basicSalary = transactions?.find((obj: any) => obj.transaction_name === "Basic Salary");
        const leaveHours = transactions?.find((obj: any) => obj.transaction_name === "Leave Hours");
        const leaveAmount = transactions?.find((obj: any) => obj.transaction_name === "Leave Amount") || { transaction_amount: 0 };
        const workingHours = monthlyWorkingHours == 208 ? '8' : '7'
        const hardship20 = transactions?.find((obj: any) => obj.transaction_name === "Hardship Allowance 20%") ||  transactions?.find((obj: any) => obj.transaction_name === "Hardship Allowance 20% Input") || { transaction_amount: 0 };
        const hardship15 = transactions?.find((obj: any) => obj.transaction_name === "Hardship Allowance 15%") ||  transactions?.find((obj: any) => obj.transaction_name === "Hardship Allowance 15% Input") ||{ transaction_amount: 0 };
        const overTime150 = transactions?.find((obj: any) => obj.transaction_name === "Overtime Hours 150%") || { transaction_amount: 0 };
        const overTime170 = transactions?.find((obj: any) => obj.transaction_name === "Overtime Hours 175%") || { transaction_amount: 0 };
        const overTime200 = transactions?.find((obj: any) => obj.transaction_name === "Overtime Hours 200%") || { transaction_amount: 0 };
        const overTime250 = transactions?.find((obj: any) => obj.transaction_name === "Overtime Hours 250%") || { transaction_amount: 0 };
        const overTime150Amount = transactions?.find((obj: any) => obj.transaction_name === "Overtime Amount 150%") || { transaction_amount: 0 };
        const overTime170Amount = transactions?.find((obj: any) => obj.transaction_name === "Overtime Amount 175%") || { transaction_amount: 0 };
        const overTime200Amount = transactions?.find((obj: any) => obj.transaction_name === "Overtime Amount 200%") || { transaction_amount: 0 };
        const overTime250Amount = transactions?.find((obj: any) => obj.transaction_name === "Overtime Amount 250%") || { transaction_amount: 0 };
        const overTimeTotal170 = workingHours == '7' ? (Number(overTime150Amount.transaction_amount) + Number(overTime170Amount.transaction_amount) + Number(overTime200Amount.transaction_amount) + Number(overTime250Amount.transaction_amount)) : ''
        const overTimeTotal208 = workingHours == '8' ? (Number(overTime150Amount.transaction_amount) + Number(overTime170Amount.transaction_amount) + Number(overTime200Amount.transaction_amount) + Number(overTime250Amount.transaction_amount)) : ''
        const actingAllowance = transactions?.find((obj: any) => obj.transaction_name === "Acting Allowance") || { transaction_amount: 0 };
        const positionAllowance = transactions?.find((obj: any) => obj.transaction_name === "Position Allowance") || { transaction_amount: 0 };
        const indemnityAllowance = transactions?.find((obj: any) => obj.transaction_name === "Indemnity Allowance") || { transaction_amount: 0 };
        const houseAllowance = transactions?.find((obj: any) => obj.transaction_name === "House Allowance") || { transaction_amount: 0 };
        const taxiAllowance = transactions?.find((obj: any) => obj.transaction_name === "Taxi Allowance") || { transaction_amount: 0 };
        const absenceHour = transactions?.find((obj: any) => obj.transaction_name === "Absence Hours") || { transaction_amount: 0 };
        const absenceAmount = transactions?.find((obj: any) => obj.transaction_name === "Absence Amount") || { transaction_amount: 0 };
        const grossPay = transactions?.find((obj: any) => obj.transaction_name === "Gross Salary") || { transaction_amount: 0 };
        const grossTaxableSalary = transactions?.find((obj: any) => obj.transaction_name === "Gross Taxable Salary") || { transaction_amount: 0 };
        const incomeTax = transactions?.find((obj: any) => obj.transaction_name === "Income Tax") || { transaction_amount: 0 };
        const pension7 = transactions?.find((obj: any) => obj.transaction_name === "Pension Employee") || { transaction_amount: 0 };
         const pension11 = transactions?.find((obj: any) => obj.transaction_name === "Pension Company") || { transaction_amount: 0 };
        const labourUnion = transactions?.find((obj: any) => obj.transaction_name === "Labour Union") || { transaction_amount: 0 };
        const idir = transactions?.find((obj: any) => obj.transaction_name === "Edir") || { transaction_amount: 0 };
        const creditAssociation = transactions?.find((obj: any) => obj.transaction_name === "Credit Ass. Vol. Saving Amount") || { transaction_amount: 0 };
        const costSharing = transactions?.find((obj: any) => obj.transaction_name === "Cost Sharing") || { transaction_amount: 0 };
        const redCross = transactions?.find((obj: any) => obj.transaction_name === "Red Cross") || { transaction_amount: 0 };
        const bond = transactions?.find((obj: any) => obj.transaction_name === "Bond") || { transaction_amount: 0 };
        const creditSale = transactions?.find((obj: any) => obj.transaction_name === "Credit Sales") || { transaction_amount: 0 };
        const longTermLoan = transactions?.find((obj: any) => obj.transaction_name === "Long Term Loan") || { transaction_amount: 0 };
        const otherLoan = transactions?.find((obj: any) => obj.transaction_name === "Other Loan") || { transaction_amount: 0 };
        const otherDeductions = transactions?.find((obj: any) => obj.transaction_name === "Other Deduction") || { transaction_amount: 0 };
        const medicalExpense = transactions?.find((obj: any) => obj.transaction_name === "Medical Expenses") || { transaction_amount: 0 };
        const advance = transactions?.find((obj: any) => obj.transaction_name === "Advance") || { transaction_amount: 0 };
        const fine = transactions?.find((obj: any) => obj.transaction_name === "Fine") || { transaction_amount: 0 };
        const grossSalary = transactions?.filter(({ transaction_code }: any) => transaction_code == '52')[0]?.transaction_amount
        const netPay = transactions?.filter(({ transaction_code }: any) => transaction_code == '99')[0]?.transaction_amount
        const totalDeductions = grossSalary - netPay
            ;


        if (employeeDepartment !== currentDepartment) {
            totalDepartmentBasicSalary += Number(Number(departmentBasicSalary).toFixed(2));
            totalDepartmentLeaveHours += Number(Number(departmentLeaveHours).toFixed(2));
            totalDepartmentLeaveAmount += Number(Number(departmentLeaveAmount).toFixed(2));
            totalDepartmentWorkingHours += Number(Number(departmentWorkingHours).toFixed(2));
            totalDepartmentHardship20 += Number(Number(departmentHardship20).toFixed(2));
            totalDepartmentHardship15 += Number(Number(departmentHardship15).toFixed(2));
            totalDepartmentOverTime150 += Number(Number(departmentOverTime150).toFixed(2));
            totalDepartmentOverTime170 += Number(Number(departmentOverTime170).toFixed(2));
            totalDepartmentOverTime200 += Number(Number(departmentOverTime200).toFixed(2));
            totalDepartmentOverTime250 += Number(Number(departmentOverTime250).toFixed(2));
            totalDepartmentOverTimeTotal170 += Number(Number(departmentOverTimeTotal170).toFixed(2));
            totalDepartmentOverTimeTotal208 += Number(Number(departmentOverTimeTotal208).toFixed(2));
            totalDepartmentActingAllowance += Number(Number(departmentActingAllowance).toFixed(2));
            totalDepartmentHouseAllowance += Number(Number(departmentHouseAllowance).toFixed(2));
            totalDepartmentTaxiAllowance += Number(Number(departmentTaxiAllowance).toFixed(2));
            totalDepartmentAbsenceHour += Number(Number(departmentAbsenceHour).toFixed(2));
            totalDepartmentAbsenceAmount += Number(Number(departmentAbsenceAmount).toFixed(2));
            totalDepartmentGrossPay += Number(Number(departmentGrossPay).toFixed(2));
            totalDepartmentGrossTaxableSalary += Number(Number(departmentGrossTaxableSalary).toFixed(2));
            totalDepartmentIncomeTax += Number(Number(departmentIncomeTax).toFixed(2));
            totalDepartmentPension7 += Number(Number(departmentPension7).toFixed(2));
            totalDepartmentPension11 += Number(Number(departmentPension11).toFixed(2));
            totalDepartmentLabourUnion += Number(Number(departmentLabourUnion).toFixed(2));
            totalDepartmentIdir += Number(Number(departmentIdir).toFixed(2));
            totalDepartmentCreditAssociation += Number(Number(departmentCreditAssociation).toFixed(2));
            totalDepartmentCostSharing += Number(Number(departmentCostSharing).toFixed(2));
            totalDepartmentRedCross += Number(Number(departmentRedCross).toFixed(2));
            totalDepartmentBond += Number(Number(departmentBond).toFixed(2));
            totalDepartmentCreditSale += Number(Number(departmentCreditSale).toFixed(2));
            totalDepartmentLongTermLoan += Number(Number(departmentLongTermLoan).toFixed(2));
            totalDepartmentOtherLoan += Number(Number(departmentOtherLoan).toFixed(2));
            totalDepartmentOtherDeductions += Number(Number(departmentOtherDeductions).toFixed(2));
            totalDepartmentMedicalExpense += Number(Number(departmentMedicalExpense).toFixed(2));
            totalDepartmentAdvance += Number(Number(departmentAdvance).toFixed(2));
            totalDepartmentFine += Number(Number(departmentFine).toFixed(2));
            totalDepartmentTotalDeductions += Number(Number(departmentTotalDeductions).toFixed(2));
            totalDepartmentNetPay += Number(Number(departmentNetPay).toFixed(2));

            if (currentDepartment !== null) {
                tableData.push([`TOTAL`, '', '',
                    Number(departmentBasicSalary).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentLeaveHours).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentLeaveAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentWorkingHours).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentHardship20).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentHardship15).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentOverTime150).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentOverTime170).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentOverTime200).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentOverTime250).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentOverTimeTotal170).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentOverTimeTotal208).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentActingAllowance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentHouseAllowance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentTaxiAllowance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentAbsenceHour).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentAbsenceAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentGrossPay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentGrossTaxableSalary).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentIncomeTax).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentPension7).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentPension11).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentLabourUnion).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentIdir).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentCreditAssociation).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentCostSharing).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentRedCross).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentBond).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentCreditSale).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentLongTermLoan).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentOtherLoan).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentOtherDeductions).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentMedicalExpense).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentAdvance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentFine).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentTotalDeductions).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    Number(departmentNetPay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                ]);
                merges.push({ s: { r: tableData.length - 1, c: 0 }, e: { r: tableData.length - 1, c: 2 } });
            }

          
            departmentBasicSalary = 0;
            departmentLeaveHours = 0;
            departmentLeaveAmount = 0;
            departmentWorkingHours = 0;
            departmentHardship20 = 0;
            departmentHardship15 = 0;
            departmentOverTime150 = 0;
            departmentOverTime170 = 0;
            departmentOverTime200 = 0;
            departmentOverTime250 = 0;
            departmentOverTimeTotal170 = 0;
            departmentOverTimeTotal208 = 0;
            departmentActingAllowance = 0;
            departmentHouseAllowance = 0;
            departmentTaxiAllowance = 0;
            departmentAbsenceHour = 0;
            departmentAbsenceAmount = 0;
            totalDepartmentLeaveHours = 0;
            departmentLeaveHours = 0;
            departmentIncomeTax = 0;
            departmentPension7 = 0;
            departmentPension11 = 0;
            departmentLabourUnion = 0;
            departmentIdir = 0;
            departmentCreditAssociation = 0;
            departmentCostSharing = 0;
            departmentGrossPay = 0;
            departmentGrossTaxableSalary = 0;
            departmentRedCross = 0;
            departmentBond = 0;
            departmentCreditSale = 0;
            departmentLongTermLoan = 0;
            departmentOtherLoan = 0;
            departmentOtherDeductions = 0;
            departmentMedicalExpense = 0;
            departmentAdvance = 0;
            departmentFine = 0;
            departmentTotalDeductions = 0;
            departmentNetPay = 0;

            currentDepartment = employeeDepartment;


            tableData.push([`${currentDepartment}`, '', '', ...Array(tableData[dataStartRow].length - 3).fill('')]);
            tableData.push([...Array(tableData[dataStartRow].length).fill('')]);
            merges.push({ s: { r: tableData.length - 2, c: 0 }, e: { r: tableData.length - 1, c: tableData[dataStartRow].length } });
        }

        departmentBasicSalary += Number(Number(basicSalary?.transaction_amount).toFixed(2))
        departmentLeaveHours += Number(Number(leaveHours?.transaction_amount).toFixed(2))
        departmentLeaveAmount += Number(Number(leaveAmount?.transaction_amount).toFixed(2))
        departmentWorkingHours += Number(Number(workingHours))
        departmentHardship20 += Number(Number(hardship20?.transaction_amount).toFixed(2))
        departmentHardship15 += Number(Number(hardship15?.transaction_amount).toFixed(2))
        departmentOverTime150 += Number(Number(overTime150?.transaction_amount).toFixed(2))
        departmentOverTime170 += Number(Number(overTime170?.transaction_amount).toFixed(2))
        departmentOverTime200 += Number(Number(overTime200?.transaction_amount).toFixed(2))
        departmentOverTime250 += Number(Number(overTime250?.transaction_amount).toFixed(2))
        departmentOverTimeTotal170 += Number(Number(overTimeTotal170).toFixed(2))
        departmentOverTimeTotal208 += Number(Number(overTimeTotal208).toFixed(2))
        departmentActingAllowance += Number(Number(actingAllowance?.transaction_amount).toFixed(2)) + Number(Number(positionAllowance?.transaction_amount).toFixed(2)) + Number(Number(indemnityAllowance?.transaction_amount).toFixed(2))
        departmentHouseAllowance += Number(Number(houseAllowance?.transaction_amount).toFixed(2))
        departmentTaxiAllowance += Number(Number(taxiAllowance?.transaction_amount).toFixed(2))
        departmentAbsenceHour += Number(Number(absenceHour?.transaction_amount).toFixed(2))
        departmentAbsenceAmount += Number(Number(absenceAmount?.transaction_amount).toFixed(2))
        departmentGrossPay += Number(Number(grossPay?.transaction_amount).toFixed(2))
        departmentGrossTaxableSalary += Number(Number(grossTaxableSalary?.transaction_amount).toFixed(2))
        departmentIncomeTax += Number(Number(incomeTax?.transaction_amount).toFixed(2))
        departmentPension7 += Number(Number(pension7?.transaction_amount).toFixed(2))
         departmentPension11 += Number(Number(pension11?.transaction_amount).toFixed(2))
        departmentLabourUnion += Number(Number(labourUnion?.transaction_amount).toFixed(2))
        departmentIdir += Number(Number(idir?.transaction_amount).toFixed(2))
        departmentCreditAssociation += Number(Number(creditAssociation?.transaction_amount).toFixed(2))
        departmentCostSharing += Number(Number(costSharing?.transaction_amount).toFixed(2))
        departmentRedCross += Number(Number(redCross?.transaction_amount).toFixed(2))
        departmentBond += Number(Number(bond?.transaction_amount).toFixed(2))
        departmentCreditSale += Number(Number(creditSale?.transaction_amount).toFixed(2))
        departmentLongTermLoan += Number(Number(longTermLoan?.transaction_amount).toFixed(2))
        departmentOtherLoan += Number(Number(otherLoan?.transaction_amount).toFixed(2))
        departmentOtherDeductions += Number(Number(otherDeductions?.transaction_amount).toFixed(2))
        departmentMedicalExpense += Number(Number(medicalExpense?.transaction_amount).toFixed(2))
        departmentAdvance += Number(Number(advance?.transaction_amount).toFixed(2))
        departmentFine += Number(Number(fine?.transaction_amount).toFixed(2))
        departmentTotalDeductions += Number(Number(totalDeductions).toFixed(2))
        departmentNetPay += Number(Number(netPay).toFixed(2))

        tableData.push([
            Number(index + 1),
            employeeCode,
            employeeName,
            (Number(basicSalary?.transaction_amount).toFixed(2) !== '0.00' ? Number(basicSalary?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(leaveHours?.transaction_amount).toFixed(2) !== '0.00' ? Number(leaveHours?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(leaveAmount?.transaction_amount).toFixed(2) !== '0.00' ? Number(leaveAmount?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(workingHours) !== 0 ? Number(workingHours).toLocaleString() : ''),
            (Number(hardship20?.transaction_amount).toFixed(2) !== '0.00' ? Number(hardship20?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(hardship15?.transaction_amount).toFixed(2) !== '0.00' ? Number(hardship15?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(overTime150?.transaction_amount).toFixed(2) !== '0.00' ? Number(overTime150?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(overTime170?.transaction_amount).toFixed(2) !== '0.00' ? Number(overTime170?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(overTime200?.transaction_amount).toFixed(2) !== '0.00' ? Number(overTime200?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(overTime250?.transaction_amount).toFixed(2) !== '0.00' ? Number(overTime250?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(overTimeTotal170).toFixed(2) !== '0.00' ? Number(overTimeTotal170).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(overTimeTotal208).toFixed(2) !== '0.00' ? Number(overTimeTotal208).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(Number(actingAllowance?.transaction_amount).toFixed(2)) + Number(Number(positionAllowance?.transaction_amount).toFixed(2)) + Number(Number(indemnityAllowance?.transaction_amount).toFixed(2))) !== 0 ? (Number(Number(Number(actingAllowance?.transaction_amount).toFixed(2)) + Number(Number(positionAllowance?.transaction_amount).toFixed(2)) + Number(Number(indemnityAllowance?.transaction_amount).toFixed(2))).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : '',
            (Number(houseAllowance?.transaction_amount).toFixed(2) !== '0.00' ? Number(houseAllowance?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(taxiAllowance?.transaction_amount).toFixed(2) !== '0.00' ? Number(taxiAllowance?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(absenceHour?.transaction_amount).toFixed(2) !== '0.00' ? Number(absenceHour?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(absenceAmount?.transaction_amount).toFixed(2) !== '0.00' ? Number(absenceAmount?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(grossPay?.transaction_amount).toFixed(2) !== '0.00' ? Number(grossPay?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(grossTaxableSalary?.transaction_amount).toFixed(2) !== '0.00' ? Number(grossTaxableSalary?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(incomeTax?.transaction_amount).toFixed(2) !== '0.00' ? Number(incomeTax?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(pension7?.transaction_amount).toFixed(2) !== '0.00' ? Number(pension7?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
               (Number(pension11?.transaction_amount).toFixed(2) !== '0.00' ? Number(pension11?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(labourUnion?.transaction_amount).toFixed(2) !== '0.00' ? Number(labourUnion?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(idir?.transaction_amount).toFixed(2) !== '0.00' ? Number(idir?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(creditAssociation?.transaction_amount).toFixed(2) !== '0.00' ? Number(creditAssociation?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(costSharing?.transaction_amount).toFixed(2) !== '0.00' ? Number(costSharing?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(redCross?.transaction_amount).toFixed(2) !== '0.00' ? Number(redCross?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(bond?.transaction_amount).toFixed(2) !== '0.00' ? Number(bond?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(creditSale?.transaction_amount).toFixed(2) !== '0.00' ? Number(creditSale?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(longTermLoan?.transaction_amount).toFixed(2) !== '0.00' ? Number(longTermLoan?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(otherLoan?.transaction_amount).toFixed(2) !== '0.00' ? Number(otherLoan?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(otherDeductions?.transaction_amount).toFixed(2) !== '0.00' ? Number(otherDeductions?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(medicalExpense?.transaction_amount).toFixed(2) !== '0.00' ? Number(medicalExpense?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(advance?.transaction_amount).toFixed(2) !== '0.00' ? Number(advance?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(fine?.transaction_amount).toFixed(2) !== '0.00' ? Number(fine?.transaction_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(totalDeductions).toFixed(2) !== '0.00' ? Number(totalDeductions).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),
            (Number(netPay).toFixed(2) !== '0.00' ? Number(netPay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''),

        ])
    })

    if (currentDepartment !== null) {
        totalDepartmentBasicSalary += Number(Number(departmentBasicSalary).toFixed(2));
        totalDepartmentLeaveHours += Number(Number(departmentLeaveHours).toFixed(2));
        totalDepartmentLeaveAmount += Number(Number(departmentLeaveAmount).toFixed(2));
        totalDepartmentWorkingHours += Number(Number(departmentWorkingHours).toFixed(2));
        totalDepartmentHardship20 += Number(Number(departmentHardship20).toFixed(2));
        totalDepartmentHardship15 += Number(Number(departmentHardship15).toFixed(2));
        totalDepartmentOverTime150 += Number(Number(departmentOverTime150).toFixed(2));
        totalDepartmentOverTime170 += Number(Number(departmentOverTime170).toFixed(2));
        totalDepartmentOverTime200 += Number(Number(departmentOverTime200).toFixed(2));
        totalDepartmentOverTime250 += Number(Number(departmentOverTime250).toFixed(2));
        totalDepartmentOverTimeTotal170 += Number(Number(departmentOverTimeTotal170).toFixed(2));
        totalDepartmentOverTimeTotal208 += Number(Number(departmentOverTimeTotal208).toFixed(2));
        totalDepartmentActingAllowance += Number(Number(departmentActingAllowance).toFixed(2));
        totalDepartmentHouseAllowance += Number(Number(departmentHouseAllowance).toFixed(2));
        totalDepartmentTaxiAllowance += Number(Number(departmentTaxiAllowance).toFixed(2));
        totalDepartmentAbsenceHour += Number(Number(departmentAbsenceHour).toFixed(2));
        totalDepartmentAbsenceAmount += Number(Number(departmentAbsenceAmount).toFixed(2));
        totalDepartmentGrossPay += Number(Number(departmentGrossPay).toFixed(2));
        totalDepartmentGrossTaxableSalary += Number(Number(departmentGrossTaxableSalary).toFixed(2));
        totalDepartmentIncomeTax += Number(Number(departmentIncomeTax).toFixed(2));
        totalDepartmentPension7 += Number(Number(departmentPension7).toFixed(2));
           totalDepartmentPension11 += Number(Number(departmentPension11).toFixed(2));
        totalDepartmentLabourUnion += Number(Number(departmentLabourUnion).toFixed(2));
        totalDepartmentIdir += Number(Number(departmentIdir).toFixed(2));
        totalDepartmentCreditAssociation += Number(Number(departmentCreditAssociation).toFixed(2));
        totalDepartmentCostSharing += Number(Number(departmentCostSharing).toFixed(2));
        totalDepartmentRedCross += Number(Number(departmentRedCross).toFixed(2));
        totalDepartmentBond += Number(Number(departmentBond).toFixed(2));
        totalDepartmentCreditSale += Number(Number(departmentCreditSale).toFixed(2));
        totalDepartmentLongTermLoan += Number(Number(departmentLongTermLoan).toFixed(2));
        totalDepartmentOtherLoan += Number(Number(departmentOtherLoan).toFixed(2));
        totalDepartmentOtherDeductions += Number(Number(departmentOtherDeductions).toFixed(2));
        totalDepartmentMedicalExpense += Number(Number(departmentMedicalExpense).toFixed(2));
        totalDepartmentAdvance += Number(Number(departmentAdvance).toFixed(2));
        totalDepartmentFine += Number(Number(departmentFine).toFixed(2));
        totalDepartmentTotalDeductions += Number(Number(departmentTotalDeductions).toFixed(2));
        totalDepartmentNetPay += Number(Number(departmentNetPay).toFixed(2));

        // Merge cells for the "Total" title
        tableData.push([`TOTAL`, '', '',
            Number(departmentBasicSalary).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentLeaveHours).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentLeaveAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentWorkingHours).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentHardship20).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentHardship15).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentOverTime150).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentOverTime170).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentOverTime200).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentOverTime250).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentOverTimeTotal170).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentOverTimeTotal208).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentActingAllowance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentHouseAllowance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentTaxiAllowance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentAbsenceHour).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentAbsenceAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentGrossPay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentGrossTaxableSalary).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentIncomeTax).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentPension7).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
              Number(departmentPension11).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentLabourUnion).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentIdir).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentCreditAssociation).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentCostSharing).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentRedCross).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentBond).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentCreditSale).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentLongTermLoan).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentOtherLoan).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentOtherDeductions).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentMedicalExpense).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentAdvance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentFine).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentTotalDeductions).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Number(departmentNetPay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        ]);
        merges.push({ s: { r: tableData.length - 1, c: 0 }, e: { r: tableData.length - 1, c: 2 } });
    }

    tableData.push([`GRAND TOTAL`, '', '',
        Number(totalDepartmentBasicSalary).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentLeaveHours).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentLeaveAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentWorkingHours).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentHardship20).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentHardship15).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentOverTime150).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentOverTime170).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentOverTime200).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentOverTime250).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentOverTimeTotal170).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentOverTimeTotal208).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentActingAllowance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentHouseAllowance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentTaxiAllowance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentAbsenceHour).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentAbsenceAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentGrossPay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentGrossTaxableSalary).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentIncomeTax).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentPension7).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          Number(totalDepartmentPension11).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentLabourUnion).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentIdir).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentCreditAssociation).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentCostSharing).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentRedCross).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentBond).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentCreditSale).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentLongTermLoan).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentOtherLoan).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentOtherDeductions).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentMedicalExpense).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentAdvance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentFine).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentTotalDeductions).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        Number(totalDepartmentNetPay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    ]);
    merges.push({ s: { r: tableData.length - 1, c: 0 }, e: { r: tableData.length - 1, c: 2 } });



    const workbook = utils.book_new();
    const worksheet = utils.aoa_to_sheet(tableData);

    // Define column widths
    worksheet['!cols'] = [
        { wpx: 30 }, // Code
        { wpx: 50 }, // Code
        { wpx: 150 }, // Name
        { wpx: 100 }, // Deductions
        { wpx: 100 }, // Earnings
        { wpx: 100 }, // Net
        { wpx: 100 }, // Name
        { wpx: 100 }, // Deductions
        { wpx: 100 }, // Earnings
        { wpx: 100 }, // Net
        { wpx: 100 }, // Name
        { wpx: 100 }, // Deductions
        { wpx: 100 }, // Earnings
        { wpx: 100 }, // Net
        { wpx: 100 }, // Name
        { wpx: 100 }, // Deductions
        { wpx: 100 }, // Earnings
        { wpx: 100 }, // Net
        { wpx: 100 }, // Deductions
       { wpx: 100 }, // Deductions
        { wpx: 100 }, // Earnings
        { wpx: 100 }, // Net
        { wpx: 100 }, // Name
        { wpx: 100 }, // Deductions
        { wpx: 100 }, // Earnings
        { wpx: 100 }, // Net
        { wpx: 100 }, // Name
        { wpx: 100 }, // Deductions
        { wpx: 100 }, // Earnings
        { wpx: 100 }, // Net
        { wpx: 100 }, // Name
        { wpx: 100 }, // Deductions
        { wpx: 100 }, // Earnings
        { wpx: 100 }, // Net
        { wpx: 100 }, // Deductions
        { wpx: 100 }, // Earnings
        { wpx: 100 }, // Net
        { wpx: 100 }, // Name
        { wpx: 100 }, // Deductions
        { wpx: 100 }, // Earnings
        { wpx: 100 }, // Net
    ];



    // Apply header styling
    const headerStyle = {
        font: { bold: true },
        border: {
            top: { style: 'thin', color: { auto: 1 } },
            bottom: { style: 'thin', color: { auto: 1 } },
            left: { style: 'thin', color: { auto: 1 } },
            right: { style: 'thin', color: { auto: 1 } },
        },
        alignment: { horizontal: 'center', vertical: 'center' },
    };

    const numberStyle = {
        alignment: { horizontal: 'right' },
        border: {
            top: { style: 'thin', color: { auto: 1 } },
            bottom: { style: 'thin', color: { auto: 1 } },
            left: { style: 'thin', color: { auto: 1 } },
            right: { style: 'thin', color: { auto: 1 } },
        },
        font: { bold: true },
    }

    const dataRowStyle = {
        font: { bold: true },
        border: {
            top: { style: 'thin', color: { auto: 1 } },
            bottom: { style: 'thin', color: { auto: 1 } },
            left: { style: 'thin', color: { auto: 1 } },
            right: { style: 'thin', color: { auto: 1 } },
        },
    }

    const totalStyle = {
        font: { bold: true },
        fill: { fgColor: { rgb: 'DDDDDD' } }, // Gray background color for totals
        border: {
            top: { style: 'thin', color: { auto: 1 } },
            bottom: { style: 'thin', color: { auto: 1 } },
            left: { style: 'thin', color: { auto: 1 } },
            right: { style: 'thin', color: { auto: 1 } },
        },
        alignment: { horizontal: 'center' },
    };

    const totalRightStyle = {
        font: { bold: true },
        fill: { fgColor: { rgb: 'DDDDDD' } }, // Gray background color for totals
        border: {
            top: { style: 'thin', color: { auto: 1 } },
            bottom: { style: 'thin', color: { auto: 1 } },
            left: { style: 'thin', color: { auto: 1 } },
            right: { style: 'thin', color: { auto: 1 } },
        },
        alignment: { horizontal: 'right' },
    };




    tableData.forEach((row: any, rowIndex: any) => {
        const isTotalRow = row[0] === 'TOTAL';

        if (rowIndex !== 0) { // Skip the header row
            row.forEach((_: any, colIndex: any) => {
                const cellAddress = utils.encode_cell({ c: colIndex, r: rowIndex });
                if (isTotalRow || rowIndex === tableData.length - 1) {

                    // Apply totalStyle for total rows and the last row
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], { s: colIndex < 3 ? totalStyle : totalRightStyle });
                } else if (colIndex >= 3) { // Apply numberStyle for data rows
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], { s: numberStyle });
                } else {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], { s: dataRowStyle });
                }
            });
        }

        if (rowIndex >= 0 && rowIndex <= 2) { // Rows 1 to 3
            row.forEach((_: any, colIndex: any) => {
                const cellAddress = utils.encode_cell({ c: colIndex, r: rowIndex });
                worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], { s: headerStyle });
            });
        }

        if (rowIndex == 0) { // Skip the header row
            row.forEach((_: any, colIndex: any) => {
                const cellAddress = utils.encode_cell({ c: colIndex, r: rowIndex });
                worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], { s: headerStyle });
                const mergeRanges = [
                    { colStart: 4, colEnd: 5 },
                    { colStart: 7, colEnd: 8 },
                    { colStart: 9, colEnd: 12 },
                    { colStart: 13, colEnd: 14 },
                    { colStart: 15, colEnd: 17 },
                    { colStart: 18, colEnd: 19 },
                ];
                mergeRanges.forEach(({ colStart, colEnd }) => {
                    if (colIndex >= colStart && colIndex <= colEnd) {
                        merges.push({ s: { r: 0, c: colStart }, e: { r: 1, c: colEnd } });
                    }
                });
                if (![4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].includes(colIndex))
                    merges.push({ s: { r: 0, c: colIndex }, e: { r: 2, c: colIndex } })
            });
        }




    });

    const targetRow = 2; // 0-based index for rows
    const targetColumns = [4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]; // 0-based index for columns (4th, 5th, 7th, 8th columns)



    tableData.forEach((row: any, rowIndex: any) => {
        // ...
        if (rowIndex === targetRow) { // Check if it's the target row
            targetColumns.forEach((targetColumn) => {
                const cellAddress = utils.encode_cell({ c: targetColumn, r: rowIndex });

                if (targetColumn === 4) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: 'Hour',
                        s: headerStyle,
                    });
                } else if (targetColumn === 5) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: 'Amount',
                        s: headerStyle,
                    });
                } else if (targetColumn === 7) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: '20%',
                        s: headerStyle,
                    });
                } else if (targetColumn === 8) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: '15%',
                        s: headerStyle,
                    });
                } else if (targetColumn === 9) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: '150%',
                        s: headerStyle,
                    });
                } else if (targetColumn === 10) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: '175%',
                        s: headerStyle,
                    });
                } else if (targetColumn === 11) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: '200%',
                        s: headerStyle,
                    });
                } else if (targetColumn === 12) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: '250%',
                        s: headerStyle,
                    });
                } else if (targetColumn === 13) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: '170',
                        s: headerStyle,
                    });
                } else if (targetColumn === 14) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: '208',
                        s: headerStyle,
                    });
                } else if (targetColumn === 15) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: 'Acting (& Other)',
                        s: headerStyle,
                    });
                } else if (targetColumn === 16) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: 'House',
                        s: headerStyle,
                    });
                } else if (targetColumn === 17) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: 'Taxi',
                        s: headerStyle,
                    });
                } else if (targetColumn === 18) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: 'Hour',
                        s: headerStyle,
                    });
                } else if (targetColumn === 19) {
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], {
                        t: 's',
                        v: 'Amount',
                        s: headerStyle,
                    });
                }

            });
        }

        // ...
    });






    // Apply merges
    if (merges.length > 0) {
        worksheet['!merges'] = merges;
    }



    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    writeFile(workbook, `Payroll Detail Styled.xlsx`);
};


import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const PayrollAdvice = () => {


    // ** State
    const [branch, setBranch] = useState<string>('')
    const [branchObject, setBranchObject] = useState<any>({ id: '', branchName: '' })
    const [department, setDepartment] = useState<string>('')
    const [departmentObject, setDepartmentObject] = useState<any>({ id: '', departmentName: '' })

    const [value] = useState<string>('')


    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.payrollSheet)

    const departmentStore = useSelector((state: RootState) => state.department)
    const branchStore = useSelector((state: RootState) => state.branches)

    useEffect(() => {
        dispatch(
            fetchBranch({
                q: ''
            })
        )
        dispatch(
            fetchDepartment({
                q: ''
            })
        )
        dispatch(
            fetchData({
                branch,
                department,
                q: value,
                currentPlan: ''
            })
        )
    }, [dispatch, branch, department, value])

    const {
        reset,
        setValue,
        handleSubmit,
        trigger,
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })


    const handleBranchChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setBranchObject(newValue)
            setBranch(newValue.id)
            setValue('branch', newValue.id)
            trigger('branch')
            setDepartmentObject({ departmentName: '', id: '' })
            setDepartment('')
            setValue('department', '')
        }
    }


    const handleDepartmentChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setDepartmentObject(newValue)
            setDepartment(newValue.id)
            setValue('department', newValue.id)
            trigger('department')
        }
    }


    const onSubmit = (data: any) => {
        data.branch = branch
        data.department = department
        dispatch(
            fetchData({
                branch,
                department,
                q: value,
                currentPlan: ''
            })
        )
    }

    const clearAllFields = () => {
        reset(emptyValues)
        setBranchObject({ id: '', branchName: '' })
        setDepartmentObject({ id: '', departmentName: '' })
        setBranch('')
        setDepartment('')
        setValue('branch', '')
        setValue('department', '')
    }


    return (
        <Grid container spacing={3}>
            <Grid item xl={12} md={12} xs={12}>
                <form noValidate autoComplete='on' onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader title='Payroll Detail' />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={branchObject}
                                            options={[{ id: "All", branchName: 'All Branches' }, ...branchStore.data,]}
                                            onChange={handleBranchChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.branchName == value.branchName}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.branchName}
                                            renderInput={params => <TextField {...params} label='Select Branch' />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={departmentObject}
                                            options={[{ id: 'All', departmentName: 'All Departments' }, ...departmentStore.data.filter((dep: any) => dep.branchId == branch || branchObject.branchName == 'All' || dep.departmentName == 'All'),]}
                                            onChange={handleDepartmentChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.departmentName == value.departmentName}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.departmentName}
                                            renderInput={params => <TextField {...params} label='Select Department' />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <Button
                                        color='primary'
                                        fullWidth size='small'
                                        type='submit'
                                        variant='contained'
                                    >
                                        Preview
                                    </Button>
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <Button color='secondary' fullWidth size='small' onClick={() => clearAllFields()} type='reset' variant='contained'>
                                        Reset
                                    </Button>
                                </Grid>

                                <Grid item sm={3} xs={12}>
                                    <Button
                                        size='small'
                                        fullWidth
                                        disabled={store.data.length > 0 ? false : true}
                                        color='primary'
                                        variant='outlined'
                                        onClick={() => generateExcelFile(store)}
                                    >
                                        Download
                                    </Button>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </form>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} size='small' >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>
                                        <div style={{ width: '100%' }}>
                                            <div style={{ 'textAlign': 'right' }}>
                                                Deductions
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ width: '100%' }}>
                                            <div style={{ 'textAlign': 'right' }}>
                                                Earnings
                                            </div>
                                        </div>

                                    </TableCell>
                                    <TableCell>
                                        <div style={{ width: '100%' }}>
                                            <div style={{ 'textAlign': 'right' }}>
                                                Net Pay
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    store.data.filter(({ employeeStatusName }) => employeeStatusName == 'Active').map(({ employeeCode, employeeName, transactions }: any, index) => {
                                        const grossSalary = transactions?.filter(({ transaction_code }: any) => transaction_code == '52')[0]?.transaction_amount
                                        const netPay = transactions?.filter(({ transaction_code }: any) => transaction_code == '99')[0]?.transaction_amount
                                        const totalDeductions = grossSalary - netPay

                                        return (
                                            <TableRow key={index} >
                                                <TableCell>{`${employeeCode}`}</TableCell>
                                                <TableCell>{`${employeeName}`}</TableCell>
                                                <TableCell>
                                                    <div style={{ width: '100%' }}>
                                                        <div style={{ 'textAlign': 'right' }}>
                                                            {`${Number(totalDeductions).toFixed(2)}`}
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div style={{ width: '100%' }}>
                                                        <div style={{ 'textAlign': 'right' }}>
                                                            {`${Number(grossSalary).toFixed(2)}`}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div style={{ width: '100%' }}>
                                                        <div style={{ 'textAlign': 'right' }}>
                                                            {`${Number(netPay).toFixed(2)}`}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Grid>
        </Grid>

    )
}

export default PayrollAdvice
