// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'

// import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'

// ** File - Parameter Definition
import employee from 'src/store/apps/File/EmployeeMaster'

// ** File - Branches
import branches from 'src/store/apps/File/EntityManagement/Branches'

// ** File - Departments
import department from 'src/store/apps/File/EntityManagement/Department'

// ** File - Parameter Definition
import mainParameterDefinition from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import subParameterDefinition from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'

// ** File - Trasaction Definition
import transactionDefinition from 'src/store/apps/File/TransactionDefinition'

// ** File - Period
import periods from 'src/store/apps/File/Period'

// ** Tasks - Loan Transaction
import loanTransaction from 'src/store/apps/Tasks/LoanTransaction'

// ** Tasks - Pay Transaction
import payTransaction from 'src/store/apps/Tasks/PayTransaction'

// ** Tasks - Loan Transaction
import discontinuation from 'src/store/apps/Tasks/Discontinuation'

// ** Tasks - Pay Transaction
import membership from 'src/store/apps/Tasks/Membership'


// ** Process - Payroll Process
import payrollProcess from 'src/store/apps/Process/PayrollProcess'


// ** Reports - Payroll Display
import payrollDisplay from 'src/store/apps/Reports/PayrollDisplay'

// ** Reports - Payroll Advice
import payrollAdvice from 'src/store/apps/Reports/PayrollAdvice'


// ** Reports - Payroll Sheet
import payrollSheet from 'src/store/apps/Reports/PayrollSheet'


// ** Settings - General Setup 
import holiday from 'src/store/apps/Settings/GeneralSetup/HolidaySetup'
import menuLevelOne from 'src/store/apps/Settings/GeneralSetup/MenuSetup/MenuLevelOne'
import menuLevelTwo from 'src/store/apps/Settings/GeneralSetup/MenuSetup/MenuLevelTwo'


// ** Settings - User Management 
import role from 'src/store/apps/Settings/UserManagement/Roles'
import user from 'src/store/apps/Settings/UserManagement/Users'


// ** Settings - Rights Management  
import branchRight from 'src/store/apps/Settings/RightsManagement/Branch'
import menuRight from 'src/store/apps/Settings/RightsManagement/Menu'


// ** Utilities - Tax Rate  
import taxRate from 'src/store/apps/Utilities/TaxRate'
import closing from 'src/store/apps/Utilities/Closing'
import restore from 'src/store/apps/Utilities/Restore'

// ** Utilities - Transaction Parameter Calculation
import transactionParameterCalculation from 'src/store/apps/Utilities/TransactionParameterCalculation'

export const store = configureStore({
  reducer: {
    chat,
    email,
    invoice,
    calendar,
    permissions,

    // ** File - Employee Master
    employee,

    // ** File - Branches
    branches,

     // ** File - Department
     department,

    // ** File - Parameter Definition
    mainParameterDefinition,
    subParameterDefinition,

     // ** File - Transaction Definition
     transactionDefinition,

    // ** File - Period
    periods,

    // ** Tasks - Loan Transaction
    loanTransaction,

      // ** Tasks - Pay Transaction
    payTransaction,

    // ** Tasks - Membership
    membership,

      // ** Tasks - Discontinuation
    discontinuation,

    payrollProcess,
    
     // ** Reports - Payroll Display
     payrollDisplay,

      // ** Reports - Payroll Advice
      payrollAdvice,

      // ** Reports - Payroll Sheet
      payrollSheet,

     // ** Settings -General Setup
     holiday, 
     menuLevelOne,
     menuLevelTwo,

    // ** Settings - User Management
    role,
    user,

    // ** Settings - User Management
    branchRight,
    menuRight,

    // ** Utilites - Tax Rate 
    taxRate,
    closing,
    restore,

    // ** Utilities - Transaction Parameter Calculation
    transactionParameterCalculation
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
