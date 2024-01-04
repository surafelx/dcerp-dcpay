import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'
import parameterDefinitionService from '../parameter-definition/service'


export const create = async (newTransactionDefinition: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        branchId,
        transactionCode,
        transactionName,
        shortName,
        transactionType,
        updateType,
        permanent,
        taxable,
        unTaxableLimit,
        affectByLeave,
        leaveDays,
        affectBackPayroll,
        affectBeneficiary,
        transactionGroup,
        glEntryBy,
        directAccount,
        contractGLAccount

    } = newTransactionDefinition
    const query = `
	INSERT INTO 
        transaction_definition 
        (
            id,
            organization_id,
            branch_id,
            transaction_code,
            transaction_name,
            short_name,
            transaction_type,
            update_type,
            permanent,
            taxable,
            un_taxable_limit,
            affect_by_leave,
            leave_days,
            affect_back_payroll,
            affect_beneficiary,
            transaction_group,
            gl_entry_by,
            direct_account,
            contract_gl_account
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        branchId,
        transactionCode,
        transactionName,
        shortName,
        transactionType,
        updateType,
        permanent || false,
        taxable || false,
        unTaxableLimit,
        affectByLeave || false,
        leaveDays,
        affectBackPayroll || false,
        affectBeneficiary || false,
        transactionGroup,
        glEntryBy,
        directAccount,
        contractGLAccount
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: employees } = await pool.query(`
    SELECT 
    transaction_definition.id,
    transaction_definition.organization_id,
    transaction_definition.branch_id,
    transaction_definition.transaction_code,
    transaction_definition.transaction_name,
    transaction_definition.short_name,
    transaction_definition.transaction_type,
    transaction_definition.update_type,
    transaction_definition.permanent,
    transaction_definition.taxable,
    transaction_definition.un_taxable_limit,
    transaction_definition.affect_by_leave,
    transaction_definition.leave_days,
    transaction_definition.affect_back_payroll,
    transaction_definition.affect_beneficiary,
    transaction_definition.transaction_group,
    transaction_definition.gl_entry_by,
    transaction_definition.direct_account,
    transaction_definition.contract_gl_account,
    pd1.parameter_name as transaction_type_name,
    pd2.parameter_name as transaction_group_name,
    pd3.parameter_name as update_type_name
    FROM transaction_definition
    INNER JOIN parameter_definition pd1 ON transaction_definition.transaction_type = pd1.id
    INNER JOIN parameter_definition pd2 ON transaction_definition.transaction_group = pd2.id
    INNER JOIN parameter_definition pd3 ON transaction_definition.update_type = pd3.id
    WHERE transaction_definition.organization_id=$1
    ORDER BY CAST(transaction_definition.transaction_code AS NUMERIC) ASC`,
        [organizationId])
    return employees
}


export const getInfo = async (transactionId: string): Promise<any> => {
    const { rows: employees } = await pool.query(`
    SELECT 
    transaction_definition.id,
    transaction_definition.organization_id,
    transaction_definition.branch_id,
    transaction_definition.transaction_code,
    transaction_definition.transaction_name,
    transaction_definition.short_name,
    transaction_definition.transaction_type,
    transaction_definition.update_type,
    transaction_definition.permanent,
    transaction_definition.taxable,
    transaction_definition.un_taxable_limit,
    transaction_definition.affect_by_leave,
    transaction_definition.leave_days,
    transaction_definition.affect_back_payroll,
    transaction_definition.affect_beneficiary,
    transaction_definition.transaction_group,
    transaction_definition.gl_entry_by,
    transaction_definition.direct_account,
    transaction_definition.contract_gl_account,
    pd1.parameter_name as transaction_type_name,
    pd2.parameter_name as transaction_group_name,
    pd3.parameter_name as update_type_name
    FROM transaction_definition
    INNER JOIN parameter_definition pd1 ON transaction_definition.transaction_type = pd1.id
    INNER JOIN parameter_definition pd2 ON transaction_definition.transaction_group = pd2.id
    INNER JOIN parameter_definition pd3 ON transaction_definition.update_type = pd3.id
    WHERE transaction_definition.id=$1
    ORDER BY CAST(transaction_definition.transaction_code AS NUMERIC) ASC`,
        [transactionId])
    return employees
}


export const getByNameAndOrganization = async (organizationId: string, transactionName: string) => {
    const { rows: employees } = await pool.query(`
    SELECT 
    transaction_definition.id,
    transaction_definition.organization_id,
    transaction_definition.branch_id,
    transaction_definition.transaction_code,
    transaction_definition.transaction_name,
    transaction_definition.short_name,
    transaction_definition.transaction_type,
    transaction_definition.update_type,
    transaction_definition.permanent,
    transaction_definition.taxable,
    transaction_definition.un_taxable_limit,
    transaction_definition.affect_by_leave,
    transaction_definition.leave_days,
    transaction_definition.affect_back_payroll,
    transaction_definition.affect_beneficiary,
    transaction_definition.transaction_group,
    transaction_definition.gl_entry_by,
    transaction_definition.direct_account,
    transaction_definition.contract_gl_account,
    pd1.parameter_name as transaction_type_name,
    pd2.parameter_name as transaction_group_name,
    pd3.parameter_name as update_type_name
    FROM transaction_definition
    INNER JOIN parameter_definition pd1 ON transaction_definition.transaction_type = pd1.id
    INNER JOIN parameter_definition pd2 ON transaction_definition.transaction_group = pd2.id
    INNER JOIN parameter_definition pd3 ON transaction_definition.update_type = pd3.id
    WHERE transaction_definition.organization_id=$1 AND
    transaction_definition.transaction_name = $2`,
        [organizationId, transactionName])
    return employees[0]
}


export const deleteTransactionDefinition = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM transaction_definition WHERE id=$1', [branchId])
}


export const updateTransactionDefinition = async (updatedTransactionDefinition: any): Promise<string> => {
    const {
        id,
        transactionCode,
        transactionName,
        shortName,
        transactionType,
        updateType,
        permanent,
        taxable,
        unTaxableLimit,
        affectByLeave,
        leaveDays,
        affectBackPayroll,
        affectBeneficiary,
        transactionGroup,
        glEntryBy,
        directAccount,
        contractGLAccount
    } = updatedTransactionDefinition
    const query = `
    UPDATE transaction_definition
    SET 
    transaction_code = $1,
    transaction_name = $2,
    short_name = $3,
    transaction_type = $4,
    update_type = $5,
    permanent = $6,
    taxable = $7,
    un_taxable_limit = $8,
    affect_by_leave = $9,
    leave_days = $10,
    affect_back_payroll = $11,
    affect_beneficiary = $12,
    transaction_group = $13,
    gl_entry_by = $14,
    direct_account = $15,
    contract_gl_account = $16
    WHERE id = $17
    RETURNING *;
    `
    const res = await pool.query(query, [
        transactionCode,
        transactionName,
        shortName,
        transactionType,
        updateType,
        permanent,
        taxable,
        unTaxableLimit,
        affectByLeave,
        leaveDays,
        affectBackPayroll,
        affectBeneficiary,
        transactionGroup,
        glEntryBy,
        directAccount,
        contractGLAccount,
        id])
    return res.rows[0]
}


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
        transactionCode: '19',
        transactionName: 'Indeminity Allowance',
        shortName: 'Indeminity All',
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
        transactionName: 'Transport Allowance',
        shortName: 'Transport All',
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
        transactionName: 'Housing Allowance',
        shortName: 'Housing All',
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
        transactionCode: '18',
        transactionName: 'Position Allowance',
        shortName: 'Position All',
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
        transactionName: 'Holiday Bonus',
        shortName: 'Holiday Bonus',
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
        transactionName: 'Club',
        shortName: 'Club',
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

    // {
    //     transactionCode: '28',
    //     transactionName: 'Provident Fund Rate',
    //     shortName: 'Provident Rate',
    //     transactionType: 'Deduction Quantity',
    //     updateType: 'Input',
    //     permanent: false,
    //     taxable: true,
    //     unTaxableLimit: '',
    //     affectByLeave: false,
    //     leaveDays: '',
    //     affectBackPayroll: false,
    //     affectBeneficiary: false,
    //     transactionGroup: 'NA',
    //     glEntryBy: '',
    //     directAccount: '',
    //     contractGlAccount: ''
    // },
    // {
    //     transactionCode: '29',
    //     transactionName: 'Provident Fund Amount',
    //     shortName: 'Provident Amt',
    //     transactionType: 'Deduction Amount',
    //     updateType: 'Calculation',
    //     permanent: false,
    //     taxable: true,
    //     unTaxableLimit: '',
    //     affectByLeave: false,
    //     leaveDays: '',
    //     affectBackPayroll: false,
    //     affectBeneficiary: false,
    //     transactionGroup: 'NA',
    //     glEntryBy: '',
    //     directAccount: '',
    //     contractGlAccount: ''
    // },
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
        transactionName: 'Credit Association Loan',
        shortName: 'Cr.As.Loan',
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
        transactionName: 'Other Contribution',
        shortName: 'Other Contribution',
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
        transactionName: 'Credit Ass. Volunteer Saving Rate',
        shortName: 'CAVSR',
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
        transactionName: 'Credit Ass. Volunteer Saving Amount',
        shortName: 'CAVSA',
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
        transactionName: 'Net pay',
        shortName: 'Net pay',
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


];


const setupApp = async (organizationId: any, branchId: any) => {

    try {
        const deductionAmountTransactionType = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Type', 'Deduction Amount')
        const deductionQuantityTransactionType = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Type', 'Deduction Quantity')
        const earningAmountTransactionType = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Type', 'Earning Amount')
        const earningQuantityTransactionType = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Type', 'Earning Quantity')
        const naTransactionType = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Type', 'NA')

        const inputUpdateType = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Update Type', 'Input')
        const calculationUpdateType = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Update Type', 'Calculation')
        const notEditableType = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Update Type', 'Not Editable')

        const absenceTransactionGroup = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Group', 'Absence')
        const membershipTransactionGroup = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Group', 'Membership')
        const loanTransactionGroup = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Group', 'Loan')
        const naTransactionGroup = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Group', 'NA')

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
            } catch (error) {
                console.error(error)
            }

        }
    } catch (err) {
        console.log(err)
    }

}



export const getTransactionDefinitionByNameByOrganization = async (organizationId: string, transactionName: any) => {
    try {
        const tranQuery = `
    SELECT 
    transaction_definition.id,
    transaction_definition.organization_id,
    transaction_definition.transaction_code,
    transaction_definition.transaction_name
    FROM transaction_definition
    WHERE 
    transaction_definition.organization_id=$1 AND 
    transaction_definition.transaction_name=$2
   `
        const { rows: transactions } = await pool.query(tranQuery,
            [organizationId, transactionName])
        return transactions[0].id
    } catch (error) {
        console.log(error)
    }

}



export const parameterDefinitionExists = async (parameterId: any): Promise<boolean> => {
    const { rows: res } = await pool.query(
        'SELECT EXISTS(SELECT 1 FROM transaction_definition WHERE transaction_type = $1 OR update_type = $1 OR transaction_group = $1)',
        [[parameterId]])
    return res[0].exists
}

export default {
    create,
    deleteTransactionDefinition,
    getAllFromOrganization,
    getInfo,
    parameterDefinitionExists,
    getByNameAndOrganization,
    getAllFromTransactionGroup,
    updateTransactionDefinition,
    getTransactionDefinitionByNameByOrganization,
    setupApp
}