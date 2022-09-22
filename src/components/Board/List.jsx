import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom/dist";

const List = () => {
    
    return (
        <Container to="/detail">
            <Wrapper>
            
            </Wrapper>
        </Container>
    )
}

export default List;

const Wrapper = styled.div`
    display: flex;
    padding-bottom: 20px;
`
const Container = styled(Link)`
  margin-left: 6px;
  flex-shrink: 0;
  width: 264.75px;
  height: 100%;
  position: relative;
  transition-property: transform;
  text-decoration: none;
  color: inherit;
`;
