import React, { useEffect } from "react";
import styled from "styled-components";
import { __deleteComments, __deleteAdminComments } from "../../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";
import delete2 from "../../assets/icons/delete2.png"
import edit from "../../assets/icons/edit.png"
import { __likeComment } from "../../redux/modules/comment";
//관리자 정보 받아오려고
import { __getUser } from "../../redux/modules/signup";
/* import Recomment from "./Recomment"; */
const Comments = ({ item }) => {
    const dispatch = useDispatch();
    const id = item.commentId
    const getNickname = localStorage.getItem("nickname")
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(__getUser())
    }, [])



    // 관리자 확인용 
    const admin = user?.role

    const onLike = (event) => {
        event.preventDefault();
        dispatch(__likeComment(id));
    };

    //댓글 작성시간 표시
    function timeForToday(Day) {
        const today = new Date();
        const timeValue = new Date(Day);
        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }
        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }

    return (
        <div style={{ margin: "10px", borderTop: "1px solid #cc9ce7" }}>
            <NameButtonContainer>
                <NickName>{item.nickname}</NickName>
                <CM>{item.comment}</CM>
                <div>
                    {getNickname === item.nickname ?
                        (<>
                            <DeleteBtn onClick={() => {
                                dispatch(__deleteComments(id))
                            }}><img src={delete2} alt="" />
                            </DeleteBtn>

                        </>)
                        :
                        //관리자만 보이기
                        (admin !== "ADMIN" ?
                            null :
                            <>
                                <DeleteBtn onClick={() => {
                                    dispatch(__deleteAdminComments(id))
                                }}><img src={delete2} alt="" />
                                </DeleteBtn>

                            </>
                        )}
                </div>
            </NameButtonContainer>

            <CmLikeContainer>
                <span onClick={onLike}>💜 {item.likes}</span>
            </CmLikeContainer>

            <TRWrapper>
                <Time>{timeForToday(item.createdAt)}</Time>
            </TRWrapper>

        </div>
    )
}

export default Comments

const NickName = styled.p`
    font-size: 1.1rem;
    font-weight: bold;
`

const CmLikeContainer = styled.div`
    display: flex;
    margin-top:-5px;
    align-items: center;
    float: right;
`
const CM = styled.span`
    overflow: hidden;  		
    text-overflow: ellipsis;  
    white-space: nowrap; 		
    word-break:break-all;
    width: 300px;
    height: 20px;
    text-align: left;
    margin-left: -10px;
`
const Time = styled.span`
    
`

const TRWrapper = styled.div`
    display: flex;
    gap: 10px;
`

const NameButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const DeleteBtn = styled.button`
    width: 40px;
    height: 30px;
    border: none;
    background-color: white;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const EditBtn = styled.button`
    width: 40px;
    height: 30px;
    border: none;
    margin: 0 0 auto 0;
    margin-top: 5px;
    background-color: white;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`