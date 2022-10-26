import React from "react";
import styled from "styled-components";

const TextArea = ({ setTitle, setContent, title, content }) => {
    return (
        <TextAreaWrapper>
            <input
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                className="title"
                maxLength={15}
                placeholder="제목을 입력하세요(15자 이내)"
                value={title}
            />
            <textarea
                onChange={(e) => {
                    setContent(e.target.value);
                }}
                className="text"
                maxLength={300}
                placeholder="내용을 입력하세요(300자 이내)"
                value={content}
            />
        </TextAreaWrapper>
    );
};
export default TextArea;

const TextAreaWrapper = styled.div`
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    .title {
        margin-bottom: 0.7rem;
    }
    .text {
        width: 380px;
        height: 300px;
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