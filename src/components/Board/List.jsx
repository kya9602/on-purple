import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { __getPosts } from "../../redux/modules/board";
import { useNavigate, useParams } from "react-router";
import TopButton from "./ScrollTop"
import { useLocation } from "react-router";


const List = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* const [category, setCatecory] = useState("meet"); */
    /* const { isLoading, error, post } = useSelector((state) => state?.post) */
    /* console.log(post) */
    const { Category } = useParams();
    const [posts, setPosts] = useState([]);
    /* console.log(posts) */
    const [hasNextPage, setHasNextPage] = useState(true);
    const observerTargetEl = useRef(null);
    const page = useRef(0);
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(__getPosts(Category));
      }, [dispatch]);
    

    const fetch = useCallback(async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_HOST}/post?category=${Category}&page=${page.current}&size=10`
          );
          setPosts((prevPosts) => [...prevPosts, ...data.data.content]);
          setHasNextPage(data.data.content.length === 10);
          /* console.log(data.data.content); */
          if (data.data.content.length) {
            page.current += 1;
          }
        } catch (err) {
          console.error(err);
        }
      }, []); 
      
//---------------------ItersectionObserver----------------------------//
      useEffect(() => {
        if (!observerTargetEl.current || !hasNextPage) return;
    
        const io = new IntersectionObserver((entries, observer) => {
          // console.log(entries);
          if (entries[0].isIntersecting) {
            fetch();
          }
        });
        io.observe(observerTargetEl.current);
        // console.log(io.observe(observerTargetEl.current));
    
        return () => {
          io.disconnect();
        };
      }, [fetch, hasNextPage]);
       
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

//----------------------navigateButton------------------//
    const goDrive = () =>{
        navigate("/board/drive")
        /* window.location.reload() */
    }
    const goTaste = () =>{
        navigate("/board/taste")
        /* window.location.reload() */
    }
    const goDate = () =>{
        navigate("/board/dateCourse")
        /* window.location.reload() */
    }
    const goMeet = () =>{
        navigate("/board/meet")
        /* window.location.reload() */
    }
    const goBar = () =>{
        navigate("/board/bar")
       /*  window.location.reload() */
    }
    const goFashion = () =>{
        navigate("/board/fashion")
        /* window.location.reload() */
    }
    const goPost = () =>{
        navigate("/post")
    }

    /* if(posts.length === 0 ) {
        return(
            <div style={{textAlign:"center", marginTop:"10px"}}>
                <p>😴 게시글이 존재하지 않습니다 😴</p>
                <GoWrite
                onClick={goPost}  
                variant="outlined"
                color="primary">
                    글쓰러 가기 ✍</GoWrite>
            </div>
        )
    } */


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
                {posts.map((item)=>(<Card item={item} key={item?.postId}/>))} 
               <div ref={observerTargetEl} />
               <TopButton/>
            </Wrapper>
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
    background-color: #6A75CA;
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

const GoWrite = styled.button`
    border: 1px solid #6A75CA;
    border-radius: 10px;
    text-align: center;
    color: black;
    width: 120px;
    height: 50px;
    background-color: white;
     :hover {
        background-color: #6A75CA;
     }
`