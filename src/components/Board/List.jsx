import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom/dist";

const List = () => {
    
    return (
        <Wrapper to="/detail">
            <Container>
               
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