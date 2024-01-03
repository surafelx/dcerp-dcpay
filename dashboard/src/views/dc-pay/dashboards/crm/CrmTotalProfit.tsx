// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Types
import { AppDispatch, RootState } from 'src/store'

// ** Actions Imports
import { fetchData } from 'src/store/apps/Reports/PayrollSheet'

interface DataType {
  title: string
  icon: ReactNode
  subtitle: string
  avatarColor: ThemeColor
}


const series = [
  {
    name: 'Product A',
    data: [29000, 22000, 25000, 18500, 29000, 20000, 34500]
  },
  {
    name: 'Product B',
    data: [0, 16000, 11000, 15500, 0, 12500, 9500]
  },
  {
    name: 'Product C',
    data: [0, 0, 0, 14000, 0, 11500, 12000]
  }
]

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const EcommerceTotalProfit = () => {
  const dispatch = useDispatch<AppDispatch>()

  // ** Hook
  const theme = useTheme()

  useEffect(() => {
    dispatch(
      fetchData({
      })
    )
  }, [dispatch,])

  const payrollSheet = useSelector((state: RootState) => state.payrollSheet)

  const activeEmployee = payrollSheet.data.filter(({ employeeStatusName }) => employeeStatusName == 'Active')

  const calculateSalaryComponents = (employeesData: any, validTransactionCodes: any) => {
    const totalSums: any = {};

    employeesData.forEach((employeeData: any) => {
      const transactions = employeeData.transactions || [];

      transactions.forEach((transaction: any) => {
        const { transaction_code, transaction_amount } = transaction;

        if (validTransactionCodes.totalSalary.includes(transaction_code)) {
          totalSums.totalSalary = (totalSums.totalSalary || 0) + (parseFloat(transaction_amount) || 0);
        } else if (validTransactionCodes.allowance.includes(transaction_code)) {
          totalSums.allowance = (totalSums.allowance || 0) + (parseFloat(transaction_amount) || 0);
        } else if (validTransactionCodes.netPay.includes(transaction_code)) {
          totalSums.netPay = (totalSums.netPay || 0) + (parseFloat(transaction_amount) || 0);
        } else if (validTransactionCodes.overtime.includes(transaction_code)) {
          totalSums.overtime = (totalSums.overtime || 0) + (parseFloat(transaction_amount) || 0);
        } else if (validTransactionCodes.other.includes(transaction_code)) {
          totalSums.other = (totalSums.other || 0) + (parseFloat(transaction_amount) || 0);
        }
      });
    });

    return totalSums;
  };

  const validTransactionCodes = {
    totalSalary: ["5"],
    allowance: ["6", "7", "8", "9", "18", "19", "20", "28", "29", "102", "103"],
    netPay: ["99"],
    overtime: ["11", "13", "15", "17"],
    other: ["26"],
  };

  const totalSums = calculateSalaryComponents(activeEmployee, validTransactionCodes);

  const employeesWithTotalSalary = totalSums.totalSalary || 0;
  const employeesWithTotalAllowance = totalSums.allowance || 0;
  const employeesWithTotalNetPay = totalSums.netPay || 0;
  const employeesOvertime = totalSums.overtime || 0;
  const employeesOther = totalSums.other || 0;

  const options: ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '35%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.secondary.main],
    grid: {
      strokeDashArray: 7,
      borderColor: theme.palette.divider,
      padding: {
        left: 0,
        bottom: -10
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      curve: 'smooth',
      lineCap: 'round',
      colors: [theme.palette.background.paper]
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: [2016, 2017, 2018, 2019, 2020, 2021, 2022],
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    yaxis: {
      labels: {
        offsetY: 2,
        offsetX: -10,
        formatter: (value: number) => (value > 999 ? `${(value / 1000).toFixed(0)}k` : `${value}`),
        style: { colors: theme.palette.text.disabled }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      },
      {
        breakpoint: 430,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '55%'
            }
          }
        }
      }
    ]
  }

  const data: DataType[] = [
    {
      title: `${Number(employeesWithTotalSalary).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      avatarColor: 'success',
      subtitle: 'Salary',
      icon: <Icon icon='mdi:cash-multiple' fontSize='1.875rem' />
    },
    {
      title: `${Number(employeesWithTotalAllowance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      avatarColor: 'primary',
      subtitle: 'Allowance',
      icon: <Icon icon='mdi:hard-hat' fontSize='1.875rem' />
    },
    {
      title: `${Number(employeesOvertime).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      avatarColor: 'primary',
      subtitle: 'Overtime',
      icon: <Icon icon='mdi:clock-plus' fontSize='1.875rem' />
    },
    {
      title: `${Number(employeesOther).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      avatarColor: 'secondary',
      subtitle: 'Others',
      icon: <Icon icon='mdi:dots-horizontal' />
    }
  ]


  return (
    <Card>
      <Grid container>
        <StyledGrid item xs={12} sm={7}>
          <CardContent sx={{ height: '100%', '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
            <Typography variant='h6'>Total Compensation</Typography>
            <ReactApexcharts type='bar' height={282} series={series} options={options} />
          </CardContent>
        </StyledGrid>
        <Grid item xs={12} sm={5}>
          <CardHeader
            title={`${Number(employeesWithTotalNetPay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subheader='Last month compensation 234.40k'
            subheaderTypographyProps={{ sx: { lineHeight: '1.25rem', fontSize: '0.875rem !important' } }}
            titleTypographyProps={{
              sx: {
                fontSize: '1.5rem !important',
                lineHeight: '2rem !important',
                letterSpacing: '0.43px !important'
              }
            }}
            action={
              <OptionsMenu
                options={['Last 28 Days', 'Last Month', 'Last Year']}
                iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
              />
            }
          />
          <CardContent
            sx={{ pt: theme => `${theme.spacing(4)} !important`, pb: theme => `${theme.spacing(5.5)} !important` }}
          >
            {data.map((item: DataType, index: number) => {
              return (
                <Box key={index} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar
                    skin='light'
                    variant='rounded'
                    color={item.avatarColor}
                    sx={{ mr: 3.5, '& svg': { color: `${item.avatarColor}.main` } }}
                  >
                    {item.icon}
                  </CustomAvatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
                    <Typography variant='body2'>{item.subtitle}</Typography>
                  </Box>
                </Box>
              )
            })}

          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default EcommerceTotalProfit