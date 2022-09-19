import React from "react";
import { Button } from "@mui/material";
import styled from "styled-components"
import default_Img from "../../../assets/images/default-image.jpg"
const ImageUploader = ({ preview_URL, setImage }) => {
  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  // onError 시 실행될 함수 -> 이미지 default시 보여질 이미지
  const onErrorImg = (e) => {
	e.target.src = default_Img;
}
  return (
    <UploaderWrapper>
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
      />
      <ImgWrapper>
        <img src={preview_URL} onError={onErrorImg} alt=""/>
      </ImgWrapper>
      <UploadBtn>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => inputRef.click()}
        >
          😎사진 고르기😎
        </Button>
      </UploadBtn>
    </UploaderWrapper>
  );
};

export default ImageUploader;

const UploaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 15px;
`
const ImgWrapper =styled.div`
    img {
        width: 400px;
        height: 400px;
        object-fit: cover;
      }
`

const UploadBtn = styled.div`
    button {
        margin: 10px 5px;
        font-size: 1.1rem;
      }
`