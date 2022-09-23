import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "./Modal";


const isEmpty = (string) => {
    return (typeof string === 'undefined') || (string === null) || (string === '');
};

const EditModal = (props) => {
    const [password, setPassword] = useState(props.post.password);
    const [newPassword, setNewPassword] = useState(props.post.newPassword);
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [errorMessages, setErrorMessages] = useState({});
    const errors = {
        password: '비밀번호가 일치하지않습니다.',
        newPassword: '그 전 비밀번호와 다르게 입력해주세요',
        newPasswordConfirm: '새로운 비밀번호와 일치하게 입력해주세요',
    };

    const handleChangeInput = (e, setState) => {
        setState(e.target.value);
    };

    const handleClickUpdatePost = async () => {
        const isPasswordMatched = password === props.post.password;
        const isEmptyPassword = isEmpty(password);
        const isEmptynewPassword = isEmpty(newPassword);
        const isEmptynewPasswordConfirm = isEmpty(newPasswordConfirm);
        const editable = isPasswordMatched && !isEmptyPassword && !isEmptynewPassword;

        if (editable) {
            const data = {
                password: password,
                newPassword: newPassword,
                newPasswordConfirm: newPasswordConfirm,
                timestamp: new Date().getTime(),
            };
            const URL = `${props.post.id}`
            const response = await axios.patch(URL, data);

            window.location.reload();
        } else {
            if (!isPasswordMatched) {
                setErrorMessages({
                    errorType: "password",
                    message: errors.password,
                });
            } else if (isEmptynewPassword) {
                setErrorMessages({
                    errorType: "newPassword",
                    message: errors.newPassword,
                });
            } else if (isEmptynewPasswordConfirm) {
                setErrorMessages({
                    errorType: "newPasswordConfirm",
                    message: errors.newPasswordConfirm,
                });
            }
        }
    };

    const renderErrorMessage = (errorType) => {
        return (errorType === errorMessages.errorType && (
            <strong style={{ color: "red" }}>
                {errorMessages.message}
            </strong>
        ));
    };

    // useEffect(() => {
    //     passwordRef.current.focus();
    // }, []);

    return (
        <Modal ref={props.modalRef}>
            <p>비밀번호를 변경하시겠습니까?</p>
            <TitleWrapper backgroundColor={{ color: "ivory" }}>
                <StyledTextarea
                    value={password}
                    onChange={(e) => handleChangeInput(e, setPassword)}
                    type="password"
                    placeholder="비밀번호"
                    backgroundColor={{ color: "ivory" }} />
            </TitleWrapper>
            {renderErrorMessage("password")}
            <TitleWrapper backgroundColor={{ color: "ivory" }}>
                <StyledTextarea
                    value={newPassword}
                    type="password"
                    placeholder="새 비밀번호"
                    backgroundColor={{ color: "ivory" }}
                    onChange={(e) => handleChangeInput(e, setNewPassword)} />
            </TitleWrapper>
            {renderErrorMessage("newPassword")}
            <newPasswordWrapper backgroundColor={{ color: "ivory" }}>
                <StyledTextarea
                    value={newPassword}
                    type="password"
                    placeholder="새 비밀번호를 재입력해주세요."
                    backgroundColor={{ color: "ivory" }}
                    onChange={(e) => handleChangeInput(e, setNewPasswordConfirm)} />
            </newPasswordWrapper>
            {renderErrorMessage("newPasswordConfirm")}
            <ButtonWrapper>
                <CommonButton
                    backgroundColor={{ color: "ivory" }}
                    newPasswordColor={{ color: "ivory" }}>
                    <div onClick={handleClickUpdatePost}>수정하기</div>
                </CommonButton>
            </ButtonWrapper>
        </Modal>
    );
};


export default EditModal;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: ${prop => prop.backgroundColor};
  border: none;
  resize: none;
`;

const TitleWrapper = styled.div`
    
`

const StyledInput = styled.div`
    
`

const ButtonWrapper = styled.div`
    
`

const CommonButton = styled.button`
    
`