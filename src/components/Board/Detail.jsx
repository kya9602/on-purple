import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { __getPostsDetail } from "../../redux/modules/board";
import AddComment from "./AddComment"
import axios from "axios";
import CommentList from "./CommentList";
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

    return (
        <>
            <Button variant="outlined" onClick={goEdit}>수정</Button>
            <Button variant="outlined" color="error" onClick={() => {
                setShow(true)
            }}>삭제</Button>

            <Title>{detail.title}</Title>
            <NameDateWrapper>
                <Name>{detail.nickname}</Name>
                <Date>{detail.createdAt[0]}-{detail.createdAt[1]}-{detail.createdAt[2]} </Date>
            </NameDateWrapper>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                {detail.imgList.map((image, id) => (
                    <SwiperSlide key={id}>
                        <ImgBox>
                            <img src={image} alt="" />
                        </ImgBox>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Likes>💜{detail.likes}개</Likes>
            <Content>{detail.content}</Content>

            <div style={{ marginTop: "10px" }}>
                <CommentList />
            </div>
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
                                    await axios.delete(`http://3.37.88.29:8080/post/${postId}`,
                                    { headers: {
                                        "Authorization": localStorage.getItem("Authorization"),
                                        "RefreshToken": localStorage.getItem("RefreshToken")
                                      }}
                                    );
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

const Title = styled.div`
    font-size: 8vw;
    text-align: center;
`
const Name = styled.div`
    font-size: 3vw;
    float: right;
`
const Date = styled.div`
    font-size: 3vw;
`
const NameDateWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const Likes = styled.div`
    font-size: 4vw;
`

const Content = styled.div`
    margin: 0 auto;
    margin-top: 10px;
    width: 90%;
    height: 45vh;
    /* border: 1px solid #9E87BA; */
    font-size: 20px;
`

const ImgBox = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 3vw;
`