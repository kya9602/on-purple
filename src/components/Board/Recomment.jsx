import React, {useEffect} from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __getReComments } from "../../redux/modules/comment";
import axios from "axios";

const Recomment = ({item}) =>{
    /* console.log(item.commentId) */
    const Id = item.commentId
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(__getReComments(Id));
    },[dispatch])

   /*  const addHandler = async (comment) => {
        if(comment.trim()===""){
          return alert("댓글을 입력해주세요")
        }
        let data = await axios.post(`${process.env.REACT_APP_HOST}/reComment/${Id}`,
          { Id: Id, comment: comment },
          {
            headers: {
              "Authorization": localStorage.getItem("Authorization"),
              "RefreshToken": localStorage.getItem("RefreshToken")
            }
          },)
         .then((response)=>{
            dispatch(createComment(response?.data?.data));
        })
        setComment("")
      }; */

    return(
        <>
         
        <div style={{ display: "flex", gap:"10px", marginLeft:"30px" }}>
          <Text
            type="text"
            name="comment"
            placeholder="댓글 달기.."
            /* onChange={inputHandler}
            value={comment.comment || ""} */
          />
          <AddButton>게시</AddButton>
        </div>
        </>
    )
}
/* onClick={() => { addHandler(comment.comment) } */
export default Recomment;

const Text = styled.input`
    width: 350px;
    height: 4.5vh;
    font-size: 15px;
    margin-left: 20px;
    border: none;
    border-bottom:1px solid grey ;
    &:focus{
      outline: none;
      border-bottom: 1px solid black;
    }
`

const AddButton = styled.button`
    width: 15vw;
    height: 4.5vh;
    border: none;
    background-color: #DEBAF3;
    border-radius: 80px;
    font-weight: bold;
    color: white;
`