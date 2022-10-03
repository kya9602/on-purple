import React, { useState } from "react";
import styled from "styled-components"
import axios from "axios";
import { useParams } from "react-router";
import CommentList from "./CommentList";

const AddComment = (detail) => {
  /* console.log(detail) */
  const [modalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState({
    comment: "",
  })

  const openModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  const { postId } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target
    setComment({ ...comment, [name]: value });
  };

  const addHandler = async (comment) => {
    let data = await axios.post(`${process.env.REACT_APP_HOST}/comment/${postId}`,
      { postId: postId, comment: comment },
      {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
          "RefreshToken": localStorage.getItem("RefreshToken")
        }
      })
    if (data.data.success) {
      window.location.reload()
    }
    console.log(data)
  };
  return (
    <>
      <Container onClick={openModal} style={{ height: modalOpen ? "300px" : "40px" }}>
        <div style={{ display: "flex", gap:"10px" }}>
          <Text
            style={{}}
            type="text"
            name="comment"
            placeholder="댓글 달기.."
            onChange={inputHandler}
            value={comment.comment}
          />
          <AddButton onClick={() => { addHandler(comment.comment) }}>게시</AddButton>
        </div>
        <CommentList />
      </Container>
    </>
  )
}

export default AddComment;

const Container = styled.div`
    max-height: 100vh;
    max-width: 100vw;
    position: fixed;
    transition: all 1000ms;
    bottom: 0;
`
const AddButton = styled.button`
    width: 15vw;
    height: 4.5vh;
`

const Text = styled.input`
    width: 100%;
    height: 4.5vh;
  
`