import React from 'react'
import styled from 'styled-components'
import LoaderSvg from '../Images/Loader.svg'


const LoaderContainer = styled.div`
display: flex;
height: 100vh;
flex-direction: column;
background-color: #282C38;
justify-content: center;
align-items: center;
`

const Loader = () => {
    return <LoaderContainer>
        <img src={LoaderSvg} alt="Loader"></img>
    </LoaderContainer>
}

export default Loader