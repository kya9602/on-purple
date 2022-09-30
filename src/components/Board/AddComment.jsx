import React, { useEffect,useState } from "react";
import styled from "styled-components"
import axios from "axios";
import { useSelector, useDispatch  } from "react-redux";
import { __addComment } from "../../redux/modules/comment";
import { useParams } from "react-router";

const AddComment = (detail) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState({
        comment:"",
    })
    
    const {postId} = useParams();
    
    const inputHandler = (e) => {
        const { name, value } = e.target
        setComment({ ...comment , [name]: value });
      };

    console.log(postId)
    const addHandler = async (comment) => {
        let data = await axios.post(`http://3.37.88.29:8080/comment/${postId}`,
          { postId: postId, comment: comment },
          {
            headers: {
              "Authorization": localStorage.getItem("Authorization"),
              "RefreshToken": localStorage.getItem("RefreshToken")
            }
          })
        console.log(data)
      };
    return(
        <Container>
            <Text
                type="text"
                name="comment"
                placeholder="댓글 달기.."
                onChange={inputHandler}
                value={comment.comment}
            />
            <AddButton onClick={()=>{addHandler(comment.comment)}}>게시</AddButton>
        </Container>
    )
}

export default AddComment;

const Container = styled.div`
    display: flex;
    gap: 10px;
`
const AddButton = styled.button`
    width: 15vw;
    height: 4.5vh;
    margin: 0 auto;
`

const Text =styled.input`
    width: 100%;
    height: 4.5vh;

`