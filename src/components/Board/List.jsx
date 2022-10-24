import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { __getPosts } from "../../redux/modules/board";
import { useNavigate, useParams } from "react-router";
import TopButton from "./ScrollTop";
import axios from "axios";
import Pagination from "./Pagination/Pagination";
import searchIcon from "../../assets/icons/search.png"
const List = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, post } = useSelector((state) => state?.post)
    const { Category } = useParams();
    console.log(post)
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
    const currentPosts = post?.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        dispatch(__getPosts(Category));
    }, [Category]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_HOST}/post?category=${Category}`);
            /* console.log(res.data.data) */
            setPosts(res?.data?.data);
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
    const goSearch = () =>{
        navigate(`/search`)
    }
    // 게시판 이용 주의 사항 모달 만들 예정.
    return (
        <div style={{height:"100vh"}}>

            <Wrapper>
                <CategoryContaier>
                    <Box onClick={goDrive}>드라이브 가실 분?</Box>
                    <Box onClick={goTaste}>맛집 추천</Box>
                    <Box onClick={goDate}>데이트 코스 추천</Box>
                    <Box onClick={goMeet}>번개 만남</Box>
                    <Box onClick={goBar}>술 한잔 하실 분?</Box>
                    <Box onClick={goFashion}>패션 질문</Box>
                </CategoryContaier>
                <SearchCautionWrap>
                <span>게시판 이용 주의사항 📄</span>
                <GoSearch onClick={goSearch}><img src={searchIcon} alt=""/></GoSearch>
                </SearchCautionWrap>

                {currentPosts?.map((item) => (<Card item={item} key={item?.postId} />))}
                <TopButton />
            </Wrapper>
            <Pagination postsPerPage={postsPerPage} totalPosts={post?.length} paginate={paginate} /> 
         
        </div>
    )
}

export default List;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-left: 1vw;
    max-width:428px;
    width : 100%;
    margin:50px auto; 
    background-color: white;
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
    cursor: pointer;
    :hover {
        background-color: #570657;
    }
    
    a:visited {
        background-color: #570657;
    }

`
const CategoryContaier = styled.div`
    overflow-x:auto; 
    white-space:nowrap; 
    font-size:0;
`
const GoSearch = styled.div`
    width: 40px;
    height: 40px;
    border: 1px solid #9C7FCB;
    /* background-color: #FAEAFF; */
    border-radius: 100%;
    box-shadow: 1px 1px 1px 1px #D4B4FF;
    margin-top: 5px;
    /* margin-left: 82%; */
    cursor: pointer;
    margin-right: 15px;
    img {
        width: 90%;
        height: 100%;
        object-fit: contain;
    }
`

const SearchCautionWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
        font-size: 15px;
        font-weight: 600;
        margin: 0 auto;
        padding-left: 55px;
        cursor: pointer;
    }
`