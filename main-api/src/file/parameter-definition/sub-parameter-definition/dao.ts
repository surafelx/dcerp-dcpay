import pool from '../../../config/pool'
import { v4 as uuid } from 'uuid'


export const create = async (newMainParameterDefinition: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        parameterName,
        parameterId
    } = newMainParameterDefinition
    const query = `
	INSERT INTO 
        parameter_definition 
        (
            id,
            organization_id,
            parameter_name,
            parent_parameter_id
            ) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        parameterName,
        parameterId
    ])
    const mainParameterDefinition = res.rows[0]
    return mainParameterDefinition
}


export const getAllFromOrganization = async (organizationId: string, parameterId: any): Promise<any> => {
    let query = `
    SELECT c.id, c.parent_parameter_id as parameter_id, c.parameter_name AS sub_parameter_name, p.parameter_name AS main_parameter_name
    FROM parameter_definition c
    JOIN parameter_definition p ON c.parent_parameter_id = p.id
    WHERE c.organization_id = $1 `;

    const queryParams = [organizationId];

    if (parameterId) {
        query += ` AND (c.parent_parameter_id = $2 OR $2 IS NULL);`;
        queryParams.push(parameterId);
    }

    const { rows: departments } = await pool.query(query, queryParams);
    return departments;
}



export const deleteMainParameterDefinition = async (mainParameterDefinitionId: string): Promise<any> => {
    await pool.query('DELETE FROM parameter_definition WHERE id=$1', [mainParameterDefinitionId])
}


export const updateMainParameterDefinition = async (updatedMainParameterDefinition: any): Promise<string> => {
    const {
        id,
        parameterName
    } = updatedMainParameterDefinition
    const query = `
    UPDATE parameter_definition
    SET parameter_name = $1
    WHERE id = $2
    RETURNING *;
    `
    const res = await pool.query(query, [
        parameterName,
        id])
    const mainParameterDefinitionId = res.rows[0]
    return mainParameterDefinitionId
}

export const parameterIsParent = async ([parameterId]: any): Promise<boolean> => {
    const { rows: res } = await pool.query(
        'select exists(select 1 from parameter_definition] where parent_parameter_id=$1)',
        [[parameterId]])
    return res[0].exists
}


export default {
    create,
    deleteMainParameterDefinition,
    getAllFromOrganization,
    parameterIsParent,
    updateMainParameterDefinition
}