import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom/dist";
import Card from "./Card";

const List = () => {

    return (
        <Wrapper>
            <Card />
        </Wrapper>

    )
}

export default List;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4vw;
    margin: 0 auto;
    margin-left: 1vw;
    margin-top: 10px;
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
