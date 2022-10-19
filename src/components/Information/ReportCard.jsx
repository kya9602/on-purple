import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
const ReportCard = ({item}) => {
    console.log(item)
    const navigate = useNavigate();
    const goDetail = () =>{
        navigate(`/reportDetail/${item.reportId}`)
    }
    return(
    <>
        <TableWrapper onClick={()=>goDetail()}>
            <TableNumber>{item.reportId}</TableNumber>
            <TableTitle>{item.title}</TableTitle>
            <TableDate>
                {item.createdAt[0]}-{item.createdAt[1]}-{item.createdAt[2]}
            </TableDate>
        </TableWrapper> 
    </>
    )
}

export default ReportCard;

const TableWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    margin: 0 auto;
    height: 40px;
    border-bottom: 1px solid gray;
`

const TableTitle = styled.div`
    width: 65%;
    overflow: hidden;  		
    text-overflow: ellipsis;  
    white-space: nowrap; 		
    word-break:break-all;
`

const TableDate = styled.div`
    width: 25%;
`
const TableNumber = styled.span`
    text-align: center;
    width: 10%;
`