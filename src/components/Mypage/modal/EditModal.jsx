import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "./Modal";



const EditModal = (props) => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");


    const handleChangeInput = (e, setState) => {
        setState(e.target.value);
    };

    const handleClickUpdatePost = async () => {



        const data = {
            password: password,
            passwordConfirm: passwordConfirm,
        };

        let a = await axios.put(`${process.env.REACT_APP_HOST}/mypage/password`, data,
            {
                headers: {
                    "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                    "RefreshToken": localStorage.getItem("RefreshToken"),
                }
            });
        console.log(a.data);
        if (a.data.success) {
            alert('정보가 수정되었습니다.');
            window.location.reload();
        }


    };

    return (
        <Modal ref={props.modalRef}>
            <Header>비밀번호를 변경하시겠습니까?</Header>

            <TitleWrapper backgroundColor={{ color: "ivory" }}>
                <StyledTextarea
                    value={password}
                    type="password"
                    placeholder="새 비밀번호"
                    backgroundColor={{ color: "ivory" }}
                    onChange={(e) => handleChangeInput(e, setPassword)} />
            </TitleWrapper>


            <TitleWrapper backgroundColor={{ color: "ivory" }}>
                <StyledTextarea
                    value={passwordConfirm}
                    type="password"
                    placeholder="새 비밀번호를 재입력해주세요."
                    onChange={(e) => handleChangeInput(e, setPasswordConfirm)} />
            </TitleWrapper>
            {passwordConfirm &&
                (password !== passwordConfirm ?
                    (<div style={{ marginTop: "20px", fontSize: "13px", color: "red", fontWeight: "600" }}>비밀번호를 동일하게 입력해주세요</div>)
                    :
                    (<div style={{ marginTop: "20px", fontSize: "13px", color: "blue", fontWeight: "600" }}>비밀번호가 일치하였습니다 </div>)

                )}


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
    font-size : 22px;
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
  font-size: 16px;
  font-weight: 600;
  padding: 3%;
  cursor: pointer;
:hover{
    background-color: #80036f;
    color:white;
    padding: 3%;

}
`