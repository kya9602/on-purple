import styled from "@emotion/styled";
import React, { useState } from "react";

const Report = () => {
    const [fileImage, setFileImage] = useState("");
    const [Report, setReport] = useState("");
    console.log(Report)
    //select
    const OPTIONS = [
        { value: "카테고리 선택", name: "카테고리 선택"},
        { value: "가짜 프로필", name: "가짜 프로필" },
        { value: "미성년자", name: "미성년자" },
        { value: "성적인 콘텐츠", name: "성적인 콘텐츠" },
        { value: "사기, 영업활동", name: "사기, 영업활동" },
        { value: "폭력, 위협", name: "폭력, 위협" },
    ];
    const handleSelectChange = (e) => {
		console.log(e.target.value);
	};
    //image
    const handleFileChange = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]))
    }
    const handleFileDelete = () => {
        URL.revokeObjectURL(fileImage);
        setFileImage("");
      };

    //Report
    




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

            <ReportImgDiv>
                <PreviewDiv >
                    {fileImage===""?
                    <label htmlFor="input-file">사진 추가</label>:
                    <PreviewImg src={fileImage}></PreviewImg>}                    
                </PreviewDiv>    
                <ImgInput type="file" id="input-file" accept="image/*" onChange={handleFileChange} />
                <PreviewDeleteButton onClick={handleFileDelete}>삭제</PreviewDeleteButton>
            </ReportImgDiv>

            <ReportInputDiv>
                <ReportText 
                    placeholder="내용을 입력해 주세요."
                    type={"text"}
                    value={Report}
                    onChange={(e) => setReport(e.target.value)}
                    row="10">
                </ReportText>
                <ReportSendButton>보내기</ReportSendButton>
            </ReportInputDiv>

        </ReportContainerDiv>
    )
}

export default Report;
const Reportselect = styled.select`
    width: 300px;
    border-radius: 8px;
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

const ReportImgDiv = styled.div`
    width: 300px;
    margin-top: 60px;
    justify-content: center;
    align-items:center;
`
const ReportInputDiv = styled.div`
    flex:1;
    width: 300px;
    margin-top: 60px;
    justify-content: center;
    align-items:center;
`

const ReportText = styled.textarea`
    width: 300px;
    height : 150px;
    resize: none;
    border-radius: 8px;
    
`
const PreviewDiv = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid gray;
    border-radius: 30px;
    display: flex;
    justify-content:center;
    align-items: center;
`
const ImgInput = styled.input`
    visibility:hidden;
`
const PreviewImg = styled.img`
    width: 101px;
    height: 101px;
    border-radius:30px;
`
const PreviewDeleteButton = styled.button`
    display: block;
`

const ReportSendButton = styled.button`
    margin-top: 18px;
    display: block;
`