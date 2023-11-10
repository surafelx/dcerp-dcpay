// ** React Imports
import {  useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'

const TabFramework = ({ createAppObject }: any) => {
  const [value, setValue] = useState<string>('')

  return (
    <div>
      <Typography variant='h6' sx={{ mb: 4 }}>
       Define Parameters
      </Typography>
      <Box sx={{ mb: 8 }}>
        <Box
          onClick={() =>{
            createAppObject.parameters.default = true
            setValue('default-parameters')
          }}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography>Default Parameters</Typography>
              <Typography variant='caption'>Uses the application recommended parameters for the data definitions as well as the transactions.</Typography>
            </div>
          </Box>
          <Radio value='default-parameters' onChange={() =>createAppObject.parameters.default = true} checked={value === 'default-parameters'} />
        </Box>
        <Box
          onClick={() => {
            createAppObject.parameters.default = false 
            setValue('custom-parameters')
          }}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography>Custom Parameters</Typography>
              <Typography variant='caption'>Create your own parameters, transaction definitions from a clear slate.</Typography>
            </div>
          </Box>
          <Radio value='custom-parameters' onChange={() =>createAppObject.parameters.default = false} checked={value === 'custom-parameters'} />
        </Box>

      </Box>
    </div>
  )
}

export default TabFramework


