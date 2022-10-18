import React from "react";
import NewSignup from "../components/Form/NewSignup";
import styled from "styled-components";
const NewSignUpPage = () => {
    return (
        <Container>
            <NewSignup />
        </Container>
    );
}

export default NewSignUpPage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
`