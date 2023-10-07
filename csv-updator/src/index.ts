// import pool from './config/pool'
// import processBranchCSV from './tableUpdator/branch';
// import processDepartmentCSV from './tableUpdator/department'
// import processTransactionDefinitionCSV from './tableUpdator/transactionDefinition'
import processEmployeeCSV from './tableUpdator/employee'

import processPayTransactionCSV from './tableUpdator/payTransaction'

import processLoanTransactionCSV from './tableUpdator/loanTransaction'



const setupProcess = async () => {
    try {
        const organizationId = '10241155-f3c4-4819-827c-02cca0c48693'

        // await processBranchCSV(organizationId, './data/branch.csv')
        // console.log("Branches Added")
        // await processDepartmentCSV(organizationId,'./data/department.csv')
        // console.log("Departments Added")
        // // // const transacctionDefs = await processTransactionDefinitionCSV('./data/transactiondefs.csv')
        await processEmployeeCSV(organizationId, './data/employee.csv')
        console.log("Employees Added")

        await processLoanTransactionCSV(organizationId, './data/loanTransactions.csv')

        await processPayTransactionCSV(organizationId, './data/payTransactions.csv')

    } catch (error) {
        console.log(error)

    } finally {

    }
}

setupProcess()