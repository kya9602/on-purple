import React, { useEffect } from "react";
import styled from "styled-components";
/* import { useDispatch, useSelector } from 'react-redux/';
import { __getProfileDetail } from "../../redux/modules/profile"; */
const Profile_Detail = () => {
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
                <MatchingButton> 대화하기 </MatchingButton>
            </ButtonContainer>
            
        </IntroduceCard>
        </Container>
    )
}

export default Profile_Detail;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    min-height: 100vh;
`

const ImageCard = styled.div`
    background-image: url(http://www.joseilbo.com/gisa_img_origin/16546678821654667882_joseedu_origin.jpg);
    width: 350px;
    height: 50vh;
    border-radius:20px;
    background-size: cover;
    background-position: center;
    box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`
const MatchingButton = styled.button`
`

const ButtonContainer = styled.div` 
    display: flex;
    justify-content: center;
    align-items:center;
    margin-top: 270px;
`



const IntroduceCard = styled.div`
    margin-left: 20px;
    width: 350px;
    height: 50vh;
    border-radius:20px;
    border: 1px solid gray;
    box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3)
`

