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
import Modal from "@mui/material/Modal"
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #ABA1B0',
    boxShadow: 24,
    p: 4,
};

const List = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, post } = useSelector((state) => state?.post)
    const { Category } = useParams();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
    const goSearch = () => {
        navigate(`/search`)
    }
    // 게시판 이용 주의 사항 모달 만들 예정.
    return (
        <>
            <Wrapper>
                <CategoryContaier>
                    <CategoryBox onClick={goDrive}>드라이브 가실 분?</CategoryBox>
                    <CategoryBox onClick={goTaste}>맛집 추천</CategoryBox>
                    <CategoryBox onClick={goDate}>데이트 코스 추천</CategoryBox>
                    <CategoryBox onClick={goMeet}>번개 만남</CategoryBox>
                    <CategoryBox onClick={goBar}>술 한잔 하실 분?</CategoryBox>
                    <CategoryBox onClick={goFashion}>패션 질문</CategoryBox>
                </CategoryContaier>
                <SearchCautionWrap>
                    <ModalSpan>
                        <span onClick={handleOpen}>게시판 이용 주의사항 📄</span>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <BoxContainer>
                                    <h2>새로운 사람을 만나러 가 볼까요?</h2>
                                    <div>

                                    </div>
                                </BoxContainer>
                            </Box>
                        </Modal>
                    </ModalSpan>
                    <GoSearch onClick={goSearch}><img src={searchIcon} alt="" /></GoSearch>
                </SearchCautionWrap>

                {currentPosts?.map((item) => (<Card item={item} key={item?.postId} />))}
                <TopButton />
            </Wrapper>
            <Pagination postsPerPage={postsPerPage} totalPosts={post?.length} paginate={paginate} />
        </>
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

const CategoryBox = styled.div`
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
    &::-webkit-scrollbar {
      width: 8px;
      height: 6px;
      border-radius: 6px;
      background: rgba(248, 227, 227, 0.4);
     }
     &::-webkit-scrollbar-thumb {
      background: rgba(225, 126, 255, 0.3);
      border-radius: 6px;
    }
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
    
`
const BoxContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`
const ModalSpan = styled.div`
    span{
        font-size: 15px;
        font-weight: 600;
        margin: 0 auto;
        padding-left: 55px;
        cursor: pointer;
    }  
`