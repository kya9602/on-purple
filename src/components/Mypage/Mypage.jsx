import React, { useState, useEffect, useRef, useCallback } from "react";
import profile from "../../assets/images/profile.jpg";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updatePost, __getDetail } from "../../redux/modules/mypage";
import EditModal from "./EditModal";
import useOnClickOutside from "./useOnClickOutside";

import {
    MypageBox, Myinfo, Profile, InfoBody, Age, MBTI, OneLine, ModifyBtn, ImgBox, SecondMypageBox, SecondMyinfo,
    ListBox, Listtitle, LovemeBox, LoveCard, MatchingBox, MatchingCard, Avatar, StBodyInput, StButton, AddMyinfo,
    MiniBox, MiniTitle, MiniInput, MiniHeader
} from "./Mypagestyled";




const Mypage = () => {
    // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    const dispatch = useDispatch();
    const [input, setInput] = useState(false);
    const [img, setImg] = useState("");
    const formData = new FormData();
    const initialState = {
        OneLine: ""
    }


    const [imageUrl, setImageUrl] = useState(profile); // img input value

    // Event Handler
    // Img Upload hadler
    const inputRef = useRef(null);
    const onUploadImg = useCallback((fileBlob) => {
        formData.append('file', fileBlob);
        for (const keyValue of formData) {
            console.log(keyValue[0] + ", " + keyValue[1])
        };

        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageUrl(reader.result);
                resolve();
            };
        });

    }, []);


    const params = useParams();
    const postId = parseInt(params.id);
    const data = useSelector((state) => state.detail)
    console.log(data)

    useEffect(() => {
        dispatch(__getDetail(postId));
    }, [dispatch])

    const [post, setPost] = useState(initialState)

    const onUpdatePost = async () => {
        formData.append('file', img);
        formData.append('OneLine', OneLine);
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        let a = await axios.put(`http://localhost:3001/mypage`, formData,
            {
                headers: {
                    "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                    "RefreshToken": localStorage.getItem("RefreshToken"),
                    "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
                }
            });
        console.log(a.data.data);
        dispatch(updatePost({
            age: a?.data?.data?.age,
            MBTI: a?.data?.data?.MBTI,
            id: a?.data?.data?.postId,
            imageUrl: a?.data?.data?.imageUrl,
            OneLine: data?.data?.data?.OneLine,
            content: post.content
        }));

        setInput(!input)
    }
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
        console.log(value)
    };


    const [isClickEdit, setIsClickEdit] = useState(false);
    const modalRef = useRef();
    const handleClickOutside = () => setIsClickEdit(false);
    useOnClickOutside(modalRef, handleClickOutside);
    return (
        <>
            {!input ?
                <MypageBox>
                    {/* 내정보 박스 Myinfo */}
                    <Myinfo>
                        <Profile src={profile} />
                        <InfoBody>
                            <Age> age : {data?.data?.age} </Age>

                            <MBTI>MBTI : ENFP</MBTI>
                            <OneLine>한줄평으로 나를 소개하세요</OneLine>
                        </InfoBody>
                        {/* 같은 아이디를 가진 사람이 들어왔을때만 보여야함 */}
                        {isClickEdit &&
                            <EditModal
                                post={post}
                                modalRef={modalRef} />
                        }

                        <ModifyBtn onClick={() => setInput(!input)}>수정하기</ModifyBtn>
                        <ModifyBtn onClick={() => setIsClickEdit(true)}>비밀번호 변경</ModifyBtn>


                    </Myinfo>
                    {/* 매칭 된사람 및 나를 좋아요한사람 목록박스 두개 필요 */}
                    <ListBox>
                        {/* 나를 좋아요한 목록 박스 */}
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Listtitle>내가 받은 Perple</Listtitle>
                            <LovemeBox>

                                <LoveCard src={profile}></LoveCard>
                                <LoveCard src={profile}></LoveCard>
                                <LoveCard src={profile}></LoveCard>
                                <LoveCard src={profile}></LoveCard>

                            </LovemeBox>
                        </div>

                        {/* 나와 매칭된 사람 목록 박스 */}
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Listtitle>나랑 마음이 통한 사람</Listtitle>

                            <MatchingBox>

                                <MatchingCard src={profile}></MatchingCard>
                                <MatchingCard src={profile}></MatchingCard>
                                <MatchingCard src={profile}></MatchingCard>
                                <MatchingCard src={profile}></MatchingCard>

                            </MatchingBox>
                        </div>
                    </ListBox>


                </MypageBox>


                :
                // 수정버튼 누르면 보일 화면모습 

                <SecondMypageBox>
                    <SecondMyinfo>
                        <ImgBox >
                            <Avatar
                                src={imageUrl}
                                style={{ margin: '20px' }}
                                size={200}
                                onClick={() => { inputRef.current.click() }} />
                            <input
                                type='file'
                                style={{ display: 'none' }}
                                accept='image/jpg,impge/png,image/jpeg'
                                name='profile_img'
                                onChange={(e) => { onUploadImg(e.target.files[0]) }}
                                ref={inputRef} />
                        </ImgBox>
                        <InfoBody>
                            <Age> age : 27 </Age>
                            <MBTI>MBTI : ENFP</MBTI>
                            <StBodyInput
                                placeholder="한줄로 나를 소개해주세요"
                                type="text"
                                name="OneLine"
                                value={post.OneLine}
                                className="add-input"
                                onChange={onChangeHandler} />
                        </InfoBody>
                        <StButton onClick={() => { onUpdatePost() }}>수정</StButton>
                        <StButton onClick={() => { setInput(!input) }}>취소</StButton>
                    </SecondMyinfo>

                    {/* 아래 추가정보란 적는곳  */}
                    <AddMyinfo>
                        <MiniHeader>🌟내 정보를 추가한다면, 상대방과 매칭 될 확률이 높아집니다.🌠</MiniHeader>
                        <MiniBox>
                            <MiniTitle>이상형 🎈</MiniTitle>
                            <MiniInput
                                placeholder="이상형을 적어주세요"
                                type="text"
                                name="myType"
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>직업 👄</MiniTitle>
                            <MiniInput
                                placeholder="직업 또는 업종을 적어주세요"
                                type="text"
                                name="myType"
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>취미 👓</MiniTitle>
                            <MiniInput
                                placeholder="좋아하는, 함께 했으면 좋겠는 취미를 적어주세요"
                                type="text"
                                name="myType"
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>반려동물 유무 🐶</MiniTitle>
                            <MiniInput
                                placeholder="사랑하는 반려동물이 있다면 자랑해주세요!"
                                type="text"
                                name="myType"
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>흡연 유무 🚬</MiniTitle>
                            <MiniInput
                                placeholder="Yes or No 본인 또는 원하는 상대방의 흡연유무"
                                type="text"
                                name="myType"
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>음주습관 🍻</MiniTitle>
                            <MiniInput
                                placeholder="술을 즐기는 편인지 적어주세요"
                                type="text"
                                name="myType"
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>좋아하는 영화 🎬</MiniTitle>
                            <MiniInput
                                placeholder="좋아하는 영화종류를 적어주세요. 장르가 비슷하면 좋은 호감이 생길수도!?"
                                type="text"
                                name="myType"
                            />
                        </MiniBox>
                        <MiniBox>
                            <MiniTitle>사는 지역 🏡</MiniTitle>
                            <MiniInput
                                placeholder="사는 곳 또는 주로 활동하는 지역을 적어주세요!"
                                type="text"
                                name="myType"
                            />
                        </MiniBox>
                    </AddMyinfo>
                </SecondMypageBox>
            }
        </>
    );
}

export default Mypage;