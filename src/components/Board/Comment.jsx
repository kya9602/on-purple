import React, {useState} from "react";
import styled from "styled-components";
import { __deleteComments } from "../../redux/modules/comment";
import { useDispatch } from "react-redux";
import delete2 from "../../assets/icons/delete2.png"
import edit from "../../assets/icons/edit.png"

const Comments = ({item})=>{
    const dispatch = useDispatch();
    const id = item.commentId
    const getNickname = localStorage.getItem("nickname")
    
    return(
        <div style={{margin:"10px",borderTop:"1px solid #cc9ce7" }}>
            <NameButtonContainer>
                <NickName>{item.nickname}</NickName>
                <div>
                    {getNickname === item.nickname ?
                  ( <>  
                        <DeleteBtn onClick={()=>{
                            dispatch(__deleteComments(id))
                        }}><img src={delete2} alt=""/>
                        </DeleteBtn>
                    
                        {/* <EditBtn><img src={edit} alt=""/></EditBtn> */}
                    </> )
                    : null
                }
                </div>
            </NameButtonContainer>
            
            <CmLikeContainer>
                <CM>{item.comment}</CM>
                <span>💜 {item.likes}</span>
            </CmLikeContainer>
            
            <TRWrapper>
                <Time>{item.createdAt[0]}.{item.createdAt[1]}.{item.createdAt[2]}</Time>
                <Recomment>답글 달기</Recomment>
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
    justify-content: space-between;
    margin-top:-5px;
    align-items: center;
`
const CM = styled.span`
    overflow: hidden;  		
    text-overflow: ellipsis;  
    white-space: nowrap; 		
    word-break:break-all;
    width: 300px;
    height: 20px;
    text-align: left;
`
const Time = styled.span`
    
`

const Recomment = styled.div`
    
`

const TRWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 5px;
`

const NameButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const DeleteBtn = styled.button`
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