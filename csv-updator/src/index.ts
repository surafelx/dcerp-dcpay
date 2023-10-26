import processBranchCSV from './tableUpdator/branch';
import processDepartmentCSV from './tableUpdator/department'
import processEmployeeCSV from './tableUpdator/employee'
import processLoanTransactionCSV from './tableUpdator/loanTransaction'
import processPayTransactionCSV from './tableUpdator/payTransaction'




const setupProcess = async () => {
    try {
        const organizationId = 'ac65167a-6f50-4e78-ae19-43e5bb1c0608'
        const userId = '8e874e4a-519c-442d-8dc4-7170170dc6ef'
        const periodId = '8fcd3f81-ee48-4314-9bbf-af21f153d2e4'
        
        const userInfo = {organizationId, userId, periodId}

        const branches = await processBranchCSV(organizationId, './data/branch.csv')
        console.log(branches.length, "Branches Added")
        const departments = await processDepartmentCSV(organizationId,'./data/department.csv')
        console.log(departments.length, "Departments Added")
        const employees = await processEmployeeCSV(organizationId, './data/employee.csv', userInfo)
        console.log(employees.length, "Employees Added")
        const loanTransactions = await processLoanTransactionCSV(organizationId, './data/loantransactions2.csv', userInfo)
        console.log(loanTransactions.length, "Loan Transactions Added")
        const payTransactions = await processPayTransactionCSV(organizationId, './data/processedtransactions.csv', userInfo)
        console.log(payTransactions.length, "Pay Transactions Added")

        //  const advances = await processPayTransactionCSV(organizationId, './data/advance.csv', userInfo)
        // console.log(advances.length, "Absence and Advance Transactions Added")
    } catch (error) {
        console.log(error)

    } 
}

setupProcess()