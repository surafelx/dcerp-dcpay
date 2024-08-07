import TextField from '@mui/material/TextField'

const DialogTabCompany = ({ createAppObject }: any) => {
  return (
    <div>
      <TextField fullWidth sx={{ mb: 4 }} label='Company Name' placeholder='DC Software Solutions' onChange={(e) => { createAppObject.company.name = e.target.value }} />
      <TextField fullWidth sx={{ mb: 4 }} label='Code' placeholder='0' onChange={(e) => { createAppObject.company.branchCode = e.target.value }} />
      <TextField fullWidth sx={{ mb: 4 }} label='Branch' placeholder='Main Branch' onChange={(e) => { createAppObject.company.branchName = e.target.value }} />
    </div>
  )
}

export default DialogTabCompany
