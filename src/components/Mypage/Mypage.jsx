import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getMypage } from "../../redux/modules/mypage";
import EditModal from "./modal/EditModal";
import useOnClickOutside from "./modal/useOnClickOutside";
import LikeMeCard from "./LikeMeCard";
import LoveweCard from "./LoveweCard";
import ProfileEditModal from "./profileModal/ProfileEditModal"
import useProfileOnClickOutside from "./profileModal/ProfileUseOnClickOutSide"
import { __getMain } from "../../redux/modules/main";

import {
    MypageBox, Myinfo, Profile, InfoBody, Age, MBTI, OneLine, ModifyBtn, SecondMypageBox, SecondMyinfo,
    ListBox, Listtitle, LovemeBox, LoveCard, MatchingBox, MatchingCard, StBodyInput, StButton, AddMyinfo,
    MiniBox, MiniTitle, MiniInput, MiniHeader, BtnBox, OnlineBox, OneLineTitle, AreaInput, Area, Container
} from "./Mypagestyled";




const Mypage = () => {

    const [post, setPost] = useState();
    const [isClickEdit, setIsClickEdit] = useState(false);
    const modalRef = useRef();
    const handleClickOutside = () => setIsClickEdit(false);
    useOnClickOutside(modalRef, handleClickOutside);


    const [profile, setprofile] = useState();
    const [isClickProfileEdit, setIsClickProfileEdit] = useState(false);
    const profilemodalRef = useRef();
    const handleprofileClickOutside = () => setIsClickProfileEdit(false);
    useProfileOnClickOutside(profilemodalRef, handleprofileClickOutside);


    const dispatch = useDispatch();
    const [input, setInput] = useState(false);

    const [area, setArea] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [idealType, setIdealType] = useState("");
    const [job, setJob] = useState("");
    const [hobby, setHobby] = useState("");
    const [drink, setDrink] = useState("");
    const [pet, setPet] = useState("");
    const [smoke, setSmoke] = useState("");
    const [likeMovieType, setLikeMovieType] = useState("");



    //마이페이지 처음 기본정보 불러오기
    const mypage = useSelector((state) => state.mypage);
    const { profileId } = useParams();

    //마이페이지 인포 정보
    const userInfo = mypage.mypage.data

    useEffect(() => {
        dispatch(__getMypage(profileId));
    }, [])




    const onUpdatePost = async () => {
        if (introduction === "" || area === "") {
            return alert("작성했던 부분은 다시 재작성해야합니다! 👀 ")
        };


        const useraddInfo = {
            introduction: introduction,
            area: area,

            idealType: idealType,
            job: job,
            hobby: hobby,
            drink: drink,
            pet: pet,
            smoke: smoke,
            likeMovieType: likeMovieType,
        };

        let a = await axios.patch(`${process.env.REACT_APP_HOST}/mypage/userInfo`, useraddInfo,
            {
                headers: {
                    "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                    "RefreshToken": localStorage.getItem("RefreshToken"),
                }
            });
        if (a.data.success) {
            alert('정보가 수정되었습니다.');
            window.location.reload();
        }

        setInput(!input)
    }


    return (
        <Container>
            {!input ?
                <MypageBox>
                    {/* 내정보 박스 Myinfo */}
                    <Myinfo>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div>
                                <Profile src={userInfo?.imageUrl} />



                            </div>


                            <InfoBody>
                                <Age> AGE : {userInfo?.age}</Age>

                                <MBTI>MBTI : {userInfo?.mbti} </MBTI>

                                <Area>사는 지역 : {userInfo?.area}</Area>
                                <OnlineBox>
                                    <OneLineTitle>한 줄 소개</OneLineTitle>
                                    <OneLine>
                                        {userInfo?.introduction}
                                    </OneLine>
                                </OnlineBox>
                            </InfoBody>
                            {isClickEdit &&
                                <EditModal
                                    post={post}
                                    modalRef={modalRef} />
                            }
                            {isClickProfileEdit &&
                                <ProfileEditModal
                                    post={profile}
                                    modalRef={profilemodalRef} />
                            }
                        </div>
                        <BtnBox>
                            <ModifyBtn onClick={() => setIsClickProfileEdit(true)} >프로필 사진 수정하기</ModifyBtn>
                            <ModifyBtn onClick={() => setInput(!input)}>추가정보 수정하기</ModifyBtn>
                            <ModifyBtn onClick={() => setIsClickEdit(true)}>비밀번호 변경</ModifyBtn>
                        </BtnBox>

                    </Myinfo>
                    {/* 매칭 된사람 및 나를 좋아요한사람 목록박스 두개 필요 */}
                    <ListBox>
                        {/* 나를 좋아요한 목록 박스 */}
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Listtitle>내가 받은 Purple💜</Listtitle>
                            <LovemeBox>
                                <LoveCard>
                                    {userInfo?.likedResponseDtoList?.map((likeMeitem) => {
                                        return <LikeMeCard key={likeMeitem.userId} likeMeitem={likeMeitem} />
                                    })}

                                </LoveCard>
                            </LovemeBox>
                        </div>

                        {/* 나와 매칭된 사람 목록 박스 */}
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Listtitle>마음이 통한 사람 💜</Listtitle>

                            <MatchingBox>
                                <MatchingCard>
                                    {userInfo?.otherLikeResponseDtoList?.map((loveMeitem) => {
                                        return <LoveweCard key={loveMeitem.userId} loveMeitem={loveMeitem} />
                                    })}
                                </MatchingCard>
                            </MatchingBox>
                        </div>
                    </ListBox>


                </MypageBox>


                :
                // 수정버튼 누르면 보일 화면모습 

                <SecondMypageBox>
                    <SecondMyinfo>

                        <InfoBody>
                            <Age> age : 27 </Age>
                            <MBTI>MBTI : ENFP</MBTI>
                            <AreaInput
                                maxLength={8}
                                placeholder={userInfo.area}
                                onChange={(e) => {
                                    setArea(e.target.value);
                                }}
                            />
                            <StBodyInput
                                maxLength={20}
                                placeholder={userInfo.introduction}
                                onChange={(e) => {
                                    setIntroduction(e.target.value);
                                }}
                            />
                        </InfoBody>

                    </SecondMyinfo>

                    {/* 아래 추가정보란 적는곳  */}
                    <AddMyinfo>
                        <MiniHeader>🌟내 정보를 추가한다면, <br />상대방과 매칭 될 확률이 높아집니다.🌠</MiniHeader>
                        <MiniBox>
                            <MiniTitle>이상형 🎈</MiniTitle>
                            <MiniInput

                                placeholder={userInfo.idealType}
                                onChange={(e) => {
                                    setIdealType(e.target.value);
                                }}
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>직업 👄</MiniTitle>
                            <MiniInput
                                placeholder={userInfo.job}
                                onChange={(e) => {
                                    setJob(e.target.value);
                                }}
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>취미 👓</MiniTitle>
                            <MiniInput
                                placeholder={userInfo.hobby}
                                onChange={(e) => {
                                    setHobby(e.target.value);
                                }}
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>반려동물 유무 🐶</MiniTitle>
                            <MiniInput
                                placeholder={userInfo.pet}
                                onChange={(e) => {
                                    setPet(e.target.value);
                                }}
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>흡연 유무 🚬</MiniTitle>
                            <MiniInput
                                placeholder={userInfo.smoke}
                                onChange={(e) => {
                                    setSmoke(e.target.value);
                                }}
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>음주습관 🍻</MiniTitle>
                            <MiniInput
                                placeholder={userInfo.drink}
                                onChange={(e) => {
                                    setDrink(e.target.value);
                                }}
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>좋아하는 영화 🎬</MiniTitle>
                            <MiniInput
                                placeholder={userInfo.likeMovieType}
                                onChange={(e) => {
                                    setLikeMovieType(e.target.value);
                                }}
                            />
                        </MiniBox>

                    </AddMyinfo>
                    <BtnBox>
                        <StButton onClick={() => { onUpdatePost() }}>수정</StButton>
                        <StButton onClick={() => { setInput(!input) }}>취소</StButton>
                    </BtnBox>
                </SecondMypageBox>
            }
        </Container>
    );
}

export default Mypage;

