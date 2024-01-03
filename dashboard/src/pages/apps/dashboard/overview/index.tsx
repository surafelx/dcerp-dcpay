// ** React Imports
import { useState, useEffect, } from 'react'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Actions Imports
import { fetchData as fetchEmployee } from 'src/store/apps/File/EmployeeMaster'
import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchDepartments } from 'src/store/apps/File/EntityManagement/Department'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomChip from 'src/@core/components/mui/chip'

import { CountUp } from 'use-count-up'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'



// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import CrmTransactions from 'src/views/dc-pay/dashboards/crm/CrmTransactions'

// import CrmSalesOverview from 'src/views/dc-pay/dashboards/crm/CrmSalesOverview'

// import CrmTotalProfit from 'src/views/dc-pay/dashboards/crm/CrmTotalProfit'




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

  console.log("Hello")

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4} md={2} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <Card sx={{ overflow: 'visible', position: 'relative' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: "space-around", height: '120px' }}>
                <div>
                  <Typography sx={{ mb: 6.5, fontWeight: 600, justifyContent: 'center' }}>{'Branches'}</Typography>
                  <div>
                    <Box sx={{ mb: 1.5, rowGap: 1, width: '55%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                      <Typography variant='h5' sx={{ mr: 1.5, textAlign: 'center' }}>
                        {branchStore.data.length ? (<CountUp isCounting end={branchStore.data.length} />) : (
                          '...'
                        )}
                      </Typography>
                      <Typography
                        component='sup'
                        variant='caption'
                        sx={{ color: 'success.main' }}
                      >
                        {''}
                      </Typography>
                    </Box>
                    <CustomChip
                      size='small'
                      skin='light'
                      label={'Total'}
                      color={'primary'}
                      sx={{ height: 20, fontWeight: 500, fontSize: '0.75rem', '& .MuiChip-label': { lineHeight: '1.25rem' } }}
                    />
                  </div>
                </div>
                <div>
                  <img height={"120px"} src={'/images/avatars/employees.png'} alt={'Employees'} />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={2} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <Card sx={{ overflow: 'visible', position: 'relative' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: "space-around", height: '120px' }}>
                <div>
                  <Typography sx={{ mb: 6.5, fontWeight: 600, justifyContent: 'center' }}>{'Departments'}</Typography>
                  <div>
                    <Box sx={{ mb: 1.5, rowGap: 1, width: '55%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                      <Typography variant='h5' sx={{ mr: 1.5, textAlign: 'center' }}>
                        {departmentStore.data.length ? (<CountUp isCounting end={departmentStore.data.length} />) : (
                          '...'
                        )}
                      </Typography>
                      <Typography
                        component='sup'
                        variant='caption'
                        sx={{ color: 'success.main' }}
                      >
                        {''}
                      </Typography>
                    </Box>
                    <CustomChip
                      size='small'
                      skin='light'
                      label={'Total'}
                      color={'primary'}
                      sx={{ height: 20, fontWeight: 500, fontSize: '0.75rem', '& .MuiChip-label': { lineHeight: '1.25rem' } }}
                    />
                  </div>
                </div>
                <div>
                  <img height={"120px"} src={'/images/avatars/employees.png'} alt={'Employees'} />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <Card sx={{ overflow: 'visible', position: 'relative' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: "space-around", height: '120px' }}>
                <div>
                  <Typography sx={{ mb: 6.5, fontWeight: 600, justifyContent: 'center' }}>{'Employees'}</Typography>
                  <div style={{ display: 'flex', justifyContent: "space-around", height: '120px', gap: '20px' }}>
                    <div>
                      <Box sx={{ mb: 1.5, rowGap: 1, width: '55%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <Typography variant='h5' sx={{ mr: 1.5, textAlign: 'center' }}>
                          {employeeStore.data.length ? (<CountUp isCounting end={employeeStore.data.length} />) : (
                            '...'
                          )}
                        </Typography>
                        <Typography
                          component='sup'
                          variant='caption'
                          sx={{ color: 'success.main' }}
                        >
                          {''}
                        </Typography>
                      </Box>
                      <CustomChip
                        size='small'
                        skin='light'
                        label={'Total'}
                        color={'primary'}
                        sx={{ height: 20, fontWeight: 500, fontSize: '0.75rem', '& .MuiChip-label': { lineHeight: '1.25rem' } }}
                      />
                    </div>
                    <div>
                      <Box sx={{ mb: 1.5, rowGap: 1, width: '55%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <Typography variant='h5' sx={{ mr: 1.5, textAlign: 'center' }}>
                          {employeeStore.data.length ? (<CountUp isCounting end={employeeStore.data.filter(({ employeeStatusName }) => employeeStatusName == 'Active').length} />) : (
                            '...'
                          )}
                        </Typography>
                        <Typography
                          component='sup'
                          variant='caption'
                          sx={{ color: 'success.main' }}
                        >
                          {''}
                        </Typography>
                      </Box>
                      <CustomChip
                        size='small'
                        skin='light'
                        label={'Active'}
                        color={'primary'}
                        sx={{ height: 20, fontWeight: 500, fontSize: '0.75rem', '& .MuiChip-label': { lineHeight: '1.25rem' } }}
                      />
                    </div>
                  </div>

                </div>
                <div>
                  <img height={"120px"} src={'/images/avatars/employees.png'} alt={'Employees'} />
                </div>
              </div>

            </CardContent>
          </Card>
        </Grid>
        <Grid sx={{ display: 'flex', width: '100%', my: 'auto' }} item xs={12} md={6}>
          <CrmTransactions />
        </Grid>
        {/* <Grid item xs={12} md={7}>
          <CrmTotalProfit />
        </Grid>
        <Grid item xs={12} md={5}>
          <CrmSalesOverview />
        </Grid> */}
      </Grid>
    </ApexChartWrapper >
  )
}

export default CRMDashboard