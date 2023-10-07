import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'
import transactionDefinitionService from '../../file/transaction-definition/service'
import parameterDefinitionService from '../../file/parameter-definition/service'

export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        firstTransaction,
        secondTransaction,
        thirdTransaction,
        calculationUnit,
        firstOption,
        secondOption,
        rate
    } = newMenu
    const query = `
	INSERT INTO 
        transaction_calculation 
        (
            id,
            first_transaction_id,
            second_transaction_id,
            third_transaction_id,
            calculation_unit,
            first_option,
            second_option,
            rate
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        firstTransaction,
        secondTransaction,
        thirdTransaction,
        calculationUnit,
        firstOption,
        secondOption,
        rate
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: transactionParameterCalculations } = await pool.query(`
    SELECT 
    tc.id,
    tc.first_transaction_id,
    tc.second_transaction_id,
    tc.third_transaction_id,
    tc.calculation_unit,
    tc.first_option,
    tc.second_option,
    tc.rate,
    td1.transaction_name as first_transaction_name,
    td1.transaction_code as first_transaction_code,
    td2.transaction_name as second_transaction_name,
    td2.transaction_code as second_transaction_code,
    td3.transaction_name as third_transaction_name,
    td3.transaction_code as third_transaction_code,
    pd1.parameter_name as calculation_unit_name,
    pd2.parameter_name as first_option_name,
    pd3.parameter_name as second_option_name
    FROM transaction_calculation tc
    INNER JOIN transaction_definition td1 ON tc.first_transaction_id = td1.id
    INNER JOIN transaction_definition td2 ON tc.first_transaction_id = td2.id
    INNER JOIN transaction_definition td3 ON tc.first_transaction_id = td3.id
    INNER JOIN parameter_definition pd1 ON tc.calculation_unit = pd1.id
    INNER JOIN parameter_definition pd2 ON tc.first_option = pd2.id
    INNER JOIN parameter_definition pd3 ON tc.second_option = pd3.id
    WHERE td1.organization_id=$1`,
        [organizationId])
    return transactionParameterCalculations
}



export const deleteTransactionParameterCalculation = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM transaction_calculation WHERE id=$1', [branchId])
}


export const updateTransactionParameterCalculation = async (updatedTransactionParameterCalculation: any): Promise<string> => {
    const {
        id,
        firstTransaction,
        secondTransaction,
        thirdTransaction,
        calculationUnit,
        firstOption,
        secondOption,
        rate
    } = updatedTransactionParameterCalculation
    const query = `
    UPDATE 
    transaction_calculation
    SET 
    first_transaction_id = $1,
    second_transaction_id = $2,
    third_transaction_id = $3,
    calculation_unit = $4,
    first_option = $5,
    second_option = $6,
    rate = $7
    WHERE id = $8
    RETURNING *;
    `
    const res = await pool.query(query, [
        firstTransaction,
        secondTransaction,
        thirdTransaction,
        calculationUnit,
        firstOption,
        secondOption,
        rate,
        id])
    const branchId = res.rows[0]
    return branchId
}

const defaultTransactionCalculations = [
    {
        firstTransaction: 'Absence Amount', 
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Daily',
        firstOption: '*',
        thirdTransaction: 'Absence Hours',
        secondOption: '*',
        rate: '1'
    },
    {
        firstTransaction: 'Transport Allowance', 
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Monthly',
        firstOption: '=',
        thirdTransaction: 'Acting Allowance',
        secondOption: '=',
        rate: '1'
    },
    {
        firstTransaction: 'Overtime Amount 125%',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Hourly',
        firstOption: '*',
        thirdTransaction: 'Overtime Hours 125%',
        secondOption: '*',
        rate: '1.5'
    },
    {
        firstTransaction: 'Overtime Amount 150%',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Hourly',
        firstOption: '*',
        thirdTransaction: 'Overtime Hours 150%',
        secondOption: '*',
        rate: '1.75'
    },
    {
        firstTransaction: 'Overtime Amount 200%',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Hourly',
        firstOption: '*',
        thirdTransaction: 'Overtime Hours 200%',
        secondOption: '*',
        rate: '2'
    },
    {
        firstTransaction: 'Overtime Amount 250%',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Hourly',
        firstOption: '*',
        thirdTransaction: 'Overtime Hours 250%',
        secondOption: '*',
        rate: '2.5'
    },
    {
        firstTransaction: 'Pension Company',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Monthly',
        firstOption: '*',
        thirdTransaction: 'None',
        secondOption: '=',
        rate: '0.11'
    },
    {
        firstTransaction: 'Pension Employee',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Monthly',
        firstOption: '*',
        thirdTransaction: 'None',
        secondOption: '=',
        rate: '0.07'
    },
    {
        firstTransaction: 'Labour Union',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Monthly',
        firstOption: '*',
        thirdTransaction: 'None',
        secondOption: '=',
        rate: '0.01'
    },
    {
        firstTransaction: 'Club',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Monthly',
        firstOption: '=',
        thirdTransaction: 'None',
        secondOption: '=',
        rate: '10'
    },
    {
        firstTransaction: 'Credit Association Forced Saving',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Monthly',
        firstOption: '*',
        thirdTransaction: 'None',
        secondOption: '=',
        rate: '0.1'
    },
    {
        firstTransaction: 'Provident Fund EBS Amount',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Monthly',
        firstOption: '*',
        thirdTransaction: 'Provident Fund EBS Rate',
        secondOption: '*',
        rate: '1'
    },
    {
        firstTransaction: 'Edir',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Monthly',
        firstOption: '=',
        thirdTransaction: 'None',
        secondOption: '=',
        rate: '10'
    },
    {
        firstTransaction: 'Red Cross',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Monthly',
        firstOption: '=',
        thirdTransaction: 'None',
        secondOption: '=',
        rate: '1'
    },
    {
        firstTransaction: 'Cost Sharing',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Monthly',
        firstOption: '*',
        thirdTransaction: 'None',
        secondOption: '=',
        rate: '0.1'
    },
    

]

const setupApp = async(organizationId: any) => {

    for (const transaction of defaultTransactionCalculations) {
        const {
           firstTransaction,
           secondTransaction,
           calculationUnit,
           firstOption,
           thirdTransaction, 
           secondOption,
           rate
        } = transaction;

       const firstTransactionId = await transactionDefinitionService.getTransactionDefinitionByNameByOrganization(organizationId, firstTransaction)

       const secondTransactionId = await transactionDefinitionService.getTransactionDefinitionByNameByOrganization(organizationId, secondTransaction)
       const thirdTransactionId = await transactionDefinitionService.getTransactionDefinitionByNameByOrganization(organizationId, thirdTransaction)
       const calculationUnitId = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Calculation Unit', calculationUnit)
       const firstOptionId = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Calculation', firstOption)
       const secondOptionId = await parameterDefinitionService.getSubParameterIdByNameByOrganization(organizationId, 'Transaction Calculation', secondOption)

        const query = `INSERT INTO transaction_calculation (id, first_transaction_id, second_transaction_id, third_transaction_id, calculation_unit, first_option, second_option, rate)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
        await pool.query(query, [uuid(), firstTransactionId, secondTransactionId, thirdTransactionId, calculationUnitId, firstOptionId, secondOptionId, rate]);
    }

}



export default {
    create,
    deleteTransactionParameterCalculation,
    getAllFromOrganization,
    updateTransactionParameterCalculation,
    setupApp
}