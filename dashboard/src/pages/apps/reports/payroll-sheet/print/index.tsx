// ** React Imports
import { Fragment, ReactNode, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Store Imports
import { useDispatch } from 'react-redux'

import { AppDispatch, RootState } from 'src/store'

import { fetchData } from 'src/store/apps/Reports/PayrollSheet'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import moment from 'moment'


const InvoicePrint = () => {


  const router = useRouter();

  // get the id param from the route query object
  const { branch, department, bank, branchn: branchName, departmentn: departmentName, bankn: bankName } = router.query;


  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    dispatch(
      fetchData({
        branch,
        department,
        bank,
        q: '',
        report: 'sheet'
      })
    )
  }, [dispatch, branch, department, bank])


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
    }, 5000)
  }, [])





  return (
    <Box sx={{ width: '100%', pb: 6 }}>
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
          <div style={{ display: 'flex', gap: '2px' }} >
            <span style={{ fontWeight: 600 }}> BANK:</span>
            <span style={{ color: '#368FC8', fontWeight: 600 }}> {`${bankName}`} </span>
          </div>

        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Grid container columnSpacing={0}>
          <Grid item xs={12}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ backgroundColor: '#C1272D', border: '0.5px solid #C1272D' }} >
                  <th style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>No.</th>
                  <th style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Code</th>
                  <th style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Name</th>
                  <th style={{
                    textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px'
                  }}>Account</th>
                  <th style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Net Pay</th>
                  <th style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Signature</th>
                </tr>

                {
                  store.data.filter(({ transactions, employeeStatusName }: any) => transactions.length > 3 && employeeStatusName === 'Active').map(({ employeeCode, employeeName, employeeAccountNumber, transactions, employeeDepartment }: any, index: any, array: any) => {
                    const netPay = transactions?.filter(({ transaction_code }: any) => transaction_code === '99')[0]?.transaction_amount;


                    const currentEmployeeDepartment = employeeDepartment;
                    const previousEmployeeDepartment = index > 0 ? array[index - 1].employeeDepartment : null;
                    const shouldDisplayDepartmentRow = currentEmployeeDepartment !== previousEmployeeDepartment;


                    const departmentRow = shouldDisplayDepartmentRow ? (
                      <tr style={{ backgroundColor: '#368FC8', color: 'white' }} key={`department-${employeeCode}`}>
                        <td colSpan={7} style={{ border: '0.5px solid #368FC8', padding: '5px', fontWeight: '600', fontSize: '10px', textAlign: 'center' }}>
                          <div >
                            {employeeDepartment}
                          </div>
                        </td>
                      </tr>
                    ) : null;

                    return (
                      <>
                        <Fragment key={`employee-${employeeCode}`}>
                          {departmentRow}
                          <tr>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'left' }}>{`${index + 1}`}</td>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'left' }}>{`${employeeCode}`}</td>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'left' }}>{`${employeeName.toUpperCase()}`}</td>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'left' }}>{`${employeeAccountNumber}`}</td>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'right' }}>{`${Number(netPay).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</td>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'left' }}></td>
                          </tr>
                        </Fragment>

                      </>

                    );
                  })

                }

              </tbody>
            </table>
          </Grid>

        </Grid>
      </div>
    </Box >


  )

}

InvoicePrint.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

InvoicePrint.setConfig = () => {
  return {
    mode: 'light'
  }
}


export default InvoicePrint
