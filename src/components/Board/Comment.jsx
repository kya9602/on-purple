import React, {useState} from "react";
import styled from "styled-components";
import { __deleteComments } from "../../redux/modules/comment";
import { useDispatch } from "react-redux";
import delete2 from "../../assets/icons/delete2.png"
import edit from "../../assets/icons/edit.png"
import { __likeComment } from "../../redux/modules/comment";
/* import Recomment from "./Recomment"; */
const Comments = ({item})=>{
    const dispatch = useDispatch();
    const id = item.commentId
    const getNickname = localStorage.getItem("nickname")
    /* const [showReplyInput, setshowReplyInput] = useState(false); */
    /* console.log(showReplyInput) */
    const onLike = (event) => {
        event.preventDefault();
        dispatch(__likeComment(id));
    };
    
   /*  const onReplyClick = () => {
        setshowReplyInput(!showReplyInput);
      }; */
  
    return(
        <div style={{margin:"10px",borderTop:"1px solid #cc9ce7" }}>
            <NameButtonContainer>
                <NickName>{item.nickname}</NickName>
                <CM>{item.comment}</CM>
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
                <span onClick={onLike}>💜 {item.likes}</span>
            </CmLikeContainer>
            
            <TRWrapper>
                <Time>{item.createdAt}</Time>
            </TRWrapper>
                {/* <Recomment item={item}/> */}
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