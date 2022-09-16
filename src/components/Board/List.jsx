import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom/dist";

const List = () => {
    
    return (
        <Wrapper to="/detail">
            <Container>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wwSYTGe4f5X2qxdg-032_8KnECWsNkURN6Jmk8OTM6CjE9ryOG7HtmUz0BFv5JUV8LE&usqp=CAU" alt="이미지 입니다"/>  
            </Container>
        </Wrapper>
    )
}

export default List;

const Container = styled.div`
    display: flex;
    padding-bottom: 20px;
`
const Wrapper = styled(Link)`
  margin-left: 6px;
  flex-shrink: 0;
  width: 264.75px;
  height: 100%;
  position: relative;
  transition-property: transform;
  text-decoration: none;
  color: inherit;
`;