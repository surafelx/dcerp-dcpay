import { MouseEvent, SyntheticEvent, useState } from 'react'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import MonthClosing from 'src/views/dc-pay/tables/Utilities/Closing/MonthTable'
import YearClosing from 'src/views/dc-pay/tables/Utilities/Closing/YearTable'

const TabsNav = () => {
    const [value, setValue] = useState<string>('1')
    

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    
return (
        <TabContext value={value}>
            <TabList onChange={handleChange} aria-label='nav tabs example'>
                <Tab
                    value='1'
                    component='a'
                    label='Month'
                    href='/monthclosing'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
                <Tab
                    value='2'
                    component='a'
                    label='Year'
                    href='/yearclosing'
                    onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                />
              
            </TabList>
            <TabPanel value='1'>
                <MonthClosing />
            </TabPanel>
            <TabPanel value='2'>
                <YearClosing />
            </TabPanel>
        </TabContext>
    )
}

export default TabsNav
