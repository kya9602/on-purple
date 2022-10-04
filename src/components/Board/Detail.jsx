import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { __getPostsDetail } from "../../redux/modules/board";
import AddComment from "./AddComment"
import { __deletePosts } from "../../redux/modules/board";
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper";


const Detail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { isLoading, error, detail } = useSelector((state) => state.post);
    const { postId } = useParams();
    console.log(detail)
    useEffect(() => {
        dispatch(__getPostsDetail(postId));
    }, [dispatch])
    if (isLoading) return "😴로딩중이에요..😴"

    if (error) {
        return <>{error.message}</>
    }

    const goEdit = () => {
        navigate(`/edit/${postId}`)
    }
    
    const getNickname = localStorage.getItem("nickname")
    /* console.log(detail.nickname) */
    return (
        <>
            <Title>{detail.title}</Title>

            <DateButtonWrapper>
                {getNickname === detail.nickname ?
                    (
                        <>
                            <Button variant="outlined" onClick={goEdit}>수정</Button>
                            <Button variant="outlined" color="error" onClick={() => { setShow(true) }}>삭제</Button>
                        </>
                    ) :
                    null}
            </DateButtonWrapper>
            <Date>{detail.createdAt[0]}-{detail.createdAt[1]}-{detail.createdAt[2]} </Date>
            
            <View>
                <div>조회 수: {detail.view}</div>
            </View>
            
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper" >
                {detail.imgList.map((image, id) => (
                    <SwiperSlide key={id}>
                        <ImgBox>
                            <img src={image} alt="" />
                        </ImgBox>
                    </SwiperSlide>
                ))}
            </Swiper>

            <NameLikeWrap>
                <div style={{fontSize:"1.2rem", marginLeft:"22px", fontWeight:"bold"}}>{detail.nickname}</div>
                <div style={{fontSize:"1rem"}}>💜 {detail.likes}개</div>
            </NameLikeWrap>
            
            <Content><p>{detail.content}</p></Content>
            <div style={{ marginTop: "10px" }}>
                <AddComment detail={detail} />
            </div>

            {/* Modal */}
            <Dialog open={show}>
                <DialogContent style={{ position: "relative" }}>
                    <IconButton
                        style={{ position: "absolute", top: "0", right: "0" }}
                        onClick={() => setShow(false)}
                    >
                        <DisabledByDefaultOutlinedIcon />
                    </IconButton>
                    <div className="modal">
                        <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
                        <div className="modal-button">
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={async () => {
                                    setShow(false);
                                    // 모달의 예 버튼 클릭시 게시물 삭제
                                    dispatch(__deletePosts(postId))
                                    alert("게시물이 삭제되었습니다😎");
                                    navigate("/board");
                                }}
                            >
                                예
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    setShow(false)
                                }}
                            >
                                아니오
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default Detail;

const Title = styled.h1`
    text-align: center;
`

const Date = styled.div`
    margin: auto;
    font-size: 1rem;
`
const DateButtonWrapper = styled.div`
    align-items: center;
    display: flex;
    float: right;
    gap: 10px;
`

const Content = styled.div`
    margin: 0 auto;
    margin-top: 12px;
    width: 90%;
    height: 45vh;
    border-top: 1px solid #9E87BA;
    font-size: 20px;
`

const ImgBox = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 3vw;
`

const View = styled.div`
    display: flex; 
    align-items: center;
    justify-content: space-between;
    margin-top:20px;
    padding-left: 10px;
    padding-right: 10px;
`

const NameLikeWrap = styled.div`
    display: flex;
    align-items: center;
    gap:10px;
    margin-top:10px
`