import React, { useEffect } from "react";
import styled from "styled-components";
/* import { useDispatch, useSelector } from 'react-redux/';
import { __getProfileDetail } from "../../redux/modules/profile"; */
const ProfileDetail = () => {
    /* const dispatch = useDispatch();
    const profileDetail = useSelector((state)=> state.profile)
    console.log(profileDetail)

    useEffect(()=>{
        dispatch(__getProfileDetail());
    },[dispatch]) */

    return (
        <Container>
            <div>
                <ImageCard></ImageCard>
            </div>

            <IntroduceCard>
                <div>
                    <h3>Nickname 나이</h3>
                </div>

                <div>
                    안녕하세요~
                    친구 같은 연애를 하고 싶습니다!
                    술을 즐기는 사이가 되고싶어요~
                </div>

                <ButtonContainer>
                    <MatchingButton> 대화하기 💬 </MatchingButton>
                </ButtonContainer>

            </IntroduceCard>
        </Container>
    )
}

export default ProfileDetail;

const Container = styled.div`
    margin-top: 150px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items:center;
    height: auto;
    width: 430px;
`

const ImageCard = styled.div`
    background-image: url(http://www.joseilbo.com/gisa_img_origin/16546678821654667882_joseedu_origin.jpg);
    width: 200px;
    height: 200px;
    border-radius:20px;
    background-size: cover;
    background-position: center;
    box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`


const ButtonContainer = styled.div` 
    display: flex;
    justify-content: center;
    align-items:center;
    margin-top: 100px;
`

const MatchingButton = styled.button`
    border: 1px solid skyblue;
    padding: 4%;
    cursor: pointer;
    font-weight: 600;
    font-size:16px;
    background-color: white;

    :hover{
        border: 1px solid skyblue;
        background-color: skyblue;
        font-weight: 600;
        font-size:16px;
        padding: 4%;

    }
`

const IntroduceCard = styled.div`
    margin-top: 20px;
    width: 350px;
    height: 150px;
    word-break: keep-all;
    border-radius:20px;
    border: 1px solid gray;
    box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3)
`

