import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { __getPosts } from "../../redux/modules/board";
import { useState } from "react";

const List = () => {
    const dispatch = useDispatch();
    const { isLoading, error, post } = useSelector((state) => state.post)
    const [bottom, setBottom] = useState(null);
	const bottomObserver = useRef(null);
    
    useEffect(() => {
        dispatch(__getPosts());
    }, [dispatch])
    
    useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					const { page, totalElement, limit } = post.pageData;
					if (totalElement < limit * (page - 1)) {
						return;
					}
					post.getProductList({ page: page + 1 });
				}
			},
			{ threshold: 0.25, rootMargin: '80px' },
		);
		bottomObserver.current = observer;
	}, []);

    useEffect(() => {
		const observer = bottomObserver.current;
		if (bottom) {
			observer.observe(bottom);
		}
		return () => {
			if (bottom) {
				observer.unobserve(bottom);
			}
		};
	}, [bottom]);

    return (
        <>
            <Wrapper>
                {post.map((item) => (<Card item={item} key={item.postId} />))}
                <div ref={setBottom}/>
            </Wrapper>    
        </>

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
