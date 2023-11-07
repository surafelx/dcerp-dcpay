import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

const defaultParameters = [
    { parentParameter: 'Sex', parameters: ['Male', 'Female'] },
    { parentParameter: 'Employee Status', parameters: ['Active', 'Suspended', 'Terminated'] },
    { parentParameter: 'Employee Type', parameters: ['Permanent', 'Contract'] },
    { parentParameter: 'Employee Title', parameters: ['Dr.', 'Mr.', 'Ms.'] },
    { parentParameter: 'Bank', parameters: ['CBE', 'NA', 'NIB', 'Zemen'] },
    { parentParameter: 'Employee Department', parameters: ['Human Resources'] },
    { parentParameter: 'Employee Position', parameters: ['Executive', 'Employee', 'Manager'] },
    { parentParameter: 'Transaction Type', parameters: ['Earning Amount', 'Earning Quantity', 'Deduction Amount', 'Deduction Quantity', 'NA'] },
    { parentParameter: 'Transaction Group', parameters: ['Loan', 'Absence', 'Membership', 'NA'] },
    { parentParameter: 'Calculation Unit', parameters: ['Hourly', 'Monthly', 'Daily'] },
    { parentParameter: 'Transaction Calculation', parameters: ['*', '='] },
    { parentParameter: 'Transaction Update Type', parameters: ['Input', 'Calculation', 'Not Editable'] },
];


const setupApp = async (organizationId: any) => {
    for (const parameter of defaultParameters) {
        const parentId = uuid();
        const parentQuery = `INSERT INTO parameter_definition (id, organization_id, parameter_name) VALUES ($1, $2, $3);`;
        await pool.query(parentQuery, [parentId, organizationId, parameter.parentParameter])
        if (parameter.parameters && parameter.parameters.length > 0) {
            for (const value of parameter.parameters) {
                const childId = uuid();
                const childQuery = `INSERT INTO parameter_definition (id, organization_id, parameter_name, parent_parameter_id) VALUES ($1, $2, $3, $4);`;
                await pool.query(childQuery, [childId, organizationId, value, parentId])
            }
        }
    }
}


export const getSubParameterIdByName = async (parentParameterName: string, parameterName: string): Promise<any> => {
    const { rows: parameterQueryResponse } = await pool.query(`
    SELECT pd.id
    FROM parameter_definition pd
    INNER JOIN parameter_definition parent_pd ON pd.parent_parameter_id = parent_pd.id
    WHERE parent_pd.parameter_name = $1
    AND pd.parameter_name = $2;

    `, [parentParameterName, parameterName])
    return parameterQueryResponse[0].id
}


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




export default {
    getSubParameterIdByName,
    getSubParameterIdByNameByOrganization,
    setupApp,
}