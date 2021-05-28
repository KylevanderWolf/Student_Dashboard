import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import styled from "styled-components";
import ChartFilterComponent from './ChartFilterComponent'
import { allStudentData } from "../Actions/AllStudentData"
import studentData from '../DataSheet/StudentData.csv'
import { csv } from "d3"
import Loader from '../Components/Loader'
import { StudentNames } from "../Actions/CorrectStudents"
import Appbar from '../Components/Appbar'
import ChartComponent from '../Components/ChartComponent'
import { Grid } from '@material-ui/core';


const ContentContainer = styled(({ ...props }) => (<Grid {...props} />))`
  height: auto;
  margin: 0px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px;
`

const ChartContainer = styled(({ ...props }) => (<Grid {...props} />))`
  min-height: 60vh;
  max-height: auto;
  width: 100%;
  
`

const FilterContainer = styled(({ ...props }) => (<Grid {...props} />))`
box-shadow: none;
box-sizing: border-box;
padding: 20px;
${props => props.theme.breakpoints.down("md")} {
    margin-bottom: 30px;
  }
`


const HomePage = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const GetUserData = async () => {
      const StudentData = await csv(studentData)
      const allStudentNames = StudentData.map(e => e.Name).filter((el, i, array) => array.indexOf(el) === i);
      dispatch(allStudentData(StudentData));
      dispatch(StudentNames(allStudentNames))
      setLoading(false)
    }
    GetUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (loading === false ?
    <div>
      <Appbar />
      <ContentContainer container justify="center">

        <ChartContainer item xs={11} sm={11} md={6} lg={6} xl={6}>
          <ChartComponent />
        </ChartContainer>

        <FilterContainer align="center" item xs={12} sm={12} md={4} lg={4} xl={4}>
          <ChartFilterComponent />
        </FilterContainer>

      </ContentContainer>
    </div> :
    <Loader />)
}


export default HomePage;
