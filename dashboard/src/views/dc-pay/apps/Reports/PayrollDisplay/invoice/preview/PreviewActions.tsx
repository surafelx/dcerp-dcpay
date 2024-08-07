// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

interface Props {
  id: string | undefined
}

const PreviewActions = ({ id }: Props) => {
  return (
    <Card>
      <CardContent>
      
        <Button fullWidth sx={{ mb: 3.5 }} color='primary' variant='outlined'>
          Download
        </Button>
        <Button
          fullWidth
          target='_blank'
          sx={{ mb: 3.5 }}
          component={Link}
          color='primary'
          variant='outlined'
          href={`/apps/invoice/print/${id}`}
        >
          Print
        </Button>
      </CardContent>
    </Card>
  )
}

export default PreviewActions
