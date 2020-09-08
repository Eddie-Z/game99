import React, {useEffect,useState} from 'react'
import {CardLayout} from './Layout.component'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top:32px;
`

const Button = styled.button`
    color:white;
    background-color: ${props => props.type === "down" ? "red" :"blue"};
    padding: 16px 8px;
    border: 3px solid violet;
    border-radius:4px;
    min-width:60px;
`

const DownButton = styled(Button)`
    color:red;
`



export const ButtonsTab = (props) => {
    return (
       <ButtonWrapper>
           <Button name="down" type="down" onClick={props.onButtonClick}>Up</Button>
           <Button name="up" onClick={props.onButtonClick}>Down</Button>
       </ButtonWrapper>
    )
}
