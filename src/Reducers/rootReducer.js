
import { combineReducers } from 'redux'
import WeekLabelsReducer from './WeekLabelsReducer'
import allStudentDataReducer from './AllStudentDataReducer'
import AverageDifficultyScorePerWeek from './AverageWeekDifficultyReducer'
import selectedWeekReducer from "./SelectedWeekReducer"
import selectedChartReducer from "./SelectedChartReducer"
import StudentNameReducer from './StudentNamesReducer'
import AverageEnjoymentScorePerWeek from './AverageWeekEnjoymentReducer'
import SelectedStudentNames from './SelectedStudentsReducer'
import selectAverageScore from './SelectedAverageScoreTypeReducer'
import StudentRouteData from './StudentRouteDataReducer'

const rootReducer = combineReducers({
    studentData: allStudentDataReducer,
    studentNames: StudentNameReducer,
    weekLabels: WeekLabelsReducer,
    averageWeekDifficulty: AverageDifficultyScorePerWeek,
    averageWeekEnjoyment: AverageEnjoymentScorePerWeek,
    selectedChart: selectedChartReducer,
    selectedWeek: selectedWeekReducer,
    selectedStudents: SelectedStudentNames,
    selectedAverageScoreType: selectAverageScore,
    studentRouteData: StudentRouteData
})

export default rootReducer

