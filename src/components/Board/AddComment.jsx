import React, { useEffect,useState } from "react";
import styled from "styled-components"
import { useSelector, useDispatch  } from "react-redux";
import { addComment } from "../../redux/modules/comment";
import { useParams } from "react-router";

const AddComment = (detail) => {
    const [comment, setComment] = useState("")
    const { postId } = useParams();
    console.log(postId)
    
    return(
        <Container>
            <Text
                className="text"
                placeholder="댓글 달기.."
            />
            <AddButton>게시</AddButton>
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