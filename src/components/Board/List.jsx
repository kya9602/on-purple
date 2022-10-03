import React, {useEffect} from "react";
import styled from "styled-components";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { __getPosts } from "../../redux/modules/board";
import InfiniteScroll from "react-infinite-scroll-component";

const List = () => {
    const dispatch = useDispatch();

    const {isLoading, error, post} = useSelector((state)=> state.post)
    console.log(post)
    useEffect(() => {
        dispatch(__getPosts());
    }, [dispatch])
    if (isLoading) return "Loading..."

    if (error) {
        return <>{error.message}</>
    }

    if (post.length === 0) {
        return <>😴게시물이 존재하지 않습니다😴</>
    }

    return (
        <ListContainer>
            <Wrapper>
                
                {post.map((item)=>(<Card item={item} key={item.postId}/>))}

            </Wrapper>
        </ListContainer>

    )
}

export default List;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4vw;
    margin: 0 auto;
    margin-left: 1vw;
    margin-top: 10px;
`
const ListContainer = styled.div`
    
`
