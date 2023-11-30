// ** React Imports
import { useState, useEffect,  } from 'react'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Actions Imports
import { fetchData as fetchEmployee } from 'src/store/apps/File/EmployeeMaster'
import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchDepartments } from 'src/store/apps/File/EntityManagement/Department'


// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Custom Components Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import CrmTransactions from 'src/views/dc-pay/dashboards/crm/CrmTransactions'


const CRMDashboard = () => {
  const [role] = useState<string>('')
  const [value] = useState<string>('')
  const [status] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()


  const employeeStore = useSelector((state: RootState) => state.employee)
  const branchStore = useSelector((state: RootState) => state.branches)
  const departmentStore = useSelector((state: RootState) => state.department)



  useEffect(() => {
    dispatch(
      fetchEmployee({
        role,
        status,
        q: value,
        currentPlan: ''
      })
    )
    dispatch(
      fetchBranch({
        q: value,
      })
    )
    dispatch(
      fetchDepartments({
        q: value,
      })
    )
  }, [dispatch, role, status, value])



  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4} md={2} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter
            data={{
              stats: String(branchStore.data.length),

              // trend: 'negative',
              title: 'Branches',
              trendNumber: '',
              chipText: 'Total',
              chipColor: 'primary',
              src: '/images/cards/pose_m18.png'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter
            data={{
              stats: String(departmentStore.data.length),

              // trend: 'negative',
              title: 'Departments',
              trendNumber: '',
              chipText: 'Total',
              chipColor: 'primary',
              src: '/images/cards/pose_f9.png'
            }} />
        </Grid>
        <Grid item xs={12} sm={6} md={2} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter
            data={{
              stats: String(employeeStore.data.length),
              
              // trend: 'negative',
              title: 'Employees',
              trendNumber: '',
              chipText: 'Total',
              chipColor: 'primary',
              src: '/images/cards/pose_m35.png'
            }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CrmTransactions />
        </Grid>

        {/* <Grid item xs={12} sm={6} md={3}>
          <CrmTotalSales />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CrmRevenueReport />
        </Grid>
        <Grid item xs={12} md={6}>
          <CrmSalesOverview />
        </Grid> */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default CRMDashboard