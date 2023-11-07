const fs = require('fs');
import pool from '../config/pool'
import { v4 as uuid } from 'uuid'
import csv from 'csv-parser';
import moment from 'moment'

const ADMINSTRATIVE_BRANCH = '1'
const DISTRIBUTION_BRANCH = '2'
const MEMBERSHIP_OFFICE_BRANCH = '3'
const TRANSLATION_OFFICE = '4'
const FCBH_BRANCH = '5'
const COMPREHENSIVE_PLAN_WEELIFE_BRANCH = '6'
const COMPREHENSIVE_PLAN_SEED_CO_BRANCH = '7'
const GOOD_SAMARITIAN_PROJECT_CANADA_BRANCH = '8'
const PROJECT_CHURCH_RELATION_BRANCH = '9'
const PENSION_BRANCH = '10'
const GOOD_SAMARITIAN_PROJECT_NORWAY_BRANCH = '11'


const CHATOLIC_DEPARTMENT = '71'
const BALE_DEPARTMENT = '210'
const GENERAL_SECRETARY_OFFICE_DEPARTMENT = '11'
const FINANCE_OFFICE_DEPARTMENT = '12'
const HUMAN_RESOURCE_DEPARTMENT = '13'
const DISTRIBUTION_OFFICE_BRANCH = '21'
const ADAMA_BRANCH_DEPARTMENT = '22'
const AWASSA_BRANCH_DEPARTMENT = '23'
const DDAWA_DEPARTMENT = '24'
const BDAR_BRANCH_DEPARTMENT = '25'
const JUMMA_BRANCH_DEPARTMENT = '26'
const MEKELE_BRANCH_DEPARTMENT = '27'
const DESSIE_BRANCH_DEPARTMENT = '28'
const NEKEMTE_BRANCH_DEPARTMENT = '29'
const MEMBERSHIP_OFFICE_BRANCH_DEPARTMENT = '31'
const TRANSITION_OFFICE_DEPARTMENT = '41'
const EAST_OROMO_GERMANY_DEPARTMENT = '42'
const AMHARIC_STUDY_BIBLE_DEPARTMNET = '43'
const OROMO_BIBLE_REVISION_DEPARTMENT = '44'
const HADIYA_PROJECT_DEPARTMENT = '45'
const GEEZ_TRANSLATION_DEPARTMENT = '46'
const FCBH_DEPARTMENT = '51'
const EAST_OROMO_DEPARTMENT = '61'
const KISTENA_PROJECT_DEPARTMENT = '62'
const CP_OFFICE_DEPARTMENT = '63'
const GUMUZ_DEPARTMENT = '72'
const TAMTANGA_DEPARTMENT = '73'
const SAHO_DEPARTMENT = '74'
const GS_ADAMA_DEPARTMENT = '81'
const GS_DESSIE_BRANCH_DEPARTMENT = '82'
const PROJECT_CHURCH_RELATION_DEPARTMENT = '91'
const PENSION_DEPARTMENT = '101'
const GODD_SAMARITAN_NORWAY_DEPARTMNET = '111'


const MANAGEMENT_POSITION = '4001'
const EMPLOYEE_POSITION = '4002'

const MALE_SEX = '1002'
const FEMALE_SEX = '1001'

const PERMANENT_TYPE = '2001'
const CONTRACT_TYPE = '2002'

const ACTIVE_STATUS = '14001'
const SUSPENDED_STATUS = '14002'
const TERMINATED_STATUS = '14003'

const BANK_NIB = '15001'
const BANK_ZEMEN = '15002'
const BANK_CBE = '15003'
const BANK_NA = '0'



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

export const createPT = async (newMenu: any, periodId: any): Promise<any> => {
    const id = uuid()
    const {
        employeeId,
        organizationId,
        transactionId,
        transactionAmount
    } = newMenu
    const query = `
	INSERT INTO 
        pay_transaction 
        (
            id,
            employee_id,
            organization_id,
            transaction_id,
            period_id,
            transaction_amount 
            ) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        employeeId,
        organizationId,
        transactionId,
        periodId,
        transactionAmount
    ])
    return res.rows[0]
}



export const createPayTransaction = async (employee: any, periodId: any) => {
    const basicSalaryId = await getByNameAndOrganization(employee.organizationId, 'Basic Salary')
    const calculatedSalary = employee.workingDays == 0 ? employee.basicSalary : (employee.basicSalary * employee.workingDays) / 30
    await createPT({ organizationId: employee.organizationId, employeeId: employee.id, transactionId: basicSalaryId.id, transactionAmount: calculatedSalary }, periodId)
}

export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        employeeCode,
        employeeTitle,
        contractStartDate,
        contractEndDate,
        employmentDate,
        firstName,
        middleName,
        lastName,
        sex,
        employeeStatus,
        employeeType,
        monthlyWorkingHours,
        pensionStatus,
        pensionNumber,
        tinNumber,
        workingDays,
        employeeBank,
        employeeBankAccount,
        employeeBranch,
        employeeDepartment,
        employeePosition

    } = newMenu
    const refactoredEmpDate = !employmentDate ? null : new Date(employmentDate)
    const refactoredContEnd = !contractEndDate ? null : new Date(contractEndDate)
    const refactoredContStart = !contractStartDate ? null : new Date(contractStartDate)
    const employeePensionStatus = pensionStatus == '1' ? true : false
    const query = `
	INSERT INTO 
        employee 
        (
            id,
            organization_id,
            branch_id,
            department_id,
            employee_code,
            employee_title,
            first_name,
            middle_name,
            last_name,
            sex,
            employee_status,
            employee_type,
            employment_date, 
            contract_start_date,
            contract_end_date,
            monthly_working_hours,
            pension_status,
            pension_number,
            employee_bank,
            employee_account_number,
            tin_number,
            working_days,
            employee_position
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        employeeBranch,
        employeeDepartment,
        employeeCode,
        employeeTitle,
        firstName,
        middleName,
        lastName,
        sex,
        employeeStatus,
        employeeType,
        refactoredEmpDate,
        refactoredContStart,
        refactoredContEnd,
        monthlyWorkingHours,
        employeePensionStatus,
        pensionNumber,
        employeeBank,
        employeeBankAccount,
        tinNumber,
        workingDays,
        employeePosition
    ])
    const branch = res.rows[0]
    return branch
}


export const getBranchByOrganizationByName = async (organizationId: any, branchName: any): Promise<any> => {

    const query = `
	SELECT
        *
    FROM 
    branch WHERE
    organization_id = $1 AND
    branch_name= $2
    `
    const res = await pool.query(query, [
        organizationId,
        branchName
    ])
    const branch = res.rows[0]
    return branch
}

export const getDepartmentByOrganizationByName = async (organizationId: any, branchName: any): Promise<any> => {

    const query = `
	SELECT
        *
    FROM 
    department WHERE
    organization_id = $1 AND
    department_name= $2
    `
    const res = await pool.query(query, [
        organizationId,
        branchName
    ])
    const branch = res.rows[0]
    return branch
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



const processCSV = async (organizationId: any, csvFile: any, userInfo: any) => {
    try {
        const resultArray: any = [];
        const { periodId } = userInfo

        // Define your conditions for each column here
        const processRow = (row: any) => {

            const employeeCode = row['Empcode'];
            const empGender = row['EmpGender'];
            const empType = row['EmpType'];
            const empStatus = row['EmpStatus'];
            const empContStart = row['EmpContstartDate']
            const empContEnd = row['EmpContEndDate']
            const empDate = row['EmpDate']
            const workingDays = row['EmpMonthlyWrdays']
            const monthlyWorkingHours = row['EmpMonthlyWrHours']
            const tinNumber = row['EmpTINNO']
            const branchCode = row['EmpBranch']
            const departmentCode = row['Empdepartment']
            const empPosition = row['EmpPosition']
            const basicSalary = row['EmpBasicSalary']
            const firstName = row['Empname']
            const middleName = ''
            const lastName = ''
            const pensionNumber = row['Emppensionno']
            const pensionStatus = row['EmpPension']
            const accountNo = row['EmpAccountNo']
            const bankName = row['EmpBankname']


            const employee = {
                employeeCode,
                empGender,
                empType,
                empStatus,
                contractStartDate: !empContStart ? null : moment(empContStart, 'MM/DD/YYYY'),
                contractEndDate: !empContEnd ? null : moment(empContStart, 'MM/DD/YYYY'),
                employmentDate: !empDate ? null : moment(empContStart, 'MM/DD/YYYY'),
                workingDays,
                tinNumber,
                branchCode,
                departmentCode,
                empPosition,
                monthlyWorkingHours,
                pensionStatus,
                basicSalary,
                firstName,
                middleName,
                lastName,
                pensionNumber,
                accountNo,
                bankName
            };
            resultArray.push(employee);
        };


        const fileStream = await fs.createReadStream(csvFile);

        await new Promise((resolve: any, reject: any) => {
            fileStream
                .pipe(csv())
                .on('data', (row: any) => {
                    processRow(row);
                })
                .on('end', async () => {

                    for (const employee of resultArray) {

                        try {


                            if (employee.branchCode == ADMINSTRATIVE_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Administration');
                                employee.employeeBranch = branch.id;
                            }
                            if (employee.branchCode == DISTRIBUTION_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Distribution');
                                employee.employeeBranch = branch.id;
                            }
                            if (employee.branchCode == MEMBERSHIP_OFFICE_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Membership office');
                                employee.employeeBranch = branch.id;
                            }
                            if (employee.branchCode == TRANSLATION_OFFICE) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Translation');
                                employee.employeeBranch = branch.id;
                            }
                            if (employee.branchCode == FCBH_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'FCBH');
                                employee.employeeBranch = branch.id;
                            }
                            if (employee.branchCode == COMPREHENSIVE_PLAN_WEELIFE_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Comprensive Plan-Weeclife');
                                employee.employeeBranch = branch.id;
                            }
                            if (employee.branchCode == COMPREHENSIVE_PLAN_SEED_CO_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Comprensive Plan-Seed Co');
                                employee.employeeBranch = branch.id;
                            }
                            if (employee.branchCode == GOOD_SAMARITIAN_PROJECT_CANADA_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Good Samaritan project-Canada');
                                employee.employeeBranch = branch.id;
                            }
                            
                            if (employee.branchCode == PROJECT_CHURCH_RELATION_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Project -Church Relation');
                                employee.employeeBranch = branch.id;
                            }
                            if (employee.branchCode == PENSION_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Pension');
                                employee.employeeBranch = branch.id;
                            }
                            if (employee.branchCode == GOOD_SAMARITIAN_PROJECT_NORWAY_BRANCH) {
                                const branch = await getBranchByOrganizationByName(organizationId, 'Good samaritan-Norway');
                                employee.employeeBranch = branch.id;
                            }



                          
                            if (employee.departmentCode == CHATOLIC_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Chatolic')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == BALE_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Bale Branch')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == GENERAL_SECRETARY_OFFICE_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'General Secretery office')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == FINANCE_OFFICE_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Finance Office')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == HUMAN_RESOURCE_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Human resource')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == DISTRIBUTION_OFFICE_BRANCH) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'DISTRIBUTION OFFICE')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == ADAMA_BRANCH_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Adama Branch')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == AWASSA_BRANCH_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Awassa Branch')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == DDAWA_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'D/Dawa Branch')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == BDAR_BRANCH_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'B/dar Branch')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == JUMMA_BRANCH_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Jimma Branch')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == MEKELE_BRANCH_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Mekele Branch')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == DESSIE_BRANCH_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Dessie Branch')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == NEKEMTE_BRANCH_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Nekemete  Branch')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == MEMBERSHIP_OFFICE_BRANCH_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Membership office')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == TRANSITION_OFFICE_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Transltion office')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == EAST_OROMO_GERMANY_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'East Oromo-Germeny')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == AMHARIC_STUDY_BIBLE_DEPARTMNET) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Amahric study bible')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == OROMO_BIBLE_REVISION_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Oromo Bible Revision')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == HADIYA_PROJECT_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Haddiya Project')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == GEEZ_TRANSLATION_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Geez Translation')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == FCBH_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'FCBH')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == EAST_OROMO_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'East Oromo')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == KISTENA_PROJECT_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Kistena Project')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == CP_OFFICE_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'CP Office')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == GUMUZ_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Gumuz')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == TAMTANGA_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Tamtanga')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == SAHO_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Saho')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == GS_ADAMA_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'GS Adama')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == GS_DESSIE_BRANCH_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'GS Dessie Branch')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == PROJECT_CHURCH_RELATION_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Project -Church Relation')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == PENSION_DEPARTMENT) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Pension')
                                employee.employeeDepartment = department.id
                            }
                            if (employee.departmentCode == GODD_SAMARITAN_NORWAY_DEPARTMNET) {
                                const department = await getDepartmentByOrganizationByName(organizationId, 'Good samaritan-Norway')
                                employee.employeeDepartment = department.id
                            }


                            if (employee.empStatus == ACTIVE_STATUS) {
                                const employeeStatusParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Status', 'Active')

                                employee.employeeStatus = employeeStatusParameter
                            }
                            if (employee.empStatus == SUSPENDED_STATUS) {
                                const employeeStatusParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Status', 'Suspended')
                                employee.employeeStatus = employeeStatusParameter
                            }
                            if (employee.empStatus == TERMINATED_STATUS) {
                                const employeeStatusParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Status', 'Terminated')
                                employee.employeeStatus = employeeStatusParameter
                            }

                            if (employee.empType == PERMANENT_TYPE) {
                                const employeeTypeParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Type', 'Permanent')
                                employee.employeeType = employeeTypeParameter
                            }
                            if (employee.empType == CONTRACT_TYPE) {
                                const employeeTypeParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Type', 'Contract')
                                employee.employeeType = employeeTypeParameter
                            }

                            if (employee.empGender == MALE_SEX) {
                                const employeeGenderParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Sex', 'Male')
                                const employeeTitleParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Title', 'Mr.')
                                employee.sex = employeeGenderParameter
                                employee.employeeTitle = employeeTitleParameter
                            }
                            if (employee.empGender == FEMALE_SEX) {
                                const employeeGenderParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Sex', 'Female')
                                const employeeTitleParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Title', 'Ms.')
                                employee.sex = employeeGenderParameter
                                employee.employeeTitle = employeeTitleParameter

                            }


                            if (employee.empPosition == MANAGEMENT_POSITION) {
                                const employeePositionParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Position', 'Manager')
                                employee.employeePosition = employeePositionParameter
                            }
                            if (employee.empPosition == EMPLOYEE_POSITION) {
                                const employeePositionParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Employee Position', 'Employee')
                                employee.employeePosition = employeePositionParameter
                            }

                            if (employee.bankName == BANK_CBE) {
                                const employeeBankParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Bank', 'CBE')
                                employee.employeeBank = employeeBankParameter
                            }

                            if (employee.bankName == BANK_NIB) {
                                const employeeBankParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Bank', 'NIB')
                                
                                employee.employeeBank = employeeBankParameter
                            }

                            if (employee.bankName == BANK_ZEMEN) {
                                const employeeBankParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Bank', 'Zemen')
                                employee.employeeBank = employeeBankParameter
                            }

                            if (employee.bankName == BANK_NA) {
                                const employeeBankParameter = await getSubParameterIdByNameByOrganization(organizationId, 'Bank', 'NA')
                                employee.employeeBank = employeeBankParameter
                            }

                            employee.employeeBankAccount = employee.accountNo
                            employee.organizationId = organizationId

                            const newEmployee = await create(employee)

                            employee.id = newEmployee.id


                            await createPayTransaction(employee, periodId)

                        } catch (err) {
                            console.log('Error processing row:', err);
                            console.log('Row data:', employee);
                        }
                    }
                    console.log('Processing complete');
                    resolve(); // Resolve the promise when processing is complete.
                });
        });
        return resultArray

    } catch (err) {
        console.log(err)
    }

};

export default processCSV;