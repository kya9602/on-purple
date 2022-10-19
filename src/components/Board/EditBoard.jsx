import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { __getPostsDetail } from "../../redux/modules/board";
import default_Img from "../../assets/images/default-image.jpg"
import Delete from "../../assets/icons/delete.png"
import Category from "./Category";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper";

const EditBoard = () => {
    let inputRef;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { isLoading, error, detail } = useSelector((state) => state.post);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImage] = useState([]);
    const [category, setCategory] = useState("")

    const { postId } = useParams();
    const [formData] = useState(new FormData())

    /* console.log(detail) */
    
    useEffect(() => {
        dispatch(__getPostsDetail(postId));
    }, [dispatch])
    
    const handleDeleteImageUrl = (id) => {
    setImage(imageUrl.filter((_, index) => index !== id));
    };
    
    const canSubmit = () => {
        return detail.imgList.length !== 0 && content !== "" && title !== "" && category !=="";
    }

    const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...imageUrl];
    
        for (let i = 0; i < imageLists.length; i++) {
          const currentImageUrl = URL.createObjectURL(imageLists[i]);
          imageUrlLists.push(currentImageUrl);
          window.URL.revokeObjectURL(imageLists[i]);
          formData.append("imageUrl", imageLists[i]);
        }
        // 이미지 최대 5개 까지만
        if (imageUrlLists.length > 5) {
          window.alert("이미지는 최대 5개까지만 가능합니다😭")
          imageUrlLists = imageUrlLists.slice(0, 5);
        }
    
        setImage(imageUrlLists);
      };

      const handleEdit = useCallback(async (e) => {
        e.preventDefault();
    
        let req = {
          title: title,
          content: content,
          category: category
        };
    
        let json = JSON.stringify(req);
    
        try {
          const title = new Blob([json], { type: "application/json" });
          formData.append("data", title);
    
          const content = new Blob([json], { type: "application/json" });
          formData.append("data", content);
          
          const category = new Blob([json], { type: "application/json" });
          formData.append("data", category)

          await axios.put(`http://3.34.139.137:8080/post/${postId}`, formData, {
            headers: {
              "content-type": "multipart/form-data",
              "Authorization": localStorage.getItem("Authorization"), //accesstoken 
              "RefreshToken": localStorage.getItem("RefreshToken"),
            },
          });
          window.alert("😎수정이 완료되었습니다😎");
          navigate(`/detail/${postId}`);
        } catch (e) {
          // 서버에서 받은 에러 메시지 출력
          window.alert("오류발생!" + "😭");
        }
    
      }, [canSubmit]);

    return (
        <div style={{backgroundColor:"white", paddingTop:"90px"}}>
        <UploaderWrapper>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/gif"
            multiple
            onChange={handleAddImages}
            ref={(refParam) => (inputRef = refParam)}
            style={{ display: "none" }}
          /> 
            { imageUrl.length !== 0 ?
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
              {imageUrl.map((image, id) => (
               <SwiperSlide key={id}>
                  <ImgBox>                
                    <DeleteBtn onClick={() => handleDeleteImageUrl(id)}><img src={Delete} alt="X" /></DeleteBtn>
                    <img src={image} alt="" />
                  </ImgBox>
                </SwiperSlide>
              ))} 
             </Swiper>
              :         
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
              {detail.imgList.map((image, id) => (
                <SwiperSlide key={id}>
                  <ImgBox>
                    <img src={image} alt="" />
                  </ImgBox>
                </SwiperSlide>
              ))}
           </Swiper>} 
          <Btn>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => inputRef.click()}
            >
              😎사진 고르기😎
            </Button>
          </Btn>
          <Category setCategory={setCategory} category={category}/>
        </UploaderWrapper>
        <TextAreaWrapper>
            <input
                defaultValue={detail.title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <textarea
                style={{height:"30vh"}}
                defaultValue={detail.content}
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            />
        </TextAreaWrapper>
        <EditBtn>
        {canSubmit() ? (
          <Button
            onClick={handleEdit}
            className="success-button"
            variant="outlined"
          >
            수정😃
          </Button>
        ) : (
          <Button
            className="disable-button"
            variant="outlined"
            size="large"
          >
            사진과 내용을 모두 입력하세요😭
          </Button>
        )}  
        </EditBtn>
        </div>
    )
}

export default EditBoard;

const TextAreaWrapper = styled.div`
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .title {
        margin-bottom: 0.7rem;
    }
    .text {
        width: 500px;
        height: 400px;
    }

    input, textarea {
        &::-webkit-scrollbar {
        display: none;
        }

    resize: none;
    font-size: 18px;
    font-weight: 500;
    font-family: 'Noto Sans KR', sans-serif;
    border: 1px solid pink;
    border-radius: 5px;
    transition: border 0.5s;
    padding: 5px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border: 3px solid skyblue;
    }
  }
`

const EditBtn = styled.div`
    padding: 15px 0 80px 0 ;
    display: flex;
    align-items: center;
    justify-content: center;
    button{ }
    .disable-button{
      font-size: 1.1rem;
      cursor: not-allowed;
    }
    .success-button{
      font-size: 1.1rem;
    }
`
const UploaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const DefaultImage = styled.div`
  margin-top: 10px;
  width: 400px;
  height: 400px;
  background-image: url(${default_Img});
  background-repeat: no-repeat;
  background-position: center;

`
const DeleteBtn = styled.div`
  margin-bottom: 10px;
  margin-left: 95%;
  width: 20px;
  height: 20px;
  
`
const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  height: 100%;
`
const Btn = styled.div`
    margin: 10px;
    button {
        margin: 10px 5px;
        font-size: 1.1rem;
      }
`