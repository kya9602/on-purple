import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux/';
import { __getProfileDetail } from "../../redux/modules/profile";
import { __getChatrooms } from "../../redux/modules/chatRoom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const ProfileInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //유저의 기본정보 조회
    const profileDetail = useSelector((state) => state.profile)
    const { userId } = useParams();

    const userProfile = profileDetail?.posts?.data
    console.log(profileDetail?.posts?.data)

    useEffect(() => {
        dispatch(__getProfileDetail(userId));
    }, [dispatch])


    // 채팅 방 들어가는 룸 
    // const roomkey = useSelector((state) => state.roomlist)
    // console.log("채팅방", roomkey)
    // useEffect(() => {
    //     dispatch(__getChatrooms());
    //     /* console.log("작동"); */
    // }, []);




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
                    <h3> {userProfile?.nickname} {userProfile?.age}</h3>
                </div>

                <div>
                    {userProfile?.introduction}
                </div>
                <div>
                    {userProfile?.mbti}
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
        </Container>
    )
}

export default ProfileInfo;

const Container = styled.div`
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items:center;
    height: 100vh;
    width: 428px;
    padding-top: 130px;
    /* padding-bottom: 45vh; */
    background-color: white;
    .BackBtn{
     cursor: pointer;   
    }
`

const Btnbox = styled.div`
    width: 400px;
    /* padding-bottom: 20px; */
`

const ImageCard = styled.img`
    width: 200px;
    height: 200px;
    border-radius:20px;
    background-size: cover;
    background-position: center;
    box-shadow: 0px 18px 53px 0px rgba(0, 0, 0, 0.3);
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

