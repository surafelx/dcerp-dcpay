// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import moment from 'moment'

// ** Store Imports
import { useDispatch } from 'react-redux'

import { AppDispatch, RootState } from 'src/store'

import { fetchData } from 'src/store/apps/Reports/PayrollAdvice'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))



const InvoicePrint = () => {


  const router = useRouter();

  // get the id param from the route query object
  const { branch, department } = router.query;


  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    dispatch(
      fetchData({
        branch,
        department,
        currentPlan: ''
      })
    )
  }, [dispatch, branch, department])


  const store = useSelector((state: RootState) => state.payrollAdvice)


  // @ts-ignore
  const userData = JSON.parse(window.localStorage.getItem('userData'))
  const { organizationName } = userData
  const { start_date: startDate, end_date: endDate } = userData.currentPeriod || { start_date: '', end_date: '' }


  // ** Hooks
  const theme = useTheme()

  useEffect(() => {
    setTimeout(() => {
      window.print()
    }, 3000)
  }, [])


  return (
    <Box sx={{ p: 12, pb: 6 }}>
      <Grid container>
        <Grid item xs={8} sx={{ mb: { sm: 0, xs: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
              <svg
                width={30}
                height={25}
                version='1.1'
                viewBox='0 0 30 23'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
              >
                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                    <g id='logo' transform='translate(95.000000, 50.000000)'>
                      <path
                        id='Combined-Shape'
                        fill={theme.palette.primary.main}
                        d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                        transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                        transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                      />
                      <path
                        id='Rectangle'
                        fillOpacity='0.15'
                        fill={theme.palette.common.white}
                        d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                      />
                      <path
                        id='Rectangle'
                        fillOpacity='0.35'
                        fill={theme.palette.common.white}
                        transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                        d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <Typography
                variant='h6'
                sx={{ ml: 2.5, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
              >
              </Typography>
            </Box>
            <div>
              <Typography variant='body2' sx={{ mb: 1 }}>
                Office 149, 450 South Brand Brooklyn
              </Typography>
              <Typography variant='body2' sx={{ mb: 1 }}>
                San Diego County, CA 91905, USA
              </Typography>
              <Typography variant='body2'>+1 (123) 456 7891, +44 (876) 543 2198</Typography>
            </div>
          </Box>
        </Grid>

      </Grid>

      <Divider sx={{ my: theme => `${theme.spacing(6)} !important` }} />
      <Grid container>
        <Grid item xs={6}>
          <Typography variant='h5'>{organizationName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant='body1'>Date</Typography>
              <Typography variant='h6'> {`${moment().format("LL")} `}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1'>Period</Typography>
              <Typography variant='h6'>{`${moment(startDate).format("YYYY/MM/DD") || ""} - ${moment(endDate).format("YYYY/MM/DD") || ""}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: theme => `${theme.spacing(6)} !important` }} />
      <Grid container>
        <Grid item xs={6}>
          <Typography variant='h5'>Payroll Advice</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant='body1'>Branch</Typography>
              <Typography variant='h6'>{`${branch}`}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body1'>Department</Typography>
              <Typography variant='h6'>{`${department}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: theme => `${theme.spacing(6)} !important` }} />
      {
        store.data.map(({ employeeName, transactions }: any,) => {
          const earnings = transactions.filter(({ transaction_type_name }: any) => transaction_type_name === "Earning Amount" || transaction_type_name === "Earning Quantity")
          const deductions = transactions.filter(({ transaction_type_name }: any) => transaction_type_name === "Deduction Amount" || transaction_type_name === "Deduction Quantity")

          return (
            <>
              <Typography variant='h6'>{`${employeeName}`}</Typography>
              <Grid container columnSpacing={10}>
                <Grid item xs={6} sx={{ mb: { sm: 0, xs: 4 } }}>
                  <Table sx={{ mb: 6 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Earnings</TableCell>
                        <TableCell>Qty.</TableCell>
                        <TableCell>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        earnings.map(({ transaction_name, transaction_amount, transaction_type_name }: any, index: any) => {

                          if (transaction_type_name === "Earning Quantity")
                            return (
                              <TableRow key={index}>
                                <TableCell>{`${transaction_name}`}</TableCell>
                                <TableCell>{`${Number(transaction_amount).toFixed(2)}`}</TableCell>
                              </TableRow>
                            )
                          if (transaction_type_name === "Earning Amount")
                            return (
                              <TableRow key={index}>
                                <TableCell>{`${transaction_name}`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell>{`${Number(transaction_amount).toFixed(2)}`}</TableCell>
                              </TableRow>
                            )
                        })
                      }
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={6} sx={{ mb: { sm: 0, xs: 4 } }}>
                  <Table sx={{ mb: 6 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Deductions</TableCell>
                        <TableCell>Qty.</TableCell>
                        <TableCell>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        deductions.map(({ transaction_name, transaction_amount, transaction_type_name }: any, index: any) => {

                          if (transaction_type_name === "Deduction Quantity")
                            return (
                              <TableRow key={index}>
                                <TableCell>{`${transaction_name}`}</TableCell>
                                <TableCell>{`${Number(transaction_amount).toFixed(2)}`}</TableCell>
                              </TableRow>
                            )
                          if (transaction_type_name === "Deduction Amount")
                            return (
                              <TableRow key={index}>
                                <TableCell>{`${transaction_name}`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell>{`${Number(transaction_amount).toFixed(2)}`}</TableCell>
                              </TableRow>
                            )
                        })
                      }
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </>
          )
        })
      }


      <Grid container>
        <Grid item xs={12} sm={4} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>
        </Grid>
        <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
          <Divider />
          <CalcWrapper>
            <Typography variant='body2'>Total:</Typography>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              {Number(store.data.reduce((sum, { netPay }) => sum + netPay, 0)).toFixed(2)}
            </Typography>
          </CalcWrapper>
        </Grid>
      </Grid>
    </Box>
  )

}

InvoicePrint.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

InvoicePrint.setConfig = () => {
  return {
    mode: 'light'
  }
}


export default InvoicePrint
