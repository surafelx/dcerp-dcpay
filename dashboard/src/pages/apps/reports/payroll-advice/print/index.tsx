// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import moment from 'moment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

import { AppDispatch, RootState } from 'src/store'

import { fetchData } from 'src/store/apps/Reports/PayrollSheet'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'



const InvoicePrint = () => {


  const router = useRouter();


  // get the id param from the route query object
  const { branch, department, branchn: branchName, departmentn: departmentName, } = router.query;


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

  let firstName = 'Default'
  let lastName = 'User'


  if (userData) {
    firstName = userData.first_name
    lastName = userData.last_name
  }


  useEffect(() => {
    setTimeout(() => {
      window.print()
    }, 8000)
  }, [])


  return (
    <Box sx={{ p: 0, pb: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', verticalAlign: 'middle', gap: '4' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt="DDFC Logo" height={"60px"} src="/images/logos/ddfc.png" />
              </div>
              <div>
                <div
                  style={{ fontWeight: 600, fontSize: "0.8rem", lineHeight: 'normal', marginBottom: "5px", textTransform: 'uppercase' }}
                >
                  Dire Dawa Food Complex S.Co
                </div>
                <div>
                  <div style={{ fontSize: '10px', display: 'flex', gap: '4px' }}>
                    <Icon icon={'mdi:location-outline'} fontSize='0.8rem' />
                    Lideta, Awash Bldg. #807
                  </div>
                  <div style={{ fontSize: '10px', display: 'flex', gap: '4px' }}>
                    <Icon icon={'mdi:home-outline'} fontSize='0.8rem' />
                    Addis Ababa, Ethiopia
                  </div>

                  <div style={{ fontSize: '10px', display: 'flex', gap: '4px' }}>
                    <Icon icon={'mdi:phone-outline'} fontSize='0.8rem' />
                    +251911217763 | +251929249081
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </div>
        <div>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', verticalAlign: 'middle', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt="Asun Logo" height={"60px"} src="/images/logos/asun-logo.png" />
              </div>
              <div>
                <div
                  style={{ fontWeight: 600, fontSize: "0.8rem", lineHeight: 'normal', marginBottom: "5px", textTransform: 'uppercase' }}
                >
                  Asun Pay
                </div>
                <div>
                  <div style={{ fontSize: '10px', display: 'flex', gap: '4px' }}>
                    <Icon icon={'mdi:web'} fontSize='0.8rem' />
                    www.asun.org
                  </div>
                  <div style={{ fontSize: '10px', display: 'flex', gap: '4px' }}>
                    <Icon icon={'mdi:email-outline'} fontSize='0.8rem' />
                    contact@asuns.org
                  </div>

                  <div style={{ fontSize: '10px', display: 'flex', gap: '4px' }}>
                    <Icon icon={'mdi:phone-outline'} fontSize='0.8rem' />
                    +251972262728 | +251945514370</div>
                </div>
              </div>
            </Box>

          </Box>
        </div>

      </div>

      <div style={{ fontSize: '22px', marginTop: '20px', backgroundColor: '#368FC8', color: 'white', padding: '5px', marginBottom: '5px', textTransform: 'uppercase', fontWeight: 700 }}>Payroll Sheet</div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div >
          <div style={{ display: 'flex', gap: '2px' }} >
            <span style={{ fontWeight: 600, paddingLeft: '10px' }}> OPERATOR: </span>
            <Typography sx={{ textTransform: 'capitalize', color: '#368FC8', fontWeight: 600, }}>{` ${firstName} ${lastName}`}</Typography>
          </div>
          <div style={{ display: 'flex', gap: '2px' }} >
            <span style={{ fontWeight: 600, paddingLeft: '10px' }}> DATE: </span>
            <span style={{ color: '#368FC8', fontWeight: 600, }}>  {`${moment().format("LL")} `} </span>
          </div>
          <div style={{ display: 'flex', gap: '2px' }} >
            <span style={{ fontWeight: 600, paddingLeft: '10px' }}> PERIOD: </span>
            <span style={{ color: '#368FC8', fontWeight: 600 }}>  {`${moment(startDate).format("YYYY/MM/DD") || ""} - ${moment(endDate).format("YYYY/MM/DD") || ""}`}</span>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', gap: '2px' }} >
            <span style={{ fontWeight: 600 }}> BRANCH:</span>
            <span style={{ color: '#368FC8', fontWeight: 600 }}> {`${branchName}`} </span>
          </div>
          <div style={{ display: 'flex', gap: '2px' }} >
            <span style={{ fontWeight: 600 }}> DEPARTMENT:</span>
            <span style={{ color: '#368FC8', fontWeight: 600 }}> {`${departmentName}`} </span>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '40px', }}></div>
      {
        store.data.filter(({ transactions }: any) => transactions.length > 3).filter(({ transactions, employeeStatusName }: any) => transactions.length > 3 && employeeStatusName === 'Active').map(({ employeeCode, employeeName, transactions }: any,) => {
          const earnings = transactions.filter(({ transaction_type_name }: any) => transaction_type_name === "Earning Amount" || transaction_type_name === "Earning Quantity")
          const deductions = transactions.filter(({ transaction_type_name }: any) => transaction_type_name === "Deduction Amount" || transaction_type_name === "Deduction Quantity")
          const totalEarnings = earnings.reduce((sum: any, transaction: any) => { return (sum + parseFloat(transaction.transaction_amount)) }, 0)
          console.log(earnings)
          const totalDeductions = deductions.reduce((sum: any, transaction: any) => { return (sum + parseFloat(transaction.transaction_amount)) }, 0)

          return (
            <>
              <div style={{ marginBottom: '10px' }}>
                <div style={{ border: '0.5px solid #368FC8', padding: '5px', fontWeight: '600', fontSize: '10px', textAlign: 'center', backgroundColor: '#368FC8', color: 'white', textTransform: "uppercase" }}>{`${employeeCode} ${employeeName}`}</div>
                <Grid container columnSpacing={0}>
                  <Grid item xs={6}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        {/* <tr style={{ border: '1px solid  #9C9FA4' }}>
                        <th style={{ border: '1px solid  #9C9FA4' }}></th>
                      </tr> */}
                        <tr style={{ backgroundColor: '#C1272D', border: '0.5px solid #C1272D' }}>
                          <td style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Earnings</td>
                          <td style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Quantity</td>
                          <td style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Amount</td>
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
                        <tr style={{ backgroundColor: '#C1272D', border: '0.5px solid #C1272D' }}>
                          <td style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Deductions</td>
                          <td style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Quantity</td>
                          <td style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Amount</td>
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
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#C1272D', border: '0.5px solid #C1272D' }} >
                      <td style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Gross Taxable</td>
                      <td style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Total Deductions</td>
                      <td style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Total Earnings</td>
                      <td style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Net Pay</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '0.25px solid #9C9FA4', paddingRight: '5px', textAlign: 'right', fontSize: '12px', }}>{`${Number(transactions.filter(({ transaction_code }: any) => transaction_code == '51')[0].transaction_amount).toFixed(2)}`}</td>
                      <td style={{ border: '0.25px solid #9C9FA4', paddingRight: '5px', textAlign: 'right', fontSize: '12px', }}>{`${Number(totalDeductions).toFixed(2)}`}</td>
                      <td style={{ border: '0.25px solid #9C9FA4', paddingRight: '5px', textAlign: 'right', fontSize: '12px', }}>{`${Number(totalEarnings).toFixed(2)}`}</td>
                      <td style={{ border: '0.25px solid #9C9FA4', paddingRight: '5px', textAlign: 'right', fontSize: '12px', }}>{`${Number(transactions.filter(({ transaction_code }: any) => transaction_code == '99')[0].transaction_amount).toFixed(2)}`}</td>
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
