import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Appbar from '../Components/Appbar'
import ChartComponent from '../Components/ChartComponent'
import ChartFilterComponent from '../Components/ChartFilterComponent'
import { Typography } from '@material-ui/core';
import ReactSpeedometer from "react-d3-speedometer"
import { studentRouteData } from "../Actions/StudentRouteData"
import { Grid } from '@material-ui/core';


//STYLING
const Container = styled.div`
height: auto;
display: flex;
flex-direction: column;
align-items: center;
`
const ContentContainer = styled(({ ...props }) => (<Grid {...props} />))`
width: 100%;
height: auto;
padding: 10px;
display: flex;
justify-content: space-around;
align-items: center;
flex-wrap: wrap;
`

const UserContainer = styled(({ ...props }) => (<Grid {...props} />))`
width: 100%;
height: auto;
display: flex;
flex-direction: column;
align-items: space-around;
padding: 20px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
border: 2px solid ${props => props.theme.background};
background-color: ${props => props.theme.containerBg};
${props => props.theme.breakpoints.down("md")} {
    margin-bottom: 30px;
    height: 320px;
  }
`
const UserHeader = styled.div`
display: flex;
align-items: center;
width: auto;
justify-content: center;
flex-direction: column;
padding: 10px;
border-bottom: 2px solid ${props => props.theme.background};
background-color: ${props => props.theme.containerBg};
`
const MetersContainer = styled.div`
height: auto;
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px 10px;
${props => props.theme.breakpoints.down("md")} {
    flex-direction: row;
    width: 100%;
  }
`
const ScoreMeterContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 5px 0px;
margin-top: 20px;
width: 100%;
`
const Text = styled(Typography)`
&&{color: #a2a2a2;
}
`

const ChartContainer = styled(({ ...props }) => (<Grid {...props} />))`
width: 100%;
height: auto;
display: flex;
justify-content: center;
align-items: center;
${props => props.theme.breakpoints.down("md")} {
    margin-bottom: 30px;
  }
`

const FilterContainer = styled(({ ...props }) => (<Grid {...props} />))`
width: auto;
height: auto;
display: flex;
justify-content: center;
align-items: center;
${props => props.theme.breakpoints.down("md")} {
    margin-bottom: 50px;
  }
`

const UserProfile = () => {
    const dispatch = useDispatch()
    const { studentname } = useParams()
    const history = useHistory()
    const allDataStudents = useSelector(state => state.studentData)
    const allStudentNames = useSelector(state => state.studentNames)
    const SelectedWeek = useSelector(state => state.selectedWeek)
    const StudentParamCheck = allStudentNames.includes(studentname)
    const [totalAverageDifficulty, setTotalAverageDifficulty] = useState(0)
    const [totalAverageEnjoyment, setTotalAverageEnjoyment] = useState(0)
    const TotalAssignments = allDataStudents.filter(e => e.Name.includes(studentname)).length
    const [currentStudentData, setCurrentStudentData] = useState([])

    //REDIRECT IF URL PARAM IS NOT INCLUDING CORRECT STUDENT NAME & SET STATE CORRECT STUDENT DATA
    useEffect(() => {
        StudentParamCheck !== true && history.push("/")
        setCurrentStudentData(allDataStudents.filter(e => e.Name === studentname))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentname])


    //GET DATA AVERAGE DIFFICULTY SCORE (ALL ASSIGNMENTS) FOR SPEEDOMETER
    useEffect(() => {
        const AverageDifficultyScore = allDataStudents
            .filter(e => e.Name === studentname)
            .map(e => e.Difficulty)
            .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
        const RoundedAverageDifficultyScore = (Math.round((AverageDifficultyScore / TotalAssignments) * 100) / 100).toFixed(2)
        setTotalAverageDifficulty(parseFloat(RoundedAverageDifficultyScore))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentname])

    //GET DATA TOTAL AVERAGE ENJOYMENT SCORE (ALL ASSIGNMENTS) FOR SPEEDOMETER
    useEffect(() => {
        const AverageEnjoymentScore = allDataStudents
            .filter(e => e.Name === studentname)
            .map(e => e.Enjoyment)
            .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
        const RoundedAverageEnjoymentScore = (Math.round((AverageEnjoymentScore / TotalAssignments) * 100) / 100).toFixed(2)
        setTotalAverageEnjoyment(parseFloat(RoundedAverageEnjoymentScore))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentname])


    //FIND CORRECT AVERAGE DIFFICULTY & ENJOYMENT SCOREs FOR CURRENT STUDENT & SELECTED WEEK 
    useEffect(() => {
        const correctWeekDifficultyScoreArray = currentStudentData.filter(e => e.Task.includes(SelectedWeek)).map(e => e.Difficulty)
        const correctWeekEnjoymentScoreArray = currentStudentData.filter(e => e.Task.includes(SelectedWeek)).map(e => e.Enjoyment)
        const StudentChartData = {
            Week: SelectedWeek,
            Difficulty: correctWeekDifficultyScoreArray,
            Enjoyment: correctWeekEnjoymentScoreArray
        }
        dispatch(studentRouteData(StudentChartData))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStudentData, SelectedWeek])


    return <Container>
        <Appbar />
        <ContentContainer container>
            <UserContainer item xs={11} sm={10} md={10} lg={2} xl={3}>
                <UserHeader>
                    <Text variant="h5">{studentname}</Text>
                    <Text variant="h6" gutterBottom>Average Score</Text>
                    <Text variant="subtitle2" gutterBottom>(All Assignments Included)</Text>
                </UserHeader>

                <MetersContainer>
                    <ScoreMeterContainer>
                        <Text variant="subtitle2" gutterBottom>Difficulty</Text>
                        <ReactSpeedometer
                            width={150}
                            height={150}
                            needleHeightRatio={0.6}
                            maxValue={5}
                            value={totalAverageDifficulty}
                            ringWidth={15}
                            needleColor='rgba(255, 99, 132, 0.2)'
                            segments={5}
                            segmentColors={['rgba(255, 99, 132, 0.2)']}
                        />
                    </ScoreMeterContainer>
                    <ScoreMeterContainer>
                        <Text variant="subtitle2" gutterBottom>Enjoyment</Text>
                        <ReactSpeedometer
                            width={150}
                            height={150}
                            needleHeightRatio={0.6}
                            maxValue={5}
                            value={totalAverageEnjoyment}
                            ringWidth={15}
                            needleColor='rgba(75, 192, 192, 0.2)'
                            segments={5}
                            segmentColors={['rgba(75, 192, 192, 0.2)']}
                        />
                    </ScoreMeterContainer>
                </MetersContainer>
            </UserContainer>

            <ChartContainer item xs={12} sm={8} md={8} lg={6} xl={9}>
                <ChartComponent />
            </ChartContainer>

            <FilterContainer item xs={12} sm={3} md={3} lg={3} xl={9}>
                <ChartFilterComponent />
            </FilterContainer>

        </ContentContainer>
    </Container >
}


export default UserProfile