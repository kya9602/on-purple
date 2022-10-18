import React,{ useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getReports } from "../../redux/modules/report"
import ReportCard from "./ReportCard";
const ReportInfo = () =>{
    const dispatch = useDispatch();
    /* const { isLoading, error, report } = useSelector((state) => state?.report)
    console.log(report)
    useEffect(()=>{
        dispatch(__getReports());
    },[]); */
    return(
        <Container> 
         <ReportCard/>
        </Container>
    )
}

export default ReportInfo;

const Container = styled.div`
    margin: 0 auto;
    margin-top: 100px;
`