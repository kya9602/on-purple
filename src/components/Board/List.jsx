import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { __getPosts } from "../../redux/modules/board";
import useInfiniteScroll from "./useInfiniteScroll";

const List = () => {
    const dispatch = useDispatch();
    const [category, setCatecory] = useState("meet");
    const { isLoading, error, post } = useSelector((state) => state?.post)
    console.log(post)
    const onChangeHandler = (e) => {
        setCatecory(e.currentTarget.value);
    };
    const categories = [
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

    ];

    const Taste = post.filter((post) => {
        return post.category === "taste"
    })
    /* console.log(Taste) */
    const Meet = post.filter((post) => {
        return post.category === "meet"
    })
    /* console.log(Meet) */

    const Date = post.filter((post) => {
        return post.category === "dateCourse"
    })

    const Bar = post.filter((post) => {
        return post.category === "bar"
    })

    const Drive = post.filter((post) => {
        return post.category === "drive"
    })

    const Fashion = post.filter((post) => {
        return post.category === "fashion"
    })



    useEffect(() => {
        dispatch(__getPosts());
    }, [dispatch])


    //-------------------- 무한 스크롤 ------------------//
    const [count, setCount] = useState(5);
    const [ref, setRef] = useInfiniteScroll((entry, observer) => {
        loadMorePosts();
    });
    function loadMorePosts() {
        setCount(v => {
            if (v + 1 <= post?.length) return v + 1;
            else return v;
        });
    }
    /* {post.slice(0, count).map((item) => (<Card item={item} key={item?.postId} />))} */
    return (
        <>
            <Wrapper>
                <select onChange={onChangeHandler} value={category}>
                    {categories.map((categories) => (
                        <option value={categories.value} key={categories.name}>
                            {categories.name}
                        </option>
                    ))}
                </select>
                {category == "taste"
                    ? Taste.map((item) => {
                        return (
                            <Card
                                item={item}
                                key={item?.postId}
                                value={item?.category}
                            />
                        );
                    })
                    : category == "dateCourse"
                        ? Date.map((item) => {
                            return (
                                <Card
                                    item={item}
                                    key={item?.postId}
                                    value={item?.category}
                                />
                            );
                        })
                        :
                        category == "bar"
                            ? Bar.map((item) => {
                                return (
                                    <Card
                                        item={item}
                                        key={item?.postId}
                                        value={item?.category}
                                    />
                                );
                            })
                            : category == "drive"
                                ? Drive.map((item) => {
                                    return (
                                        <Card
                                            item={item}
                                            key={item?.postId}
                                            value={item?.category}
                                        />
                                    );
                                })
                                : category == "fashion"
                                    ? Fashion.map((item) => {
                                        return (
                                            <Card
                                                item={item}
                                                key={item?.postId}
                                                value={item?.category}
                                            />
                                        );
                                    })
                                    : Meet.map((item) => {
                                        return (
                                            <Card
                                                item={item}
                                                key={item?.postId}
                                                value={item?.category}
                                            />
                                        );
                                    })}
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