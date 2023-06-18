// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import moment from 'moment'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const userData = JSON.parse(window.localStorage.getItem('userData'))

  const {start_date: startDate, end_date: endDate} = userData.currentPeriod

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ color: 'text.primary', textTransform: 'capitalize' }}>
      <Link target='_blank' href='https://mui.com/store/license/'>
      {`${moment().format("LL")}  `}
          </Link>
      {`${moment(startDate).format("YYYY/MM/DD")} - ${moment(endDate).format("YYYY/MM/DD")}`}
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link target='_blank' href='https://mui.com/store/license/'>
            License
          </Link>
          <Link target='_blank' href='https://mui.com/store/contributors/themeselection/'>
            More Themes
          </Link>
          <Link
            target='_blank'
            href='https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/documentation'
          >
            Documentation
          </Link>
          <Link target='_blank' href='https://themeselection.com/support/'>
            Support
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
