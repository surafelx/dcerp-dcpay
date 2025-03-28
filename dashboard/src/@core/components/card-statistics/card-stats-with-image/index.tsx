// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Types Imports
import { CardStatsCharacterProps } from 'src/@core/components/card-statistics/types'

interface Props {
  data: CardStatsCharacterProps
}


const CardStatsCharacter = ({ data }: Props) => {
  // ** Vars
  const { title, chipText, src, stats, trendNumber, trend = 'positive', chipColor = 'primary' } = data

  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: "space-around", height: '120px' }}>
          <div>
            <Typography sx={{ mb: 6.5, fontWeight: 600, justifyContent: 'center' }}>{title}</Typography>
            <Box sx={{ mb: 1.5, rowGap: 1, width: '55%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <Typography variant='h5' sx={{ mr: 1.5, textAlign: 'center' }}>
                {stats}
              </Typography>
              <Typography
                component='sup'
                variant='caption'
                sx={{ color: trend === 'negative' ? 'error.main' : 'success.main' }}
              >
                {trendNumber}
              </Typography>
            </Box>
            <CustomChip
              size='small'
              skin='light'
              label={chipText}
              color={chipColor}
              sx={{ height: 20, fontWeight: 500, fontSize: '0.75rem', '& .MuiChip-label': { lineHeight: '1.25rem' } }}
            />
          </div>
          <div>
            <img height={"120px"} src={src} alt={title} />
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export default CardStatsCharacter
