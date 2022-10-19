import React from "react";
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header";
import ProfileDetail from "../components/Profile/ProfileDetail";

import styled from "styled-components";

const ProfilePage = () => {
    return (
        <Container>
            <Header />
            <ProfileDetail />
            <Footer />
        </Container>



    )
}

export default ProfilePage;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
`