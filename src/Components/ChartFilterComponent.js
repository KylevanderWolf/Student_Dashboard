import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import FilterListIcon from '@material-ui/icons/FilterList';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectWeek } from '../Actions/SelectedWeek'
import { selectChart } from '../Actions/SelectChart'
import { CorrectWeekLabels } from '../Actions/CorrectWeekLabels'
import { AverageWeekDifficulty } from '../Actions/AverageWeekDifficultyScore'
import { AverageWeekEnjoyment } from "../Actions/AverageWeekEnjoymentScore"
import { StudentNames } from "../Actions/CorrectStudents"
import { SelectedStudentNames } from '../Actions/SelectedStudentNames'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

//STYLING
const FilterContainer = styled.div`
width: 300px;
height: auto;
color: #a2a2a2;
background-color: ${props => props.theme.containerBg};
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 10px;
border-radius: 5px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
const FilterHeader = styled.div`
  height: 5vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.background};
  background-color: ${props => props.theme.containerBg};
`
const FilterIcon = styled(FilterListIcon)`
display: flex;
margin: 0px 5px;
`
const Text = styled(Typography)`
display: flex;
justify-content: center;
align-items: center;
`


const RadioButtonContainer = styled(RadioGroup)`
&& {
    &.MuiFormGroup-root {
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${props => props.direction};
}
display: flex;
padding: 10px;
border: 2px solid ${props => props.theme.background};
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
margin-bottom: 10px;
border-radius: 5px;
width: 100%;
}
`
const StyledRadioButton = styled(Radio)`
&& {
&.MuiRadio-root:hover {
    background: transparent;
}
&.Mui-checked {
color: #4B86C0;
}
}
`

const WeekRadioButtons = styled(FormControlLabel)`
&&{
    display: flex;  
    width: auto;
}
`
const CheckboxContainer = styled(FormGroup)`
&&{
display: flex;
justify-content: space-around;
align-items: center;
flex-wrap: wrap;
padding: 10px;
border: 2px solid ${props => props.theme.background};
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
margin-bottom: 10px;
border-radius: 5px;
}
`

const StudentCheckBoxItem = styled(FormControlLabel)`
&& {    
display: flex;
height: auto;
width: 120px;
}
`

const StyledCheckbox = styled(Checkbox)`
&& {
    &.MuiCheckbox-root:hover {
    background: transparent;
}
&.Mui-checked {
color: #4B86C0;
}
}
`

const ChartFilterComponent = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const allDataStudents = useSelector(state => state.studentData)
    const currentWeekLabels = useSelector(state => state.weekLabels)
    const currentStudentsNames = useSelector(state => state.studentNames)
    const selectedStudentNames = useSelector(state => state.selectedStudents)
    const [filteredStudentData, setFilteredStudentData] = useState(allDataStudents)
    const [selectoptions, setSelectOptions] = useState({
        chart: "Bar",
        week: "W1"
    })

    //ALL STUDENT NAMES
    useEffect(() => {
        const studentNames = allDataStudents.map(e => e.Name).filter((el, i, array) => array.indexOf(el) === i);
        dispatch(StudentNames(studentNames))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allDataStudents])


    // CORRECT TASK LABELS FOR CHART
    const FindCorrectWeekLabels = () => {
        const WeekLabels = allDataStudents
            .filter(e => e.Task.includes(selectoptions.week))
            .map(e => e.Task)
            .filter((el, i, a) => a.indexOf(el) === i)
        dispatch(CorrectWeekLabels(WeekLabels))
    }

    //UPDATE REDUX STATE, TASK LABELS FOR SELECTED WEEK
    useEffect(() => {
        FindCorrectWeekLabels()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allDataStudents, selectoptions.week])


    //UPDATE REDUX WITH SELECTED CHART TYPE
    useEffect(() => {
        dispatch(selectChart(selectoptions.chart))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectoptions.chart])

    //UPDATE REDUX STATE, SELECTED WEEK 
    useEffect(() => {
        dispatch(selectWeek(selectoptions.week))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectoptions.week])

    //HANDLE RADIO BUTTONS FOR SELECTED WEEK && CHART
    const handleRadioButtons = (e) => {
        const { name, value } = e.target
        setSelectOptions({ ...selectoptions, [name]: value })
    };

    //HANDLE CHECKBOX FOR SELECTED STUDENTS
    const checkedStudentsData = currentStudentsNames.reduce((ac, a) => ({ ...ac, [a]: true }), {})
    const [checkedStudents, setcheckedStudents] = useState(checkedStudentsData);
    const handleCheckbox = (e) => {
        const { name, checked } = e.target
        setcheckedStudents({ ...checkedStudents, [name]: checked })
    }

    //All CHECKBOX ITEMS FOR INCLUDING STUDENTS
    const allCheckBoxes = currentStudentsNames.map((studentName, i) =>
        <StudentCheckBoxItem
            key={i}
            control={<StyledCheckbox checked={checkedStudents[studentName]} onChange={handleCheckbox} name={studentName} />}
            label={studentName}
        />)

    //SELECTED STUDENT NAME(S) ARRAY
    useEffect(() => {
        const includedStudents = currentStudentsNames.filter(studentName => checkedStudents[studentName] !== false)
        dispatch(SelectedStudentNames(includedStudents))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedStudents])


    //FILTER ALL DATA BY SELECTED STUDENT NAMES
    useEffect(() => {
        const filteredStudentData = allDataStudents.filter(studentData => selectedStudentNames.includes(studentData.Name));
        setFilteredStudentData(filteredStudentData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStudentNames])


    //FIND CORRECT AVERAGE DIFFICULTY SCORE FOR SELECTED STUDENTNAMES & WEEK
    const FindAverageWeekDifficultyScore = () => {
        const correctDifficultyScore = currentWeekLabels.map(taskLabel => filteredStudentData
            .filter(e => e.Task.includes(taskLabel))
            .map(e => e.Difficulty))
        const totalScorPerTask = correctDifficultyScore.map(e => e.reduce((a, b) => parseInt(a) + parseInt(b), 0))
        const averageScorePerTask = totalScorPerTask.map(e => (Math.round((e / selectedStudentNames.length) * 100) / 100).toFixed(2))
        dispatch(AverageWeekDifficulty(averageScorePerTask))
    }


    //FIND CORRECT AVERAGE ENJOYMENT SCORE FOR SELECTED STUDENTNAMES & WEEK
    const FindAverageWeekEnjoymentScore = () => {
        const correctDifficultyScore = currentWeekLabels.map(taskLabel => filteredStudentData
            .filter(e => e.Task.includes(taskLabel))
            .map(e => e.Enjoyment))
        const totalScorPerTask = correctDifficultyScore.map(e => e.reduce((a, b) => parseInt(a) + parseInt(b), 0))
        const averageScorePerTask = totalScorPerTask.map(e => (Math.round((e / selectedStudentNames.length) * 100) / 100).toFixed(2))
        dispatch(AverageWeekEnjoyment(averageScorePerTask))
    }

    //DISPATCH AVERAGE DIFFICULTY SCORE FOR SELECTED WEEK & SELECTED STUDENTS
    useEffect(() => {
        FindAverageWeekDifficultyScore()
        FindAverageWeekEnjoymentScore()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWeekLabels, currentStudentsNames, filteredStudentData])

    return <FilterContainer>
        <FilterHeader>
            <FilterIcon /> <Text variant="subtitle1" justify="center">Filter</Text>
        </FilterHeader>

        <Typography variant="h6" gutterBottom>Chart</Typography>
        <RadioButtonContainer value={selectoptions.chart} name="chart" onChange={handleRadioButtons}>
            <FormControlLabel value="Bar" control={<StyledRadioButton />} label="Bar" />
            <FormControlLabel value="Line" control={<StyledRadioButton />} label="Line" />
        </RadioButtonContainer>


        <Typography variant="h6" gutterBottom>Week</Typography>
        <RadioButtonContainer row={true} value={selectoptions.week} name="week" onChange={handleRadioButtons}>
            <WeekRadioButtons value="W1" control={<StyledRadioButton />} label="1" />
            <WeekRadioButtons value="W2" control={<StyledRadioButton />} label="2" />
            <WeekRadioButtons value="W3" control={<StyledRadioButton />} label="3" />
            <WeekRadioButtons value="W4" control={<StyledRadioButton />} label="4" />
            <WeekRadioButtons value="W5" control={<StyledRadioButton />} label="5" />
            <WeekRadioButtons value="W6" control={<StyledRadioButton />} label="6" />
        </RadioButtonContainer>


        {location.pathname === "/" && <>
            <Typography variant="h6" gutterBottom>Students ({selectedStudentNames.length})</Typography>
            <CheckboxContainer row={true}>
                {allCheckBoxes}
            </CheckboxContainer>
        </>}

    </FilterContainer>
}

export default ChartFilterComponent