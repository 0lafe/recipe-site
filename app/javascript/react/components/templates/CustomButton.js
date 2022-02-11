import { Button } from "@mui/material"
import { styled } from '@mui/material/styles';
import React from "react"

const StyledButton = styled(Button)(({theme}) => ({
    backgroundColor: '#D8C3A5',
    color: '#E85A4F',
    fontsize: 10,
    border: 'solid 2px dimgray',
    '&:hover': {
        background: '#D8C3A5',
        color: '#E98074',
        boxShadow: '4px 8px 8px 0 rgba(0,0,0,.2)',
        transform: 'scale(1.05)'
    }
}))

const CustomButton = ({ text, callback }) => {
    return (
        <StyledButton onClick={callback}>
            {text}
        </StyledButton>
    )
}

export default CustomButton