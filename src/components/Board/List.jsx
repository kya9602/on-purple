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
    const {Category} = useParams();
    /* console.log(post) */
    
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
        /* console.log("작동"); */
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
    const goDrive = () =>{
        navigate(`/board/drive`)
    }
    const goTaste = () =>{
        navigate(`/board/taste`)
    }
    const goDate = () =>{
        navigate(`/board/dateCourse`)    
    }
    const goMeet = () =>{
        navigate(`/board/meet`)
    }
    const goBar = () =>{
        navigate(`/board/bar`)
    }
    const goFashion = () =>{
        navigate(`/board/fashion`)
    }
     // 박스 -> 라디오 버튼으로 수정예정
    return (
        <>
            <Wrapper>
                <CategoryContaier>
                    <Box onClick={goDrive}>Drive</Box>
                    <Box onClick={goTaste}>맛집 추천</Box>
                    <Box onClick={goDate}>데이트 추천</Box>
                    <Box onClick={goMeet}>번개만남</Box>
                    <Box onClick={goBar}>Drink</Box>
                    <Box onClick={goFashion}>패션</Box>
                </CategoryContaier>
               {currentPosts.map((item) => (<Card item={item} key={item?.postId} />))}
               <TopButton/>
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
    margin-top: 10px;
    height: 100%;
`

const Box = styled.button`
    text-align: center;
    border: none;
    border-radius: 10px;
    background-color: #5B63B7;
    width: 100px;
    height: 30px;
    color: white;
        p{
            font-weight: 600;
            margin-top: 5px;
            color: whitesmoke;
        }
        :hover{
            cursor: pointer;
            box-shadow: 2.5px 2.5px 2.5px gray;
        }
`
const CategoryContaier = styled.div`
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    width: 400px;
    margin: auto;
    gap: 10px;
`