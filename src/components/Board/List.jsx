import React, { Suspense ,useEffect,useState,useRef,useCallback } from "react";
import styled from "styled-components";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { __getPosts } from "../../redux/modules/board";
import useFetch from "./customFecth";


const List = () => {
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.post)
    const [page, setPage] = useState(1);
    const { loading, error, formattedList = [] } = useFetch(page, `${process.env.REACT_APP_HOST}/post`);
    const row = useRef(null);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      }, []);

    useEffect(() => {
        dispatch(__getPosts());
    }, [dispatch])

    useEffect(() => {
        const option = {
          root: null,
          rootMargin: "20px",
          threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (row.current) observer.observe(row.current);
      }, [handleObserver]);

    return (
        <>
            <Wrapper>
                <CategoryContaier>
                    <Box><p>맛집</p></Box>
                    <Box><p>데이트</p></Box>
                    <Box><p>술</p></Box>
                    <Box><p>드라이브</p></Box>
                    <Box><p>번개</p></Box>
                    <Box><p>패션</p></Box>
                </CategoryContaier>
                <Suspense fallback={<div>Loading</div>}>
                {post.map((item) => (<Card item={item} key={item.postId} />))}
                </Suspense>
                {loading && <p>Loading...</p>}
                {error && <p>Error!</p>}
                <div ref={row} />
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
`
const CategoryContaier = styled.div`
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    width: 400px;
    margin: auto;
    gap: 10px;
`
const Box = styled.div`
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