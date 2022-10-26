import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux/';
import { __getProfileDetail } from "../../redux/modules/profile";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios"

const ProfileDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //유저의 기본정보 조회
    const profileDetail = useSelector((state) => state.profile)
    const { userId } = useParams();

    const userProfile = profileDetail?.posts?.data
    console.log(profileDetail)

    useEffect(() => {
        dispatch(__getProfileDetail(userId));
    }, [dispatch])


    // 채팅 방 생성 
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_HOST}/chat/rooms`, { userId }, {
                headers: {
                    "Authorization": localStorage.getItem("Authorization"),
                    "RefreshToken": localStorage.getItem("RefreshToken")
                },
            });
            navigate(`/chat`);
        } catch (e) {
            // 서버에서 받은 에러 메시지 출력
            window.alert("오류발생!" + "😭");
        }
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
                <NicknameBox>
                    <Nickname> {userProfile?.nickname} {userProfile?.age}</Nickname>
                </NicknameBox>

                <Introduce>
                    <DDa>"</DDa>
                    {userProfile?.introduction}
                    <DDa>"</DDa>

                </Introduce>
                <Mbti>
                    {userProfile?.mbti}
                </Mbti>

                <br />
                {userProfile?.drink !== "" || userProfile?.smoke !== "" || userProfile?.hobby !== "" || userProfile?.idealType !== "" ||
                    userProfile?.job !== "" || userProfile?.likeMovieType !== "" || userProfile?.pet !== "" ?
                    <Title>🎈 추가적인 정보입니다 🎈</Title> : null
                }
                {userProfile?.drink === "" ?
                    null :
                    <MiniContainer>
                        <MiniTitle> 음주량 🍻 🍸 </MiniTitle>
                        <MiniBody> {userProfile?.drink}</MiniBody>
                    </MiniContainer>
                }

                {userProfile?.smoke === "" ?
                    null :
                    <MiniContainer>
                        <MiniTitle>  흡연유무 🚬 🚭 </MiniTitle>
                        <MiniBody>{userProfile?.smoke}</MiniBody>
                    </MiniContainer>
                }

                {userProfile?.hobby === "" ?
                    null :
                    <MiniContainer>
                        <MiniTitle>  취미 🤔 </MiniTitle>
                        <MiniBody>{userProfile?.hobby}</MiniBody>
                    </MiniContainer>
                }

                {userProfile?.idealType === "" ?
                    null :
                    <MiniContainer>
                        <MiniTitle>   이상형 😘 💘 </MiniTitle>
                        <MiniBody>{userProfile?.idealType}</MiniBody>
                    </MiniContainer>
                }

                {userProfile?.job === "" ?
                    null :
                    <MiniContainer>
                        <MiniTitle>   직업 👔 👜 </MiniTitle>
                        <MiniBody>{userProfile?.job}</MiniBody>
                    </MiniContainer>
                }

                {userProfile?.likeMovieType === "" ?
                    null :
                    <MiniContainer>
                        <MiniTitle>     영화취향 🎬 👀 </MiniTitle>
                        <MiniBody>{userProfile?.likeMovieType}</MiniBody>
                    </MiniContainer>
                }

                {userProfile?.pet === "" ?
                    null :
                    <MiniContainer>
                        <MiniTitle>  반려동물 😻 🐶 </MiniTitle>
                        <MiniBody> {userProfile?.pet}</MiniBody>
                    </MiniContainer>
                }
            </IntroduceCard>

            <ButtonContainer>
                <MatchingButton
                    onClick={handleSubmit}
                > 대화하기 💬 </MatchingButton>
            </ButtonContainer>
        </Container>
    )
}

export default ProfileDetail;

const Container = styled.div`
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items:center;
    height: 100vh;
    width: 100%;
    overflow-y:auto ;
    &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(250, 213, 213, 0.4);
     }
     &::-webkit-scrollbar-thumb {
    background: rgba(252, 112, 112, 0.3);
    border-radius: 6px;
  }
    /* padding-bottom: 45vh; */
    background-color: white;
    .BackBtn{
     cursor: pointer;   
    }
`

const Btnbox = styled.div`
    width: 380px;
    padding-bottom: 20px;
    padding-top : 120px;
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
    margin-top: 80px;
    margin-bottom: 100px;
    background-color: red;
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
    height: auto;
    padding-left: 10px;
    padding-bottom: 20px;
    word-break: keep-all;
    border-radius:20px;
    border: 1px solid pink;
    border: 1px solid gray;
    box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
`

const NicknameBox = styled.div`
    display: flex;
    justify-content: center;
    margin-top : 20px;
    margin-bottom: 20px;
`
const Nickname = styled.div`
    font-size: 18px;
    font-weight: bold;
`

const Introduce = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    font-size: 14px;
`

const DDa = styled.div`
    font-size: 18px;
    font-weight: bold;
    color : #f08899;
    margin-right: 15px;
    margin-left: 15px;
`

const Mbti = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`

const Title = styled.div`
    background-color : pink ;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    padding: 2%;
    width: 250px;
    font-size: 16px;
    margin-bottom: 20px;
`

const MiniContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center ;
    margin-top:10px ;
`

const MiniTitle = styled.div`
    background-color: #e9d8e9;
    border-radius: 10px;
    width: 140px;
    text-align: center;
`

const MiniBody = styled.div`
    border-bottom:2px solid #f797f7; 
    width: 220px;
    text-align: center;
    margin-top: 5px;
`