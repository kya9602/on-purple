import React from "react";
import styled from "styled-components";


const Desc = () => {
    return(
        <Container>
            <Box>
                <p>제목</p>
            </Box>
            <Box>
                <p>Desc</p>
            </Box>
            <Box>
                <p>Desc</p>
            </Box>
            <Box>
                <p>Desc</p>
            </Box>
        </Container>
    )
}

export default Desc;

const Box = styled.div`
    margin: 0 auto;
    margin-top: 30px;
    box-shadow: 5px 5px 5px pink;
    border: 1px solid pink;
    border-radius: 30px;
    
    width: 300px;
    height: 50px;
    
    font-size: 15px;
`
const Container = styled.div`
    text-align: center;
`