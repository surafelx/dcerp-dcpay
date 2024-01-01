// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import moment from 'moment'

// ** Store Imports
import { useDispatch } from 'react-redux'

import { AppDispatch, RootState } from 'src/store'

import { fetchData } from 'src/store/apps/Reports/PayrollSheet'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'



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


  const store = useSelector((state: RootState) => state.payrollSheet)


  // @ts-ignore
  const userData = JSON.parse(window.localStorage.getItem('userData'))

  // const { organizationName } = userData
  const { start_date: startDate, end_date: endDate } = userData.currentPeriod || { start_date: '', end_date: '' }


  // ** Hooks
  const theme = useTheme()

  useEffect(() => {
    setTimeout(() => {
      window.print()
    }, 3000)
  }, [])


  return (
    <Box sx={{ p: 0, pb: 6 }}>
      <Grid container>
        <Grid item xs={8} sx={{ mb: { sm: 0, xs: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
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
                Dire Dawa Food Complex S.Co
              </Typography>
            </Box>
            <div>
              <div style={{ fontSize: '12px', }}>
                Lideta, Awash Bldg. #807
              </div>
              <div style={{ fontSize: '12px', }}>
                Addis Ababa, Ethiopia
              </div>
              <div style={{ fontSize: '12px', }}>+251911217763 | +251929249081</div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ mb: { sm: 0, xs: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
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
                Asun Pay
              </Typography>
            </Box>
            <div>
              <div style={{ fontSize: '12px', }}>
                Nigat Building Office No. 110
              </div>
              <div style={{ fontSize: '12px', }}>
                Addis Ababa, Ethiopia
              </div>
              <div style={{ fontSize: '12px', }}>+251945514370 | +251972262728</div>
            </div>
          </Box>
        </Grid>

      </Grid>

      <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
      <div style={{ fontSize: '22px', fontWeight: 700 }}>Payroll Advice</div>
      <Grid container>
        <Grid item xs={8}>
          <div>Report Date: {`${moment().format("LL")} `} </div>
          <div>Period: {`${moment(startDate).format("YYYY/MM/DD") || ""} - ${moment(endDate).format("YYYY/MM/DD") || ""}`}</div>
        </Grid>
        <Grid item xs={4}>
          <div>Branch: {`${branch}`}</div>
          <div>Department: {`${department}`}</div>
        </Grid>
      </Grid>
      <Divider sx={{ my: theme => `${theme.spacing(2)} !important`, marginBottom: '10px' }} />
      {
        store.data.filter(({ transactions }: any) => transactions.length > 3).map(({ employeeName, transactions }: any,) => {
          const earnings = transactions.filter(({ transaction_type_name }: any) => transaction_type_name === "Earning Amount" || transaction_type_name === "Earning Quantity")
          const deductions = transactions.filter(({ transaction_type_name }: any) => transaction_type_name === "Deduction Amount" || transaction_type_name === "Deduction Quantity")

          return (
            <>
              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '18px', fontWeight: '600' }}>{`001 ${employeeName} Yimam`}</div>
                <Grid container columnSpacing={0}>
                  <Grid item xs={6}>
                    <table style={{ border: '0.25px solid  #9C9FA4', width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        {/* <tr style={{ border: '1px solid  #9C9FA4' }}>
                        <th style={{ border: '1px solid  #9C9FA4' }}></th>
                      </tr> */}
                        <tr>
                          <td style={{ border: '0.5px solid  #9C9FA4', paddingLeft: '5px', fontWeight: '600', fontSize: '12px', textAlign: 'center' }}>Earnings</td>
                          <td style={{ border: '0.5px solid  #9C9FA4', paddingLeft: '5px', fontWeight: '600', fontSize: '12px', textAlign: 'center' }}>Quantity</td>
                          <td style={{ border: '0.5px solid  #9C9FA4', paddingLeft: '5px', fontWeight: '600', fontSize: '12px', textAlign: 'center' }}>Amount</td>
                        </tr>
                        {
                          earnings.filter(({ transaction_amount }: any) => parseFloat(transaction_amount) != 0).map(({ transaction_name, transaction_amount, transaction_type_name }: any, index: any) => {

                            if (transaction_type_name === "Earning Quantity")
                              return (
                                <tr key={index}>
                                  <td style={{ border: '0.5px solid  #9C9FA4', paddingLeft: '5px', fontSize: '12px', }}>{`${transaction_name}`}</td>
                                  <td style={{ border: '0.5px solid  #9C9FA4', paddingRight: '5px', textAlign: 'right', fontSize: '12px', }}>{`${Number(transaction_amount).toFixed(2)}`}</td>
                                </tr>
                              )
                            if (transaction_type_name === "Earning Amount")
                              return (
                                <tr key={index}>
                                  <td style={{ border: '0.5px solid  #9C9FA4', paddingLeft: '5px', fontSize: '12px', }}>{`${transaction_name}`}</td>
                                  <td style={{ border: '0.5px solid  #9C9FA4', paddingLeft: '5px', fontSize: '12px', }}></td>
                                  <td style={{ border: '0.5px solid  #9C9FA4', paddingRight: '5px', textAlign: 'right', fontSize: '12px', }}>{`${Number(transaction_amount).toFixed(2)}`}</td>
                                </tr>
                              )
                          })
                        }
                      </tbody>
                    </table>
                  </Grid>
                  <Grid item xs={6}>
                    <table style={{ border: '0.122px solid #9C9FA4', width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <td style={{ border: '0.25px solid #9C9FA4', paddingLeft: '5px', fontWeight: '600', fontSize: '12px', textAlign: 'center' }}>Deductions</td>
                          <td style={{ border: '0.25px solid #9C9FA4', paddingLeft: '5px', fontWeight: '600', fontSize: '12px', textAlign: 'center' }}>Quantity</td>
                          <td style={{ border: '0.25px solid #9C9FA4', paddingLeft: '5px', fontWeight: '600', fontSize: '12px', textAlign: 'center' }}>Amount</td>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          deductions.filter(({ transaction_amount }: any) => parseFloat(transaction_amount) != 0).map(({ transaction_name, transaction_amount, transaction_type_name }: any, index: any) => {

                            if (transaction_type_name === "Deduction Quantity")
                              return (
                                <tr key={index}>
                                  <td style={{ border: '0.25px solid #9C9FA4', paddingLeft: '5px', fontSize: '12px', }}>{`${transaction_name}`}</td>
                                  <td style={{ border: '0.25px solid #9C9FA4', paddingRight: '5px', textAlign: 'right', fontSize: '12px', }}>{`${Number(transaction_amount).toFixed(2)}`}</td>
                                </tr>
                              )
                            if (transaction_type_name === "Deduction Amount")
                              return (
                                <tr key={index}>
                                  <td style={{ border: '0.25px solid #9C9FA4', paddingLeft: '5px', fontSize: '12px', }}>{`${transaction_name}`}</td>
                                  <td style={{ border: '0.25px solid #9C9FA4', paddingLeft: '5px', fontSize: '12px', }}></td>
                                  <td style={{ border: '0.25px solid #9C9FA4', paddingRight: '5px', textAlign: 'right', fontSize: '12px', }}>{`${Number(transaction_amount).toFixed(2)}`}</td>
                                </tr>
                              )
                          })
                        }
                      </tbody>
                    </table>
                  </Grid>
                </Grid>
                <table style={{ border: '0.12px solid #9C9FA4', width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                  <thead>
                    <tr>
                      <td style={{ border: '0.25px solid #9C9FA4', paddingLeft: '5px', fontWeight: '600', fontSize: '12px', textAlign: 'center' }}>Gross Taxable</td>
                      <td style={{ border: '0.25px solid #9C9FA4', paddingLeft: '5px', fontWeight: '600', fontSize: '12px', textAlign: 'center' }}>Total Deductions</td>
                      <td style={{ border: '0.25px solid #9C9FA4', paddingLeft: '5px', fontWeight: '600', fontSize: '12px', textAlign: 'center' }}>Total Earnings</td>
                      <td style={{ border: '0.25px solid #9C9FA4', paddingLeft: '5px', fontWeight: '600', fontSize: '12px', textAlign: 'center' }}>Net Pay</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '0.25px solid #9C9FA4', paddingRight: '5px', textAlign: 'right', fontSize: '12px', }}>0</td>
                      <td style={{ border: '0.25px solid #9C9FA4', paddingRight: '5px', textAlign: 'right', fontSize: '12px', }}>0</td>
                      <td style={{ border: '0.25px solid #9C9FA4', paddingRight: '5px', textAlign: 'right', fontSize: '12px', }}>0</td>
                      <td style={{ border: '0.25px solid #9C9FA4', paddingRight: '5px', textAlign: 'right', fontSize: '12px', }}>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )
        })
      }


      <Grid container>
        <table style={{ border: '0.12px solid #9C9FA4', width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr>
              <td style={{ border: '0.25px solid #9C9FA4', paddingRight: '5px', fontWeight: '600', fontSize: '12px', textAlign: 'right' }}>Total</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '0.25px solid #9C9FA4', paddingRight: '5px', textAlign: 'right' }}>0</td>
            </tr>
          </tbody>
        </table>
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
