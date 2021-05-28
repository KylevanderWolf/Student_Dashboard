import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";
import BarChart from '../Components/BarChart'
import LineChart from '../Components/LineChart'
import { Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { SelectedAverageScoreType } from '../Actions/SelectedAverageScoreType'

//STYLING
const Container = styled.div`
height: auto;
display: flex;
padding: 0px 20px;
justify-content:center;
flex-direction: column;
align-items: center;
border-radius: 5px;
background: red;
width: 100%;
background-color: ${props => props.theme.containerBg};
`

const ChartContainer = styled.div`
min-height: 60vh;
max-height: auto;
margin-bottom: 20px;
padding: 50px 20px;
width: 100%;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
border: 2px solid ${props => props.theme.background};
background-color: ${props => props.theme.containerBg};
border-radius: 5px;
`

const ChartHeader = styled(Typography)`
color: #a2a2a2;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
`
const LegendLabelsContainer = styled(FormGroup)`
&&{
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
padding: 10px;
width: 100%;
margin-bottom: 20px;
border-radius: 5px;
}
`

const LegenCheckboxLabel = styled(FormControlLabel)`
&& {    
display: flex;
height: auto;
width: auto;
color: #a2a2a2;
border: 2px solid ${props => props.theme.background};
display: flex;
padding: 0px 10px;
margin: 0px 20px;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.containerBg};
border-radius: 5px;
box-shadow:rgba(0, 0, 0, 0.35) 0px 5px 15px;
&:hover {
  box-shadow: none;
  transition: 0.2s ease-in-out
}
}
`

const StyledCheckbox = styled(Checkbox)`
&& {
&.MuiCheckbox-root:hover {
    background: transparent;
}
&.Mui-checked {
color: ${props => props.checkedcolor};
}
}
`

const ChartComponent = () => {
    const currentChart = useSelector(state => state.selectedChart)
    const dispatch = useDispatch()
    const selectedAverageScoreType = useSelector(state => state.selectedAverageScoreType)

    //HANDLE CHECKED STATE FOR INCLUDING AVERAGE SCORE (DIFFICULTY || ENJOYMENT)
    const handleCheckbox = (e) => {
        const { name } = e.target
        dispatch(SelectedAverageScoreType({ ...selectedAverageScoreType, [name]: !selectedAverageScoreType[name] }))
    }

    return <Container>
        <ChartHeader variant="h4">Average Score </ChartHeader>
        <ChartHeader variant="subtitle1">Assignments</ChartHeader>
        <ChartContainer>
            {currentChart === "Bar" ? <BarChart /> : <LineChart />}
        </ChartContainer>
        <LegendLabelsContainer row={true}>
            <LegenCheckboxLabel
                name="difficulty"
                control={<StyledCheckbox checkedcolor="#FF6384" checked={selectedAverageScoreType.difficulty} onChange={handleCheckbox} />}
                label='Difficulty'
            />
            <LegenCheckboxLabel
                name="enjoyment"
                control={<StyledCheckbox checkedcolor="#4BC0C0" checked={selectedAverageScoreType.enjoyment} onChange={handleCheckbox} />}
                label="Enjoyment"
            />
        </LegendLabelsContainer>
    </Container>
}


export default ChartComponent