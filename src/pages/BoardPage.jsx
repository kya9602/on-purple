import React from "react";
import Footer from "../components/Footer/Footer";
import List from "../components/Board/List";
import Header from "../components/Header/Header"
const Board = () => {

    return (
        <>
            <Header/>
            <div style={{marginTop:"80px"}}>
            <List/>
            </div>
        </>
    )
}


export default Board;