import pool from '../config/pool'
import { v4 as uuid } from 'uuid'

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
        firstTransaction: 'Salary', 
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Daily',
        firstOption: '*',
        thirdTransaction: 'Days Worked',
        secondOption: '*',
        rate: '1'
    },
    // {
    //     firstTransaction: 'Transport Allowance', 
    //     secondTransaction: 'Basic Salary',
    //     calculationUnit: 'Monthly',
    //     firstOption: '=',
    //     thirdTransaction: 'Acting Allowance',
    //     secondOption: '=',
    //     rate: '1'
    // },
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
        firstOption: '=',
        thirdTransaction: 'None',
        secondOption: '=',
        rate: '0.11'
    },
    {
        firstTransaction: 'Pension Employee',
        secondTransaction: 'Basic Salary',
        calculationUnit: 'Monthly',
        firstOption: '=',
        thirdTransaction: 'Days Worked',
        secondOption: '*',
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
    // {
    //     firstTransaction: 'Provident Fund EBS Amount',
    //     secondTransaction: 'Basic Salary',
    //     calculationUnit: 'Monthly',
    //     firstOption: '*',
    //     thirdTransaction: 'Provident Fund EBS Rate',
    //     secondOption: '*',
    //     rate: '1'
    // },
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
    } catch(error) {
     console.log(transactionName)
     console.log(error)
    }
    
 }
 

 
const setupTransactionCalculations = async(organizationId: any) => {

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


       const firstTransactionId = await getTransactionDefinitionByNameByOrganization(organizationId, firstTransaction)
       const secondTransactionId = await getTransactionDefinitionByNameByOrganization(organizationId, secondTransaction)
       const thirdTransactionId = await getTransactionDefinitionByNameByOrganization(organizationId, thirdTransaction)
       const calculationUnitId = await getSubParameterIdByNameByOrganization(organizationId, 'Calculation Unit', calculationUnit)
       const firstOptionId = await getSubParameterIdByNameByOrganization(organizationId, 'Transaction Calculation', firstOption)
       const secondOptionId = await getSubParameterIdByNameByOrganization(organizationId, 'Transaction Calculation', secondOption)

        const query = `INSERT INTO transaction_calculation (id, organization_id, first_transaction_id, second_transaction_id, third_transaction_id, calculation_unit, first_option, second_option, rate)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
        await pool.query(query, [uuid(), organizationId, firstTransactionId, secondTransactionId, thirdTransactionId, calculationUnitId, firstOptionId, secondOptionId, rate]);
    }

}

export default setupTransactionCalculations

const organizationId = '6b9cfb01-407f-4d5d-982d-69b215155dca'
const userId = '6c44303f-f6e0-4d69-8114-2a9e639d9d5c'
const periodId = 'ea752ead-faae-4e41-ab0a-b4a3500073ea'
const branchId = 'e17da7c2-fd9a-4bb5-9d82-5202597688c9'