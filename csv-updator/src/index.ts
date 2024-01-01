import processBranchCSV from './ebsTableUpdator/branch';
import processDepartmentCSV from './ebsTableUpdator/department'
import processEmployeeCSV from './ebsTableUpdator/employee'
import processLoanTransactionCSV from './ebsTableUpdator/loanTransaction'
import processPayTransactionCSV from './ebsTableUpdator/payTransaction'
import processTransactionDefinitions from './ebsTableUpdator/transactionDefinition'
import processTransactionCalculations from './ebsTableUpdator/transactionCalculations'




const setupProcess = async () => {
    try {
        const organizationId = '0b8e7dc2-7961-4bbc-aa7a-027faa5b652f'
        const userId = '1c09ada8-db1e-41ec-8f96-89851ff9cbc8'
        const periodId = '50d92bd0-d1f8-4b5c-a76e-f68456397147'
        const branchId = 'c3183b5a-61f5-4363-9ee5-3dae2bf85814'

        const userInfo = { organizationId, userId, periodId }

        const branches = await processBranchCSV(organizationId, './data/ddfc/branch.csv')
        console.log(branches.length, "Branches Added")

        const departments = await processDepartmentCSV(organizationId, './data/ddfc/department.csv')
        console.log(departments.length, "Departments Added")

        await processTransactionDefinitions(organizationId, branchId)
        console.log("Transaction Definitions Added")

        await processTransactionCalculations(organizationId)
        console.log("Transaction Calculations Added")

        const employees = await processEmployeeCSV(organizationId, './data/ddfc/employees.csv', userInfo)
        console.log(employees.length, "Employees Added")

        const loanTransactions = await processLoanTransactionCSV(organizationId, './data/ddfc/loans.csv', userInfo)
        console.log(loanTransactions.length, "Loan Transactions Added")

        const payTransactions = await processPayTransactionCSV(organizationId, './data/ddfc/periodtransactions.csv', userInfo)
        console.log(payTransactions.length, "Pay Transactions Added")

    } catch (error) {
        console.log(error)

    }
}

setupProcess()

