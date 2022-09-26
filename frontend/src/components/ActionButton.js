import { Button, Stack } from '@mui/material'
import React from 'react'

const ActionButton = ({toggleEdit,DeleteData,props}) => {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="contained" color="grey" onClick={() => toggleEdit(props)}>
                Edit
            </Button>
            <Button variant="contained" color="grey" onClick={() => DeleteData(props)}> 
                Delete
            </Button>
        </Stack>
    )
}

export default ActionButton