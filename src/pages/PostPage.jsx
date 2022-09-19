import React, { useState, useCallback } from "react";
import styled from "styled-components";
import ImageUploader from "../components/Board/ImageUpload/ImageUploader";
import { useNavigate } from "react-router";
import TextArea from "../components/Board/TextArea/TextArea";
import {Button} from "@mui/material";
import axios from "axios";

const PostPage =( ) =>{
    const navigate = useNavigate();
    
    // 게시판 제목, 내용, 사진
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState({
        image_file: "",
        preview_URL: "",
    });

    // 이미지, 제목, 내용 모두 작성해야 등록 가능
    const canSubmit = useCallback(() => {
        return image.image_file !== "" && content !== "" && title !== "";
      }, [image, title, content]);
      const handleSubmit = useCallback(async () => {
        try{
          const formData = new FormData();
          formData.append("title", title);
          formData.append("content", content);
          formData.append("imageUrl", image.image_file);
          
    
          await axios.post("http://13.209.26.228:8080/post", formData);
          window.alert("😎등록이 완료되었습니다😎");
          navigate("/board");
        } catch (e) {
          // 서버에서 받은 에러 메시지 출력
          window.alert("오류발생!" + "😭");
        }
    
      }, [canSubmit]);
    
      return (
        <AddContainer>
          <AddHeader>
          💖여러분의 후기를 남겨주세요💖
          </AddHeader>
          <SubmitBtn>
            {canSubmit() ? (
              <Button
                onClick={handleSubmit}
                className="success-button"
                variant="outlined"
              >
                등록하기😃
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
          </SubmitBtn>
          <AddBody>
            <ImageUploader setImage={setImage} preview_URL={image.preview_URL} />
            <TextArea setTitle={setTitle} setContent={setContent} title={title} content={content}/>
          </AddBody>
        </AddContainer>
      );
}

export default PostPage;


const AddContainer = styled.div`
   
`
const AddHeader = styled.div`
    text-align: center;
    font-size: 32px;
    font-weight: 15px;
    margin: 20px 0;
`

const SubmitBtn = styled.div`
    padding: 20px 0;
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

const AddBody = styled.div`
    display: flex;
    margin: 20px 0;
    justify-content: center;
    flex-wrap: wrap;
    gap: 100px;

    margin-left: 6em;
`