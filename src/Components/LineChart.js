import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'
import { useParams, useLocation } from "react-router-dom";

const LineChart = () => {
    const { studentname } = useParams()
    const location = useLocation()
    const correctWeekLabels = useSelector(state => state.weekLabels)
    const averageWeekDifficultyArray = useSelector(state => state.averageWeekDifficulty)
    const averageWeekEnjoymentArray = useSelector(state => state.averageWeekEnjoyment)
    const selectedAverageScoreType = useSelector(state => state.selectedAverageScoreType)
    const currentStudentRouteData = useSelector(state => state.studentRouteData)
    const [correctWeekDifficultyScore, setCorrectWeekDifficultyScore] = useState()
    const [correctWeekEnjoymentScore, setCorrectWeekEnjoymentScore] = useState()

    //EXCLUDE OR INCLUDE SCORE (DIFFICULTY || ENJOYMENT)
    //IF URL PARAM CONTAINS STUDENT NAME? CHANGE DIFFICULTY DATA IN CHART FOR ONLY THAT SPECIFIC STUDENT
    useEffect(() => {
        selectedAverageScoreType.difficulty === false ? setCorrectWeekDifficultyScore([]) :
            setCorrectWeekDifficultyScore(location.pathname.includes(studentname) ? currentStudentRouteData.Difficulty : averageWeekDifficultyArray)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [averageWeekDifficultyArray, selectedAverageScoreType, studentname, currentStudentRouteData])


    //EXCLUDE OR INCLUDE SCORE (DIFFICULTY || ENJOYMENT)
    //IF URL PARAM CONTAINS STUDENT NAME? CHANGE ENJOYMENT DATA IN CHART FOR ONLY THAT SPECIFIC STUDENT
    useEffect(() => {
        selectedAverageScoreType.enjoyment === false ? setCorrectWeekEnjoymentScore([]) :
            setCorrectWeekEnjoymentScore(location.pathname.includes(studentname) ? currentStudentRouteData.Enjoyment : averageWeekEnjoymentArray)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [averageWeekEnjoymentArray, selectedAverageScoreType, studentname, currentStudentRouteData])


    return (
        <Line
            data={{
                labels: correctWeekLabels,
                datasets: [
                    {
                        label: 'Difficulty',
                        data: correctWeekDifficultyScore,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Enjoyment',
                        data: correctWeekEnjoymentScore,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            }}
            options={{
                animations: false,
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 0,
                        max: 6
                    },
                },
                layout: {
                    padding: {
                        top: 5,
                        left: 15,
                        right: 15,
                        bottom: 5
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                        position: "top",
                        labels: {
                            color: "#a2a2a2",
                            padding: 10,
                        },
                    },
                    tooltip: {
                        titleColor: "white",
                        titleAlign: "center",
                        bodySpacing: 10,
                        caretSize: 5,
                        backgroundColor: "#121212",
                        padding: 20,
                        titleSpacing: 20,
                        callbacks: {
                            labelColor: context => {
                                return {
                                    borderColor: context.dataset.borderColor,
                                    backgroundColor: context.dataset.borderColor,
                                    borderRadius: 2,
                                };
                            },
                            labelTextColor: context => "#a2a2a2",
                        }
                    }
                }

            }
            }
        />
    )
}

export default LineChart