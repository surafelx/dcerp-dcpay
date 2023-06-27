// ** React Imports
import { useEffect, useState, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'

// ** Icon Imports
// ** React Imports
// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'


import { DateType } from 'src/types/forms/reactDatepickerTypes'


// ** Custom Component Imports
import CustomInput from 'src/views/forms/form-elements/pickers/PickersCustomInput'
import DatePicker from 'react-datepicker'

import Grid from '@mui/material/Grid'


const TabFramework = ({createAppObject}: any) => {
  const [value, setValue] = useState<string>('ethiopian-calendar')
  const [currentPeriod, setCurrentPeriod] = useState<DateType>(new Date())
  
  useEffect(() => {
    createAppObject.period.currentPeriod = currentPeriod
    createAppObject.period.calendar = value
  }, [createAppObject.period, value, currentPeriod])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    createAppObject.period.calendar = value
  }

  return (
    <div>
      <Typography variant='h6' sx={{ mb: 4 }}>
         Initialize Period
      </Typography>
      <Box sx={{ mb: 8 }}>
        <Box
          onClick={() => setValue('ethiopian-calendar')}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography>Ethiopian Calendar</Typography>
              <Typography variant='caption'>Uses the Ethiopian Calendar and starts the Fiscal Year from ሐምሌ 1</Typography>
            </div>
          </Box>
          <Radio value='ethiopian-calendar' onChange={handleChange} checked={value === 'ethiopian-calendar'} />
        </Box>
        <Box
          onClick={() => setValue('gregorian-calendar')}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography>Gregorian Calendar</Typography>
              <Typography variant='caption'>Uses the Gregorian Calendar and starts the Fiscal Year from January 1</Typography>
            </div>
          </Box>
          <Radio value='gregorian-calendar' onChange={handleChange} checked={value === 'gregorian-calendar'} />
        </Box>

      </Box>
       <Grid xs={12} sx={{ mb: 4 }} >
        <DatePickerWrapper>
        <DatePicker
            selected={currentPeriod}
            showMonthYearPicker
            dateFormat='MM/yyyy'
            id='Current Period'
            onChange={(date: Date) => {
              setCurrentPeriod(date) 
              createAppObject.period.currentPeriod = currentPeriod
            }}
            customInput={<CustomInput label='Current Period' />}
          />
        </DatePickerWrapper>
          
        </Grid>

    </div>
  )
}

export default TabFramework



// ** Custom Avatar Component
// ** Types

