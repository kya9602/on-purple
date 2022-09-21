import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import TextArea from "../components/Board/TextArea/TextArea";
import { Button } from "@mui/material";
import axios from "axios";


const PostPage = () => {
      let inputRef;
      const navigate = useNavigate();

      // 게시판 제목, 내용, 사진
      const [title, setTitle] = useState("");
      const [content, setContent] = useState("");
      const [image, setImage] = useState([]);

      //이미지 업로드 핸들
      const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...image];

        for (let i = 0; i < imageLists.length; i++) {
          const currentImageUrl = URL.createObjectURL(imageLists[i]);
          imageUrlLists.push(currentImageUrl);
        }

        if (imageUrlLists.length > 5) {
          imageUrlLists = imageUrlLists.slice(0, 5);
        }

        setImage(imageUrlLists);
      };
      // X버튼 클릭 시 이미지 삭제
      const handleDeleteImage = (id) => {
        setImage(image.filter((_, index) => index !== id));
      };

      // 이미지, 제목, 내용 모두 작성해야 등록 가능
      const canSubmit = useCallback(() => {
        return image.imageUrl !== "" && content !== "" && title !== "";
      }, [image, title, content]);
      const handleSubmit = useCallback(async () => {
        try {
          const formData = new FormData();
          formData.append("title", title);
          formData.append("content", content);
          formData.append("imageUrl", image.imageUrl);


          await axios.post("http://13.209.26.228:8080/post", formData);
          window.alert("😎등록이 완료되었습니다😎");
          navigate("/board");
        } catch (e) {
          // 서버에서 받은 에러 메시지 출력
          window.alert("오류발생!" + "😭");
        }

      }, [canSubmit]);

  return (
    <div>
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
        <UploaderWrapper>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/gif"
            multiple
            onChange={handleAddImages}
            ref={(refParam) => (inputRef = refParam)}
            style={{ display: "none" }}
          />

          {image.map((image, id) => (
            <div key={id}>
              <img src={image} alt={`${image}-${id}`} />
              <button onClick={() => handleDeleteImage(id)}>삭제</button>
            </div>
          ))}

          <Btn>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => inputRef.click()}
            >
              😎사진 고르기😎
            </Button>

          </Btn>
        </UploaderWrapper>
        <TextArea setTitle={setTitle} setContent={setContent} title={title} content={content} />
      </AddBody>
    </div>
  );
}

export default PostPage;



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
    gap: 50px;

    margin-left: 6em;
`

const UploaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 15px;
`

const Btn = styled.div`
    button {
        margin: 10px 5px;
        font-size: 1.1rem;
      }
`