import React, { useEffect,useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { __getPosts } from "../../redux/modules/board";
import InfiniteScroll from 'react-infinite-scroll-component';

const List = () => {
    const dispatch = useDispatch();
    const { isLoading, error, post } = useSelector((state) => state.post)
    console.log(post)
    
    useEffect(() => {
        dispatch(__getPosts());
    }, [dispatch])
    
    return (
        <>
            <Wrapper>
                {post.map((item) => (<Card item={item} key={item.postId} />))}
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
