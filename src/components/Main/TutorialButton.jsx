import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
const TutorialButton = () =>{
    const navigate = useNavigate();
    return(
        <Container>
            <GoTutorial onClick={()=>navigate(`/tutorial`)}>Guide 🧐</GoTutorial>
        </Container>
    )
}

export default TutorialButton;

const Container = styled.div`
    margin-left: 70%;
`

const GoTutorial = styled.button`
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
    background: #B7ABFF;
    animation: research-widget 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    border-radius: 3em;
    border: none;
    height: 40px;
    width: 100px;
    z-index: 2;
    position: fixed;
    font-weight: bold;
    font-size: 15px;
    
    @keyframes research-widget {
    from {
    background: #60A6FB;
    bottom: 10%;
    }

    to {
    bottom: 12%;
    }
    }
`