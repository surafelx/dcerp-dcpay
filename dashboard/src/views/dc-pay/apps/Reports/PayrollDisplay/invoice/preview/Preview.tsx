// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Types
import { SingleInvoiceType, InvoiceLayoutProps } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import PreviewCard from 'src/views/dc-pay/apps/Reports/PayrollDisplay/invoice/preview/PreviewCard'
import PreviewActions from 'src/views/dc-pay/apps/Reports/PayrollDisplay/invoice/preview/PreviewActions'

const InvoicePreview = ({ id }: InvoiceLayoutProps) => {
  // ** State
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<null | SingleInvoiceType>(null)
  
  useEffect(() => {
    axios
      .get('/apps/invoice/single-invoice', { params: { id } })
      .then(res => {
        setData(res.data)
        setError(false)
      })
      .catch(() => {
        setData(null)
        setError(true)
      })
  }, [id])


  if (data) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <PreviewCard data={data} />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <PreviewActions
              id={id}
            />
          </Grid>
        </Grid>
      </>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            Invoice with the id: {id} does not exist. Please check the list of invoices:{' '}
            <Link href='/apps/invoice/list'>Invoice List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default InvoicePreview
