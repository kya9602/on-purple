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
import { Link } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 428,
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
    
    return (
    <>
        <Wrapper>
            <CategoryContaier>
                <CategoryBox onClick={goDrive}>드라이브</CategoryBox>
                <CategoryBox onClick={goTaste}>맛집</CategoryBox>
                <CategoryBox onClick={goDate}>데이트 코스</CategoryBox>
                <CategoryBox onClick={goMeet}>번개 만남</CategoryBox>
                <CategoryBox onClick={goBar}>술 한잔?</CategoryBox>
                <CategoryBox onClick={goFashion}>패션</CategoryBox>
            </CategoryContaier>
            <SearchCautionWrap>
                <ModalSpan>
                    <span onClick={handleOpen}>커뮤니티 가이드 라인 📄</span>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <BoxContainer>
                                <h2>커뮤니티 가이드 라인 📄</h2>
                                <h3>가이드 라인을 위반하는 행동을 발견한다면 <br/>언제든지 <Link to={"/report"}>신고🚨</Link>해주세요.</h3>
                                <ReportList>
                                    <li>❗️ 나체 / 성적인 콘텐츠</li>
                                    <Content> 나체 사진, 성적으로 노골적인 콘텐츠는 금지됩니다.</Content>
                                    <li>❗️ 사칭</li>
                                    <Content>자신을 있는 그대로 보여주세요! 타인인 척 행동하지 마세요</Content>
                                    <li>❗️ 사기, 광고, 불법</li>
                                    <Content>
                                        On Purple 을 불법적인 행위를 위한 수단으로 사용하지 마세요.<br/>
                                        사기 행위, 외부 앱으로 유도하는 광고 또한 금지 되어있습니다.
                                    </Content>
                                    <li>❗️ 미성년자</li>
                                    <Content>
                                        On Purple 을 이용하려면 만 18세 이상이어야 합니다. <br/>
                                        미성년자의 독사진을 포함하고 있거나 미성년자 가해를 부추기거나,
                                        미성년자를 성적이거나 성적인 암시가 포함된 방식으로 묘사하는 프로필을 발견한다면 신고해주세요.
                                    </Content>
                                    <li>❗️ 폭력, 위협</li>
                                    <Content>
                                        폭력적인 콘텐츠, 노골적인 콘텐츠 또는 유혈 콘텐츠가 허용되지 않습니다.  
                                        신체적 폭행, 강압, 그리고 모든 종류의 폭력 행위는 엄격하게 금지됩니다.
                                        자살이나 자해를 미화하거나 옹호하는 콘텐츠도 허용되지 않습니다
                                    </Content>
                                </ReportList>
                            </BoxContainer>
                        </Box>
                    </Modal>
                </ModalSpan>
                <GoSearch onClick={goSearch}><img src={searchIcon} alt="" /></GoSearch>
            </SearchCautionWrap>
            <CategoetTitle>
            {
            Category === "taste" ? (<span>맛집 추천 !😋</span>)
            : Category === "drive" ? (<span> 드라이브 가실 분? 🚗</span>) 
            : Category === "dateCourse" ? (<span>데이트 코스 추천! 💑</span>)
            : Category === "meet" ? (<span> 번개 만남 ⚡</span>) 
            : Category === "bar" ? (<span>술 한잔 하실 분?🍺</span>)
            : Category === "fashion" ? (<span>내 패션 어때요?😎</span>)
            : null             
            }
            </CategoetTitle>
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
        background-color: #E080C1;
    }
    
    a:visited {
        background-color: #E080C1;
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
    border-radius: 100%;
    box-shadow: 1px 1px 1px 1px #D4B4FF;
    margin-top: 5px;
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
    ul{
        float: left;
    }
`
const ModalSpan = styled.div`
    text-align: center;
    width: 100%;
    span{
        font-size: 15px;
        font-weight: 600;
        margin: 0 auto;
        padding-left: 55px;
        cursor: pointer;
    }  
`

const ReportList = styled.div`
    li{
        padding: 5px 0px 5px 5px;
        list-style: none;
        margin-bottom: 5px;
        border-bottom: 1px solid #efefef;
        font-size: 15px;
        font-weight: 600;
        
        margin-top: 10px;
    }
`
const Content = styled.div`
    white-space: pre-wrap;
    font-size: 15px;
    margin-top: 15px;
`

const CategoetTitle = styled.div`
    margin: 0 auto;
    font-size: 15px;
    font-weight: bold;
    color : #9C7FCB;
    align-items: center;
`