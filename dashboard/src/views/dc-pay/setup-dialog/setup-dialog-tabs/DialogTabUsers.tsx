import TextField from '@mui/material/TextField'

const DialogTabCompany = ({ createAppObject }: any) => {
  return (
    <div>
      <TextField fullWidth sx={{ mb: 4 }} label='First Name' placeholder='Enter First Name' onChange={(e) => { createAppObject.user.firstName = e.target.value }} />
      <TextField fullWidth sx={{ mb: 4 }} label='Last Name' placeholder='Enter Last Name' onChange={(e) => { createAppObject.user.lastName = e.target.value }} />
      <TextField type="email" fullWidth sx={{ mb: 4 }} label='Email' placeholder='Email' onChange={(e) => { createAppObject.user.email = e.target.value }} />
      <TextField type="password" fullWidth sx={{ mb: 4 }} label='Password' placeholder='Password' onChange={(e) => { createAppObject.user.password = e.target.value }} />
    </div>
  )
}

export default DialogTabCompany
