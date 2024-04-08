
import Grid from '@mui/material/Grid'
import RestoreTabs from 'src/views/dc-pay/components/tabs/Utilities/Restore/RestoreTabs'

const EntityManagement = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12} lg={12}>
                <RestoreTabs />
            </Grid>
        </Grid>
    )
}

export default EntityManagement
