import React,{ useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getReports } from "../../redux/modules/report"
import ReportCard from "./ReportCard";
const ReportInfo = () =>{
    const dispatch = useDispatch();
    const { isLoading, error, report } = useSelector((state) => state?.report)
    /* console.log(report) */
    useEffect(()=>{
        dispatch(__getReports());
    },[]);
    return(
        <Container>
            <TableWrapper>
                <TableNumber>No.</TableNumber>
                <TableTitle>문의내용</TableTitle>
                <TableDate>등록일시</TableDate>
            </TableWrapper> 
            {report.map((item)=>(<ReportCard item={item} key={item.reportId}/>))}
        </Container>
    )
}

export default ReportInfo;

const Container = styled.div`
    border-top: 3px solid black;
    margin: 0 auto;
    margin-top: 100px;
`
const TableWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    margin: 0 auto;
    height: 40px;
    border-bottom: 1px solid gray;
`
const TableNumber = styled.div`
    width:10%;
`
const TableTitle = styled.div`
    width: 65%;
`

const TableDate = styled.div`
    width: 25%;
`