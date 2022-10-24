import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { __getPostsDetail } from "../../redux/modules/board";
import AddComment from "./AddComment"
import { __deletePosts, __likePost } from "../../redux/modules/board";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import delete2 from "../../assets/icons/delete2.png"
import edit from "../../assets/icons/edit.png"
import report from "../../assets/icons/report.png"
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper";
import Swal from "sweetalert2";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const Detail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { isLoading, error, detail } = useSelector((state) => state?.post);
    const { postId } = useParams();
    /* console.log(detail) */

    useEffect(() => {
        dispatch(__getPostsDetail(postId));
    }, [])

    if (isLoading) return "😴로딩중이에요..😴"

    if (error) {
        return <>{error.message}</>
    }

    const goEdit = () => {
        navigate(`/edit/${postId}`)
    }
    const goReport = () => {
        navigate(`/report`)
    }
    const onLike = (event) => {
        event.preventDefault();
        dispatch(__likePost(postId));
    };

    // URL 입력해서 들어오는 경우 로그인 유무 판단 후 2초뒤 로그인 페이지로 보냄
    const getNickname = localStorage.getItem("nickname")
    if (getNickname === null) {
        Swal.fire({
            title: '로그인이 필요합니다.😢'
            , icon: 'error'
        })
        setTimeout(() => {
            (navigate('/login'))
        }, 2000);
    }
    return (
        <Container>
            <Btnbox>
                <ArrowBackIosIcon className="BackBtn" fontSize="large" onClick={() => { navigate(-1); }}></ArrowBackIosIcon>
            </Btnbox>
            <Title>
                {detail?.title}
            </Title>

            <Date>{detail?.createdAt}</Date>
            <DateButtonWrapper>
                {getNickname === detail?.nickname ?
                    (
                        <div style={{ gap: "10px", marginRight: "10px" }}>
                            <EditButton onClick={goEdit}><img src={edit} alt="" /></EditButton>
                            <DeleteButton onClick={() => { setShow(true) }}><img src={delete2} alt="" /></DeleteButton>
                        </div>
                    ) :
                    <ReportButton onClick={goReport}><img src={report} alt="" /></ReportButton>}
            </DateButtonWrapper>

            <Swiper pagination={true} modules={[Pagination]} className="mySwiper" >
                {detail?.imgList?.map((image, id) => (
                    <SwiperSlide key={id}>
                        <ImgBox>
                            <img src={image} alt="" />
                        </ImgBox>
                    </SwiperSlide>
                ))}
            </Swiper>

            <NameLikeWrap>
                <div style={{ display: "flex" }}>
                    <div style={{ fontSize: "1.2rem", marginLeft: "10px", fontWeight: "bold", width: "70px" }}>{detail?.nickname}</div>
                    <View>View : {detail?.view}</View>
                </div>
                <div style={{ fontSize: "1rem", display: "flex", width: "380px", justifyContent: "right", paddingRight: "10px" }}>
                    <span onClick={onLike}>💜</span> {detail?.likes}개
                </div>
            </NameLikeWrap>

            <Content><p>{detail?.content}</p></Content>
            <div style={{ marginTop: "10px" }}>
                <AddComment detail={detail} />
            </div>

            {/* Modal */}
            <Dialog open={show}>
                <DialogContent style={{ position: "relative", width: "200px", textAlign: "center", height: "100px" }}>
                    <IconButton
                        style={{ position: "absolute", top: "0", right: "0" }}
                        onClick={() => setShow(false)}
                    >
                        <DisabledByDefaultOutlinedIcon />
                    </IconButton>
                    <div className="modal">
                        <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
                        <div className="modal-button" style={{ paddingTop: "30px" }}>
                            <ModalYesButton
                                variant="outlined"
                                color="error"
                                onClick={async () => {
                                    setShow(false);
                                    // 모달의 예 버튼 클릭시 게시물 삭제
                                    dispatch(__deletePosts(postId))
                                    alert("게시물이 삭제되었습니다😎");
                                    navigate("/board/taste");
                                }}
                            >
                                예
                            </ModalYesButton>
                            <ModalCancleButton
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    setShow(false)
                                }}
                            >
                                아니오
                            </ModalCancleButton>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Container>

    )
}

export default Detail;


const Container = styled.div`
    max-width: 428px;
    width : 100%;
    margin:0 auto;
    padding-top: 80px;
    background-color: white;
    .BackBtn{
     cursor: pointer;   
    }
`

const Btnbox = styled.div`
    width: 300px;
    padding-left: 10px;
`


const Title = styled.h1`
    text-align: center;
`

const Date = styled.div`
    font-size: 1rem;
    margin-left: 12px;
    float: right;
    text-align: center;
    margin-right: 20px;
    margin-top: 10px;
`
const DateButtonWrapper = styled.div`
    align-items: center;
    display: flex;
    float: left;
    gap: 10px;
    margin-left: 15px;
`

const Content = styled.div`
    margin: 0 auto;
    margin-top: 12px;
    width: 90%;
    height: 35vh;
    border-top: 1px solid #9E87BA;
    font-size: 20px;
`

const ImgBox = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 3vw;
    z-index: -99;
`

const View = styled.div`
    display: flex; 
    align-items: center;
    justify-content: space-between;
    padding-left: 230px;
    margin: auto;
    float:right;
`;

const NameLikeWrap = styled.div`
    display: flex;
    align-items: center;
    gap:10px;
    margin-top:10px;
    width: 380px;
    height: 50px;
    flex-direction: column;
`
const EditButton = styled.button`
    width: 40px;
    height: 30px;
    border: none;
    margin: 0 0 auto 0;
    margin-top: 5px;
    background-color: white;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const DeleteButton = styled.button`
    width: 40px;
    height: 30px;
    border: none;
    margin: 0 0 auto 0;
    margin-top: 5px;
    background-color: white;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const ReportButton = styled.button`
    width: 40px;
    height: 30px;
    border: none;
    margin: 0 0 auto 0;
    margin-top: 5px;
    background-color: white;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const ModalYesButton = styled.button`
    width: 80px;
    height: 40px;
    margin-right: 20px;
    border: none;
    background-color: skyblue;
    border : 2px solid skyblue;
    border-radius: 5px;
    cursor: pointer;
`

const ModalCancleButton = styled.button`
    width: 80px;
    height: 40px;
    border: none;
    background-color: #db6a6a;
    border : 2px solid #db6a6a;
    border-radius: 5px;
    cursor: pointer;
`