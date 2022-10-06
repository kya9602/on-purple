import React,{ useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { __getComments } from "../../redux/modules/comment";
import { useParams } from "react-router";


const CommentList = () => {
    const dispatch = useDispatch()
    
    const {postId} = useParams();
    const {isLoading, error, comment} = useSelector((state)=> state?.comment)
    /* console.log(comment) */

    useEffect(()=>{
        dispatch(__getComments(postId));
    },[dispatch])

    if (isLoading) return "Loading..."

    if (error) {
        return <>{error?.message}</>
    }

    if (comment.comment === "") {
        return <div style={{textAlign:"center", marginTop:"10px"}}>😴댓글이 존재하지 않습니다. 댓글을 남겨주세요😴</div>
    }

    if (comment.length == 0){
        return <div style={{textAlign:"center", marginTop:"10px"}}>😴댓글이 존재하지 않습니다. 댓글을 남겨주세요😴</div>
    }
    return (
        <>
            <Container>
                {comment?.map((item)=>(<Comment item={item} key={item?.commentId}/>))}
            </Container>
        </>

    )
}

export default CommentList;

const Container = styled.div`
    width: 100vw;
    height: 50vh;
    margin: 0 auto;
`