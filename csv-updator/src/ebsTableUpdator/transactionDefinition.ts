import pool from '../config/pool'
import { v4 as uuid } from 'uuid'


export const getAllFromTransactionGroup = async (organizationId: string, transactionParameterName: string, transactionGroupId: any) => {
    const tranQuery = `
    SELECT 
    transaction_definition.id,
    transaction_definition.organization_id,
    transaction_definition.transaction_code,
    transaction_definition.transaction_name
    FROM transaction_definition
    WHERE 
    transaction_definition.organization_id=$1 AND 
    ${transactionParameterName === 'Transaction Group' ? "transaction_definition.transaction_group=$2" :
            transactionParameterName === 'Transaction Update Type' ? "transaction_definition.update_type=$2" : ""
        }
   `
    const { rows: transactions } = await pool.query(tranQuery,
        [organizationId, transactionGroupId])
    return transactions
}


const defaultTransactions = [
   
    {
        transactionCode: '1',
        transactionName: 'Basic Salary',
        shortName: 'Basic sa,',
        transactionType: 'NA',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {

        transactionCode: '2',
        transactionName: 'Absence Hours',
        shortName: 'Abs hrs',
        transactionType: 'Deduction Quantity',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '3',
        transactionName: 'Absence Amount',
        shortName: 'Abs Amt',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '4',
        transactionName: 'Days Worked',
        shortName: 'Days Worked',
        transactionType: 'Earning Quantity',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '5',
        transactionName: 'Salary',
        shortName: 'Salary',
        transactionType: 'Earning Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '6',
        transactionName: 'Position Allowance',
        shortName: 'Position All',
        transactionType: 'Earning Amount',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '7',
        transactionName: 'Acting Allowance',
        shortName: 'Acting All',
        transactionType: 'Earning Amount',
        updateType: 'Input',
        permanent: true,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '8',
        transactionName: 'Taxi Allowance',
        shortName: 'Taxi All',
        transactionType: 'Earning Amount',
        updateType: 'Input',
        permanent: true,
        taxable: false,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '9',
        transactionName: 'House Allowance',
        shortName: 'House All',
        transactionType: 'Earning Amount',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '10',
        transactionName: 'Overtime Hours 125%',
        shortName: 'OT Normal Hrs',
        transactionType: 'Earning Quantity',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '11',
        transactionName: 'Overtime Amount 125%',
        shortName: 'OT Normal Amt',
        transactionType: 'Earning Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '12',
        transactionName: 'Overtime Hours 150%',
        shortName: 'OT Night Hrs',
        transactionType: 'Earning Quantity',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '13',
        transactionName: 'Overtime Amount 150%',
        shortName: 'OT Night Amt',
        transactionType: 'Earning Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '14',
        transactionName: 'Overtime Hours 200%',
        shortName: 'OT Weekend Hrs',
        transactionType: 'Earning Quantity',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '15',
        transactionName: 'Overtime Amount 200%',
        shortName: 'OT Weekend Amt',
        transactionType: 'Earning Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '16',
        transactionName: 'Overtime Hours 250%',
        shortName: 'OT Holiday Hrs',
        transactionType: 'Earning Quantity',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '17',
        transactionName: 'Overtime Amount 250%',
        shortName: 'OT Holiday Amt',
        transactionType: 'Earning Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '18',
        transactionName: 'Medical Allowance',
        shortName: 'Medical All',
        transactionType: 'Earning Amount',
        updateType: 'Input',
        permanent: false,
        taxable: false,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '19',
        transactionName: 'Indemnity Allowance',
        shortName: 'Indemnity All',
        transactionType: 'Earning Amount',
        updateType: 'Input',
        permanent: false,
        taxable: false,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '20',
        transactionName: 'Other Alloowance',
        shortName: 'Other Alloowance',
        transactionType: 'Earning Amount',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '21',
        transactionName: 'Income Tax',
        shortName: 'Income Tax',
        transactionType: 'Deduction Amount',
        updateType: 'Not Editable',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },

    {
        transactionCode: '22',
        transactionName: 'Pension Company',
        shortName: 'Pension Company',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: true,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '23',
        transactionName: 'Pension Employee',
        shortName: 'Pension Employee',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: true,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '24',
        transactionName: 'Labour Union',
        shortName: 'Labour Union',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'Membership',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '25',
        transactionName: 'Telephone Benefits',
        shortName: 'Telephone Benefits',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'Membership',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },

    
    {
        transactionCode: '26',
        transactionName: 'Other Earnings',
        shortName: 'Other Earnings',
        transactionType: 'Earning Amount',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {

        transactionCode: '27',
        transactionName: 'Abay Dam',
        shortName: 'Abay Dam',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'Membership',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '28',
        transactionName: 'Hardship Allowance 20%',
        shortName: 'Hardship All. 20%',
        transactionType: 'Earning Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '29',
        transactionName: 'Hardship Allowance 15%',
        shortName: 'Hardship All. 15%',
        transactionType: 'Earning Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '30',
        transactionName: 'Telephone Expenses',
        shortName: 'Telephone',
        transactionType: 'Deduction Amount',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '31',
        transactionName: 'Medical Expenses',
        shortName: 'Medical',
        transactionType: 'Deduction Amount',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '32',
        transactionName: 'Fine',
        shortName: 'Fine',
        transactionType: 'Deduction Amount',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },

    {
        transactionCode: '33',
        transactionName: 'Other Loan',
        shortName: 'Other Loan',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'Loan',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '34',
        transactionName: 'Long Term Loan',
        shortName: 'Long Loan',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'Loan',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '35',
        transactionName: 'Credit Short Loan',
        shortName: 'Cr.Sh.Loan',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'Loan',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },

    {
        transactionCode: '36',
        transactionName: 'Credit Sales',
        shortName: 'Credit Sales',
        transactionType: 'Deduction Amount',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '37',
        transactionName: 'Credit Association Forced Saving',
        shortName: 'Cr Ass Forced Saving',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'Membership',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },

    {
        transactionCode: '38',
        transactionName: 'Credit Ass. Vol. Saving Rate',
        shortName: 'CAVS Rate',
        transactionType: 'Deduction Quantity',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },

    {
        transactionCode: '39',
        transactionName: 'Credit Ass. Vol. Saving Amount',
        shortName: 'CAVS Amount',
        transactionType: 'Deduction Amount',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '40',
        transactionName: 'None',
        shortName: 'NA',
        transactionType: 'NA',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '41',
        transactionName: 'Edir',
        shortName: 'Edir',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'Membership',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '42',
        transactionName: 'Other Deduction',
        shortName: 'Other Deduction',
        transactionType: 'Deduction Amount',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '43',
        transactionName: 'Court',
        shortName: 'Court',
        transactionType: 'Deduction Amount',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    }, {
        transactionCode: '44',
        transactionName: 'Red Cross',
        shortName: 'Red Cross',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'Membership',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },

    {
        transactionCode: '45',
        transactionName: 'Family',
        shortName: 'Family',
        transactionType: 'NA',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },

    {
        transactionCode: '46',
        transactionName: 'Advance',
        shortName: 'Advance',
        transactionType: 'Deduction Amount',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '48',
        transactionName: 'Cost Sharing',
        shortName: 'Cost Sharing',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'Membership',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '49',
        transactionName: 'Contribution T-Shirt',
        shortName: 'Con T-Shirt',
        transactionType: 'Deduction Amount',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'Membership',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '50',
        transactionName: 'Total Overtime',
        shortName: 'Total Overtime',
        transactionType: 'NA',
        updateType: 'Not Editable',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '51',
        transactionName: 'Gross Taxable Salary',
        shortName: 'Gross Taxable Salary',
        transactionType: 'NA',
        updateType: 'Not Editable',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '52',
        transactionName: 'Gross Salary',
        shortName: 'Gross Salary',
        transactionType: 'NA',
        updateType: 'Not Editable',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '61',
        transactionName: 'Leave Hours',
        shortName: 'Leave Hours',
        transactionType: 'Deduction Quantity',
        updateType: 'Input',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '62',
        transactionName: 'Leave Amount',
        shortName: 'Leave Amt',
        transactionType: 'NA',
        updateType: 'Calculation',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '97',
        transactionName: 'Last Overpay',
        shortName: 'Last Overpay',
        transactionType: 'Deduction Amount',
        updateType: 'Not Editable',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '98',
        transactionName: 'Overpay',
        shortName: 'Overpay',
        transactionType: 'NA',
        updateType: 'Not Editable',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '99',
        transactionName: 'Net Pay',
        shortName: 'Net Pay',
        transactionType: 'NA',
        updateType: 'Not Editable',
        permanent: false,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '100',
        transactionName: 'Contribution',
        shortName: 'Cont.',
        transactionType: 'NA',
        updateType: 'Input',
        permanent: true,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
    {
        transactionCode: '101',
        transactionName: 'Medical Contribution',
        shortName: 'Medical Cont.',
        transactionType: 'NA',
        updateType: 'Input',
        permanent: true,
        taxable: true,
        unTaxableLimit: '',
        affectByLeave: false,
        leaveDays: '',
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: 'NA',
        glEntryBy: '',
        directAccount: '',
        contractGlAccount: ''
    },
 


];

export const getSubParameterIdByNameByOrganization = async (organizationId: string, parentParameterName: string, parameterName: string): Promise<any> => {
    const { rows: parameterQueryResponse } = await pool.query(`
    SELECT pd.id
    FROM parameter_definition pd
    INNER JOIN parameter_definition parent_pd ON pd.parent_parameter_id = parent_pd.id
    WHERE parent_pd.parameter_name = $1
    AND pd.parameter_name = $2
    AND pd.organization_id = $3;

    `, [parentParameterName, parameterName, organizationId])
    return parameterQueryResponse[0].id
}

const setupTransactionDefinitions = async (organizationId: any, branchId: any) => {

    try {
        const deductionAmountTransactionType = await 
        
        getSubParameterIdByNameByOrganization(organizationId, 'Transaction Type', 'Deduction Amount')
        const deductionQuantityTransactionType = await 
        
        getSubParameterIdByNameByOrganization(organizationId, 'Transaction Type', 'Deduction Quantity')
        const earningAmountTransactionType = await 
        
        getSubParameterIdByNameByOrganization(organizationId, 'Transaction Type', 'Earning Amount')
        const earningQuantityTransactionType = await 
        
        getSubParameterIdByNameByOrganization(organizationId, 'Transaction Type', 'Earning Quantity')
        const naTransactionType = await 
        
        getSubParameterIdByNameByOrganization(organizationId, 'Transaction Type', 'NA')

        const inputUpdateType = await 
        
        getSubParameterIdByNameByOrganization(organizationId, 'Transaction Update Type', 'Input')
        const calculationUpdateType = await 
        
        getSubParameterIdByNameByOrganization(organizationId, 'Transaction Update Type', 'Calculation')
        const notEditableType = await 
        
        getSubParameterIdByNameByOrganization(organizationId, 'Transaction Update Type', 'Not Editable')

        const absenceTransactionGroup = await 
        
        getSubParameterIdByNameByOrganization(organizationId, 'Transaction Group', 'Absence')
        const membershipTransactionGroup = await 
        
        getSubParameterIdByNameByOrganization(organizationId, 'Transaction Group', 'Membership')
        const loanTransactionGroup = await 
        
        getSubParameterIdByNameByOrganization(organizationId, 'Transaction Group', 'Loan')
        const naTransactionGroup = await 
        
        getSubParameterIdByNameByOrganization(organizationId, 'Transaction Group', 'NA')

        for (const transaction of defaultTransactions) {
            try {
                const {
                    transactionCode,
                    transactionName,
                    shortName,
                    permanent,
                    taxable,
                    unTaxableLimit,
                    affectByLeave,
                    leaveDays,
                    affectBackPayroll,
                    affectBeneficiary,
                    glEntryBy,
                    directAccount,
                    contractGlAccount
                } = transaction;
    
                let refactoredTransactionType;
                let refactoredUpdateType;
                let refactoredTransactionGroup
    
                switch (transaction.transactionType) {
                    case 'Deduction Amount':
                        refactoredTransactionType = deductionAmountTransactionType;
                        break;
                    case 'Deduction Quantity':
                        refactoredTransactionType = deductionQuantityTransactionType;
                        break;
                    case 'Earning Amount':
                        refactoredTransactionType = earningAmountTransactionType;
                        break;
                    case 'Earning Quantity':
                        refactoredTransactionType = earningQuantityTransactionType;
                        break;
                    case 'NA':
                        refactoredTransactionType = naTransactionType;
                        break;
                    default:
                        refactoredTransactionType = '';
                }
    
                switch (transaction.updateType) {
                    case 'Input':
                        refactoredUpdateType = inputUpdateType;
                        break;
                    case 'Calculation':
                        refactoredUpdateType = calculationUpdateType;
                        break;
                    case 'Not Editable':
                        refactoredUpdateType = notEditableType;
                        break;
                    default:
                        refactoredUpdateType = '';
                }
    
                switch (transaction.transactionGroup) {
                    case 'Absence':
                        refactoredTransactionGroup = absenceTransactionGroup;
                        break;
                    case 'Membership':
                        refactoredTransactionGroup = membershipTransactionGroup;
                        break;
                    case 'Loan':
                        refactoredTransactionGroup = loanTransactionGroup;
                        break;
                    case 'NA':
                        refactoredTransactionGroup = naTransactionGroup;
                        break;
                    default:
                        refactoredTransactionGroup = '';
                }
    
                const query = `INSERT INTO transaction_definition (id, organization_id, branch_id, transaction_code, transaction_name, short_name, transaction_type, update_type, permanent, taxable, un_taxable_limit, affect_by_leave, leave_days, affect_back_payroll, affect_beneficiary, transaction_group, gl_entry_by, direct_account, contract_gl_account)
                             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`;
                await pool.query(query, [uuid(), organizationId, branchId, transactionCode, transactionName, shortName, refactoredTransactionType, refactoredUpdateType, permanent, taxable, unTaxableLimit, affectByLeave, leaveDays, affectBackPayroll, affectBeneficiary, refactoredTransactionGroup, glEntryBy, directAccount, contractGlAccount]);
            } catch(error) {
                console.log(transaction)
                console.error(error)
            }
            
        }
    } catch (err) {
        console.log(err)
    }

}


export default setupTransactionDefinitions
