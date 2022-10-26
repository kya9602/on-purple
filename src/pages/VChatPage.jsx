import React from "react";
import styled from "styled-components";
import VideoChatConnect from "../components/VideoChat/VideoChatConnect";
import image from "../assets/images/배경화면으로.jpg"
const VChatPage = () => {
    /* 화상 마이크 권한 요청 */ 
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(function(stream) {
        /* 스트림 사용 */
        })
        .catch(function(err) {
        /* 오류 처리 */
    });
    return (
        <BackImage>
            <Container>
                <VideoChatConnect />
            </Container>
        </BackImage>

    )
}

export default VChatPage;


const Container = styled.div`
    max-width: 428px;
    width : 100%;
    height: 100%;
    margin:0 auto;
    background-color: white;
`
const BackImage = styled.div`
background: url(${image});
background-size: cover;
height: 100vh;
`