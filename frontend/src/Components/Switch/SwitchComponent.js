import Switch from '@material-ui/core/Switch'
import {withStyles} from '@material-ui/core/styles'
import React from 'react'

export default function SwitchComponent({checked, setChecked}) {

    const BlueSwitch = withStyles({
        switchBase: {
          color: "#278DFF",
          '&$checked': {
            color: '#4888F6',
          },
          '&$checked + $track': {
            backgroundColor: '#4888F6',
          },
        },
        checked: {},
        track: {},
      })(Switch);
    
    return (
        <BlueSwitch checked={checked} onChange={(event, value) => {setChecked(value)}} />
    )
}
