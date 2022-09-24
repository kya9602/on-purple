import React from "react";
import styled from "styled-components"

const AddComment = () => {
    return(
        <Container>
            <Text
                className="text"
                placeholder="댓글을 입력하세요"
            />
            <AddButton>등록</AddButton>
        </Container>
    )
}

export default AddComment;

const Container = styled.div`
    justify-content: center;
    display: flex;
    gap: 20px;
`
const AddButton = styled.button`
    width: 80px;
    height: 70px;
`

const Text =styled.textarea`
    width: 800px;
    height: 70px;
`