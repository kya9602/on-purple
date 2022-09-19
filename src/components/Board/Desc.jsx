import React from "react";
import styled from "styled-components";


const Desc = () => {
    return(
        <Wrap>
            <Box>
                <p>음식점 이름</p>
            </Box>
            <Box>
                <p>위치</p>
            </Box>
            <Box>
                <p>추천 메뉴</p>
            </Box>
            <Box>
                <p>가격</p>
            </Box>
        </Wrap>
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
const Wrap = styled.div`
    text-align: center;
`