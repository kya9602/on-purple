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


    // 채팅 방 들어가는 룸 
   const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
          await axios.post(`${process.env.REACT_APP_HOST}/chat/rooms`,{userId}, {
            headers: {
              "Authorization": localStorage.getItem("Authorization"),
              "RefreshToken": localStorage.getItem("RefreshToken") 
            },
          });
          window.alert("😎생성😎");
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
                <div>
                    <h3>{userProfile?.nickname} {userProfile?.age}</h3>
                </div>

                <div>
                    {userProfile?.introduction}
                </div>

                <br />
                {userProfile?.drink === "" ?
                    null :
                    <div>
                        음주량 : {userProfile?.drink}
                    </div>
                }

                {userProfile?.smoke === "" ?
                    null :
                    <div>
                        흡연유무 : {userProfile?.smoke}
                    </div>
                }

                {userProfile?.hobby === "" ?
                    null :
                    <div>
                        취미 : {userProfile?.hobby}
                    </div>
                }

                {userProfile?.idealType === "" ?
                    null :
                    <div>
                        이상형 : {userProfile?.idealType}
                    </div>
                }

                {userProfile?.job === "" ?
                    null :
                    <div>
                        직업 : {userProfile?.job}
                    </div>
                }

                {userProfile?.likeMovieType === "" ?
                    null :
                    <div>
                        영화취향 : {userProfile?.likeMovieType}
                    </div>
                }

                {userProfile?.pet === "" ?
                    null :
                    <div>
                        반려동물 : {userProfile?.pet}
                    </div>
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
    height: auto;
    padding-left: 10px;
    padding-bottom: 20px;
    word-break: keep-all;
    border-radius:20px;
    border: 1px solid gray;
    box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3)
`

