import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import Footer from "../components/Footer/Footer";
import List from "../components/Board/List";

const Board = () => {
   
    const navigate = useNavigate();

    return (
        <>
            <Button variant="outlined" color="primary" onClick={()=>navigate("/post")} >글쓰기🖊️</Button>
            <List/>
            <Footer />
        </>

    )
}


export default Board;