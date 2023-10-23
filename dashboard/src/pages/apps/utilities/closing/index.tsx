
import Grid from '@mui/material/Grid'
import ClosingTabs from 'src/views/dc-pay/components/tabs/Utilities/Closing/ClosingTabs'

const EntityManagement = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12} lg={12}>
                <ClosingTabs />
            </Grid>
        </Grid>
    )
}

export default EntityManagement
