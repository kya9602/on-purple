import React,{ useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { __getComments } from "../../redux/modules/comment";
import { useParams } from "react-router";
import Comments from "./Comment";

const CommentList = () => {
    const dispatch = useDispatch()
    
    const {postId} = useParams();
    const {isLoading, error, comment} = useSelector((state)=> state?.comment)
    
    const commentList = comment.data
    /* console.log(commentList) */

    useEffect(()=>{
        dispatch(__getComments(postId));
    },[dispatch])

    if (isLoading) return "Loading..."

    if (error) {
        return <>{error.message}</>
    }

    if (comment.length === 0) {
        return <>😴댓글이 존재하지 않습니다. 댓글을 남겨주세요😴</>
    }

    return (
        <>
            <Container>
                {commentList?.map((comment)=>(<Comments comment={comment} key={comment.commentId}/>))}
            </Container>
        </>

    )
}

export default CommentList;

const Container = styled.div`
    width: 100vw;
    height: 80%;
    margin: 0 auto;
    border-top: 1px solid grey;
`