// ** React Imports
import {  useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'

import Grid from '@mui/material/Grid'

import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'



const TabFramework = ({ createAppObject }: any) => {
  const [value, setValue] = useState<string>('')


  const handleSelectChange = (event: SelectChangeEvent) => {
    createAppObject.period.currentPeriod = event.target.value
  }

  return (
    <div>
      <Typography variant='h6' sx={{ mb: 4 }}>
        Initialize Period
      </Typography>
      <Box sx={{ mb: 8 }}>
        <Box
          onClick={() =>{
            createAppObject.period.calendar = 'ethiopian-calendar' 
            setValue('ethiopian-calendar')
          }}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography>Ethiopian Calendar</Typography>
              <Typography variant='caption'>Uses the Ethiopian Calendar and starts the Fiscal Year from ሐምሌ 1</Typography>
            </div>
          </Box>
          <Radio value='ethiopian-calendar' onChange={() =>createAppObject.period.calendar = 'ethiopian-calendar'} checked={value === 'ethiopian-calendar'} />
        </Box>
        <Box
          onClick={() => {
            createAppObject.period.calendar = 'gregorian-calendar' 
            setValue('gregorian-calendar')
          }}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography>Gregorian Calendar</Typography>
              <Typography variant='caption'>Uses the Gregorian Calendar and starts the Fiscal Year from January 1</Typography>
            </div>
          </Box>
          <Radio value='gregorian-calendar' onChange={() =>createAppObject.period.calendar = 'gregorian-calendar'} checked={value === 'gregorian-calendar'} />
        </Box>

      </Box>
      <Grid xs={12} sx={{ mb: 4 }} >
        <FormControl fullWidth>
          <InputLabel id='controlled-select-label'>Current Period</InputLabel>
          <Select
            label='Current Period'
            placeholder='Select Period'
            id='controlled-select'
            onChange={handleSelectChange}
            labelId='controlled-select-label'
          >
            {Array.from({ length: 12 }, (_, index) => (
              <MenuItem key={index} value={index + 1}>{index + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>

      </Grid>

    </div>
  )
}

export default TabFramework