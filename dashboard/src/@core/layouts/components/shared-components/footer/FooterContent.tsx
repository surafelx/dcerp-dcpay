// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import moment from 'moment'

const FooterContent = () => {

  // @ts-ignore
  const userData = JSON.parse(window.localStorage.getItem('userData'))
  let organizationName = ''
  let startDate = new Date()
  let endDate = new Date()

  if (userData) {
    organizationName = userData.organizationName
    startDate = userData.currentPeriod.start_date
    endDate = userData.currentPeriod.end_date
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ color: 'text.primary', textTransform: 'capitalize' }}>
        <Link target='_blank' href='https://mui.com/store/license/'>
          {`${moment().format("LL")} `}
        </Link>
      </Typography>

      <Typography sx={{ color: 'text.primary', textTransform: 'capitalize' }}>
        <Link target='_blank' href='https://mui.com/store/license/'>
          {`${organizationName || ''} `}
        </Link>
      </Typography>

      <Typography sx={{ color: 'text.primary', textTransform: 'capitalize' }}>
        {`${moment(startDate).format("YYYY/MM/DD") || ""} - ${moment(endDate).format("YYYY/MM/DD") || ""}`}
      </Typography>

    </Box>
  )
}

export default FooterContent
