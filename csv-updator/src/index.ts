// import processBranchCSV from './tableUpdator/branch';
// import processDepartmentCSV from './tableUpdator/department'
// import processEmployeeCSV from './tableUpdator/employee'
import processPayTransactionCSV from './tableUpdator/payTransaction'
import processLoanTransactionCSV from './tableUpdator/loanTransaction'



const setupProcess = async () => {
    try {
        const organizationId = '8a953cb1-3151-4d19-92b6-74df4790e3ae'

        // await processBranchCSV(organizationId, './data/branch.csv')
        // console.log("Branches Added")
        // await processDepartmentCSV(organizationId,'./data/department.csv')
        // console.log("Departments Added")
        // await processEmployeeCSV(organizationId, './data/employee.csv')
        // console.log("Employees Added")
        await processLoanTransactionCSV(organizationId, './data/loanTransactions.csv')
        console.log("Loan Transactions Added")
        await processPayTransactionCSV(organizationId, './data/paytransactions2.csv')
        console.log("Pay Transactions Added")
    } catch (error) {
        console.log(error)

    } 
}

setupProcess()