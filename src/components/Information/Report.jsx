import styled from "@emotion/styled";
import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import defaultImage from "../../assets/images/default-image.jpg"
const Report = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState([]);
    const [preview, setPreview] = useState("");
    const [category, setCategory] = useState("");
    const [targetId, setTargetId] = useState("");
    console.log(targetId)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData] = useState(new FormData())
    //select
    const OPTIONS = [
        { value: "카테고리 선택", name: "카테고리 선택"},
        { value: "fake", name: "가짜 프로필, 성별" },
        { value: "minor", name: "미성년자" },
        { value: "sexual", name: "성적인 콘텐츠" },
        { value: "fraud", name: "사기, 영업활동" },
        { value: "violence", name: "폭력, 위협" },
    ];
    const handleSelectChange = (e) => {
		console.log(e.target.value);
        setCategory(e.target.value);
	};

    //image
    const inputRef = useRef(null);
    const handleAddImage = (e) => {
        // console.log(e.target.files);
        setImageUrl(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
      };
      const handelDeleteImage = () => {
        URL.revokeObjectURL(imageUrl);
        setPreview("");
      };
    //Report
    const canSubmit = () => {
        return imageUrl.length !== 0 && content !== "" && title !== "" && category !=="" && targetId !=="";
      }
    
    const handleSubmit = useCallback(async (e) => {
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
          formData.append("imageUrl",imageUrl) 
          await axios.post(`${process.env.REACT_APP_HOST}/report/${targetId}`, formData, {
            headers: {
              "content-type": "multipart/form-data",
              "Authorization": localStorage.getItem("Authorization"), //accesstoken 
              "RefreshToken": localStorage.getItem("RefreshToken"),
            },
          });
          window.alert("🚨신고가 완료되었습니다🚨");
          navigate("/");
        } catch (e) {
          // 서버에서 받은 에러 메시지 출력
          window.alert("오류발생!" + "😭");
        }
    
      }, [canSubmit]);
    return (
        <ReportContainerDiv>
            
            <ReportSelectDiv>
                <Reportselect onChange={handleSelectChange}>
                    {OPTIONS.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </Reportselect>
            </ReportSelectDiv>
                <ImageWrapper>    
                    <img
                    alt="이미지를 업로드 해주세요."
                    src={preview ? preview : defaultImage}
                    onClick={() => { inputRef.current.click() }}
                    />
                    
                    <input
                        type="file"
                        accept="image/jpg,image/png,image/jpeg,image/gif"
                        style={{display:'none'}}
                        onChange={handleAddImage}
                        ref={inputRef}
                    />
                   <button onClick={()=>handelDeleteImage()}>삭제</button>
                </ImageWrapper>
            <ReportInputDiv>
                <ReportTarget
                    placeholder="신고 대상 닉네임을 적어주세요"
                    type={"text"}
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    row="10">
                </ReportTarget>

                <ReportTitle
                    placeholder="제목을 입력해 주세요."
                    type={"text"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    row="10">
                </ReportTitle>
                    
                <ReportContent 
                    placeholder="내용을 입력해 주세요."
                    type={"text"}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    row="10">
                </ReportContent>
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
                            size="small"
                        >
                            사진과 내용을 모두 입력하세요🚨
                        </Button>
                    )}
                </SubmitBtn>
            </ReportInputDiv>

        </ReportContainerDiv>
    )
}

export default Report;
const Reportselect = styled.select`
    width: 300px;
    height: 30px;
`

const ReportContainerDiv = styled.div`
    display: flex; 
    flex-wrap: wrap;
    flex-direction: column; /*수직 정렬*/
    justify-content: center;
    align-items:center;
`

const ReportSelectDiv = styled.div`
    flex:1;
    margin-top: 14vh;
`
const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 300px;
        height: 300px;
        margin-top: 15px;
    }
    button{
        width: 50px;
        margin-top: 10px;
    }
`
const ReportInputDiv = styled.div`
    width: 300px;
    margin-top: 30px;
    justify-content: center;
    align-items:center;
`
const ReportTarget = styled.input`
    width:300px;
    height : 30px;
    border: none;
    border-bottom: 1px solid gray;
    margin-top:15px;
`
const ReportTitle = styled.input`
    width:100%;
    height : 30px;
    margin-top:15px;
`

const ReportContent = styled.textarea`
    width: 100%;
    height : 180px;
    resize: none;
    margin-top: 15px;
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