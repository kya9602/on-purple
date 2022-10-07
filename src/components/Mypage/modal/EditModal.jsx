import { useState } from "react";
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
            <Header>비밀번호를 변경하시겠습니까?</Header>

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


            <TitleWrapper backgroundColor={{ color: "ivory" }}>
                <StyledTextarea
                    value={newPassword}
                    type="password"
                    placeholder="새 비밀번호를 재입력해주세요."
                    onChange={(e) => handleChangeInput(e, setNewPasswordConfirm)} />
            </TitleWrapper>
            {renderErrorMessage("newPasswordConfirm")}


            <ButtonWrapper>
                <Btn onClick={handleClickUpdatePost}>수정하기</Btn>
            </ButtonWrapper>
        </Modal>
    );
};


export default EditModal;

const Header = styled.div`
    margin-top: 65px;
    margin-bottom: 50px;
    font-size : 25px;
    font-weight: 600;
`

const TitleWrapper = styled.div`
  margin-top : 15px ;
  height: 25px;
`

const StyledTextarea = styled.input`
  width: 80%;
  height: 80%;
  background-color: ${prop => prop.backgroundColor};
  margin-top: 1%;
  border: none;
  font-size: 12px; 
  padding:1%;
  font-size: 14px;

  border-bottom-style:solid; 
  border-bottom-color:#333033;
  border-bottom-width:1px;

  &:focus{
    outline:none;
    border-bottom-style:solid; 
    border-bottom-color:#80036f;
    border-bottom-width:3px;
  }
`;


const ButtonWrapper = styled.div`
  margin-top  : 40px ;
`

const Btn = styled.button`
  border : none;
  background-color : white;
  font-size: 18px;
  font-weight: 600;
  padding: 3%;
  cursor: pointer;
:hover{
    background-color: #80036f;
    color:white;
    padding: 3%;

}
`