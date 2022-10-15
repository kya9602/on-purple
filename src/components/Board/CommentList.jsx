import React,{ useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { __getComments } from "../../redux/modules/comment";
import { useParams } from "react-router";
import axios from 'axios'
import Pagination from "./Pagination/Pagination";

const CommentList = () => {
    const dispatch = useDispatch()
    
    const {postId} = useParams();
    const {isLoading, error, comment} = useSelector((state)=> state?.comment)
    /* console.log(comment) */
    
    useEffect(()=>{
        dispatch(__getComments(postId));
    },[dispatch])

    useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
          const res = await axios.get(`${process.env.REACT_APP_HOST}/comment/${postId}`);
          /* console.log(res.data.data) */
        setPosts(res.data.data);
          setLoading(false);
    };
    fetchPosts();
}, []);
    // 페이지 네이션
    const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
    // 현재 페이지
	const [currentPage, setCurrentPage] = useState(1);
    // 페이지당 아이템 개수 
	const [postsPerPage] = useState(4); 

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = comment.slice(indexOfFirstPost, indexOfLastPost);
    
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
                {currentPosts?.map((item)=>(<Comment item={item} key={item?.commentId}/>))}
                <Pagination postsPerPage={postsPerPage} totalPosts={comment.length} paginate={paginate} />            
            </Container>
        </>

    )
}

export default CommentList;

const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
`