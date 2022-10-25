import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getReports } from "../../redux/modules/report"
import ReportCard from "./ReportCard";
const ReportInfo = () => {
    const dispatch = useDispatch();
    const { isLoading, error, report } = useSelector((state) => state?.report)
    /* console.log(report) */
    useEffect(() => {
        dispatch(__getReports());
    }, []);
    return (
        <Container>
            <TableWrapper>
                <TableNumber>No.</TableNumber>
                <TableTitle>문의내용</TableTitle>
                <TableDate>등록일시</TableDate>
                {/* <TableState>진행상태</TableState> */}
            </TableWrapper>
            {report.map((item) => (<ReportCard item={item} key={item.reportId} />))}
        </Container>
    )
}

export default ReportInfo;

const Container = styled.div`
    margin: 0 auto;
    height: 100vh;
    overflow-y: auto;
    background-color: white;
    &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(250, 213, 213, 0.4);
     }
     &::-webkit-scrollbar-thumb {
    background: rgba(252, 112, 112, 0.3);
    border-radius: 6px;
  }
`
const TableWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    margin: 0 auto;
    padding-top: 70px;
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
/* const TableState = styled.div`
    width: 20%;
` */