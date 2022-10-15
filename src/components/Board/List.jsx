import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { __getPosts } from "../../redux/modules/board";
import { useNavigate, useParams } from "react-router";
import TopButton from "./ScrollTop";
import axios from "axios";
import Pagination from "./Pagination/Pagination";
const List = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, post } = useSelector((state) => state?.post)
    const { Category } = useParams();

    // 페이지 네이션
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지당 아이템 개수 
	const [postsPerPage] = useState(5); 

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        dispatch(__getPosts(Category));
       
    }, [Category]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_HOST}/post?category=${Category}`);
            /* console.log(res.data.data) */
            setPosts(res.data.data);
            setLoading(false);
        };
        fetchPosts();
    }, []);



    if (isLoading) {
        return <div>로딩 중....</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }


    /* if (post.length === 0)  */
    //----------------------navigateButton------------------//
    const goDrive = () => {   
        navigate(`/board/drive`)
  }
    const goTaste = () => {      
        navigate(`/board/taste`)
    }
    const goDate = () => {  
        navigate(`/board/dateCourse`)
    }
    const goMeet = () => {       
        navigate(`/board/meet`)
    }
    const goBar = () => {     
        navigate(`/board/bar`)
    }
    const goFashion = () => { 
        navigate(`/board/fashion`)
    }

    return (
        <>
            <Wrapper>
                <CategoryContaier>
                    <Box onClick={goDrive}>드라이브 가실 분?</Box>
                    <Box onClick={goTaste}>맛집 추천</Box>
                    <Box onClick={goDate}>데이트 코스 추천</Box>
                    <Box onClick={goMeet}>번개 만남</Box>
                    <Box onClick={goBar}>술 한잔 하실 분?</Box>
                    <Box onClick={goFashion}>패션 질문</Box>
                </CategoryContaier>
                {currentPosts.map((item) => (<Card item={item} key={item?.postId} />))}
                <TopButton />
            </Wrapper>
            <Pagination postsPerPage={postsPerPage} totalPosts={post.length} paginate={paginate} />
        </>
    )
}

export default List;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-left: 1vw;
    height: 100%;
    max-width:428px;
    width : 100%;
    margin:50px auto; 
`

const Box = styled.div`
    display:inline-block; 
    background-color: white;
    width:100px; 
    height:33px; 
    font-size:16px; 
    line-height:33px; 
    text-align:center;
    margin-right:15px;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 11.5px;
    font-weight: 500;
    background-color: #9C7FCB;
    color: white;
`
const CategoryContaier = styled.div`
    overflow-x:auto; 
    white-space:nowrap; 
    font-size:0;
`