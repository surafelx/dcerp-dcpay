import { useEffect, } from 'react'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


import { CountUp } from 'use-count-up'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { RootState, AppDispatch } from 'src/store'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Actions Imports
import { fetchAll as fetchPayTranscations } from 'src/store/apps/Tasks/PayTransaction'
import { fetchData as fetchLoanTransactions } from 'src/store/apps/Tasks/LoanTransaction'
import { fetchData as fetchMemberships } from 'src/store/apps/Tasks/Membership'
import { fetchData as fetchDiscontinuations } from 'src/store/apps/Tasks/Discontinuation'

const CrmTransactions = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(
            fetchPayTranscations({
            })
        )
        dispatch(
            fetchLoanTransactions({
            })
        )
        dispatch(
            fetchMemberships({
            })
        )
        dispatch(
            fetchDiscontinuations({
            })
        )
    }, [dispatch,])


    const payTransactionStore = useSelector((state: RootState) => state.payTransaction)
    const loanTransactionStore = useSelector((state: RootState) => state.loanTransaction)
    const membershipStore = useSelector((state: RootState) => state.membership)
    const discontinuationStore = useSelector((state: RootState) => state.discontinuation)

    // const totalTransacations = payTransactionStore.data.length +  loanTransactionStore.data.length + membershipStore.data.length + discontinuationStore.data.length

    return (
        <Card sx={{ width: '100%', mt: "20px" }}>
            <CardHeader
                title='Transactions'
                action={
                    <OptionsMenu
                        options={['Refresh', 'Share', 'Update']}
                        iconButtonProps={{ size: 'small', className: 'card-more-options', sx: { color: 'text.secondary' } }}
                    />
                }
                subheader={
                    <>
                    </>
                }
                titleTypographyProps={{
                    sx: {
                        // mb: 2.25,
                        lineHeight: '2rem !important',
                        letterSpacing: '0.15px !important'
                    }
                }}
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(0.75)} !important` }}>
                <Grid container spacing={[5, 0]}>
                    <Grid item xs={12} sm={3} key={1}>
                        <Box key={1} sx={{ display: 'flex', alignItems: 'center' }}>
                            <CustomAvatar variant='rounded' color={'primary'} sx={{ mr: 3, boxShadow: 3, width: 44, height: 44 }}>
                                <Icon icon={'mdi:cash'} fontSize='1.75rem' />
                            </CustomAvatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='caption'>Pay</Typography>
                                <Typography variant='h6'>
                                    {payTransactionStore.data.length ? (<CountUp isCounting end={payTransactionStore.data.length} />) : (
                                        '...'
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CustomAvatar variant='rounded' color={'primary'} sx={{ mr: 3, boxShadow: 3, width: 44, height: 44 }}>
                                <Icon icon={'mdi:hand-coin'} fontSize='1.75rem' />
                            </CustomAvatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='caption'>Loan</Typography>
                                <Typography variant='h6'>
                                    {loanTransactionStore.data.length ? (<CountUp isCounting end={loanTransactionStore.data.length} />) : (
                                        '...'
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CustomAvatar variant='rounded' color={'primary'} sx={{ mr: 3, boxShadow: 3, width: 44, height: 44 }}>
                                <Icon icon={'mdi:account-multiple-plus'} fontSize='1.75rem' />
                            </CustomAvatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='caption'>Memberships</Typography>
                                <Typography variant='h6'>
                                    {membershipStore.data.length ? (<CountUp isCounting end={membershipStore.data.length} />) : (
                                        '...'
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CustomAvatar variant='rounded' color={'primary'} sx={{ mr: 3, boxShadow: 3, width: 44, height: 44 }}>
                                <Icon icon={'mdi:stop-circle'} fontSize='1.75rem' />
                            </CustomAvatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='caption'>Discontinuations</Typography>
                                <Typography variant='h6'>
                                    {discontinuationStore.data.length ? (<CountUp isCounting end={discontinuationStore.data.length} />) : (
                                        '...'
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    )
}

export default CrmTransactions