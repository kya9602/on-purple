import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux/';
import { __getProfileDetail } from "../../redux/modules/profile";
import { __getChatrooms } from "../../redux/modules/chatRoom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const ProfileDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //유저의 기본정보 조회
    const profileDetail = useSelector((state) => state.profile)
    const { userId } = useParams();

    const userProfile = profileDetail?.posts?.data
    // console.log(profileDetail)

    useEffect(() => {
        dispatch(__getProfileDetail(userId));
    }, [dispatch])


    // 채팅 방 들어가는 룸 
    const roomkey = useSelector((state) => state.roomlist)
    console.log("채팅방", roomkey)
    useEffect(() => {
        dispatch(__getChatrooms());
        /* console.log("작동"); */
    }, []);




    return (

        <Container>
            <Btnbox>
                <ArrowBackIosIcon className="BackBtn" fontSize="large" onClick={() => { navigate(-1); }}></ArrowBackIosIcon>
            </Btnbox>
            <div>
                <ImageCard
                    src={userProfile?.imageUrl}
                    alt="프로필사진"
                />
            </div>

            <IntroduceCard>
                <div>
                    <h3>{userProfile?.nickname} {userProfile?.age}</h3>
                </div>

                <div>
                    {userProfile?.introduction}
                </div>

                <ButtonContainer>
                    <MatchingButton
                    // onClick={() => navigate(`/chat/${roomId}`)}
                    > 대화하기 💬 </MatchingButton>
                </ButtonContainer>

            </IntroduceCard>
        </Container>
    )
}

export default ProfileDetail;

const Container = styled.div`
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items:center;
    height: 100%;
    width: 428px;
    padding-top: 130px;
    padding-bottom: 45vh;
    background-color: white;
    .BackBtn{
     cursor: pointer;   
    }
`

const Btnbox = styled.div`
    width: 400px;
    padding-bottom: 20px;
`

const ImageCard = styled.img`
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

