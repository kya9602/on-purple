import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { __getPosts } from "../../redux/modules/board";
import { useNavigate, useParams } from "react-router";

const List = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* const [category, setCatecory] = useState("me"); */
    const { isLoading, error, post } = useSelector((state) => state?.post)
    /* console.log(post) */
   
    const { Category } =useParams();
    console.log(Category)

 /*    const categories = [
        {
            name: "맛집 추천",
            value: "taste"
        },
        {
            name: "데이트 코스 추천",
            value: "dateCourse"
        },
        {
            name: "번개 만남",
            value: "meet"
        },
        {
            name: "한잔 하실 분?",
            value: "bar"
        },
        {
            name: "드라이브 하실 분?",
            value: "drive"
        },
        {
            name: "패션",
            value: "fashion"
        },

    ]; */

    useEffect(() => {
        dispatch(__getPosts(Category));
      }, [Category]);
    
      if (isLoading) {
        return <div>로딩 중....</div>;
      }
    
      if (error) {
        return <div>{error.message}</div>;
      }
    
//----------------------navigateButton------------------//
    const goDrive = () =>{
        navigate("/board/drive")
    }
    const goTaste = () =>{
        navigate("/board/taste")
    }
    const goDate = () =>{
        navigate("/board/dateCourse")
    }
    const goMeet = () =>{
        navigate("/board/meet")
    }
    const goBar = () =>{
        navigate("/board/bar")
    }
    const goFashion = () =>{
        navigate("/board/fashion")
    }

    /* console.log(category) */
    //-------------------- 무한 스크롤 ------------------//
   /*  const [count, setCount] = useState(5);
    const [ref, setRef] = useInfiniteScroll((entry, observer) => {
        loadMorePosts();
    });
    function loadMorePosts() {
        setCount(v => {
            if (v + 1 <= post?.length) return v + 1;
            else return v;
        });
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
               {post.map((item) => (<Card item={item} key={item?.postId} />))}
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
    background-color: #5B63B7;
    width: 100px;
    height: 30px;
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