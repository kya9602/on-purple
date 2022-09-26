import styled from "styled-components";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/perple.jpg";
import profileImage from "../../assets/images/profile.jpg";
import axios from "axios";

const Form = () => {
    const navigate = useNavigate();


    const [imageUrl, setImageUrl] = useState([profileImage]); // img input value
    const [formData] = useState(new FormData())

    // Event Handler
    // Img Upload hadler
    const inputRef = useRef(null);
    const onUploadImg = (fileBlob) => {
        formData.append('imageUrl', fileBlob);

        for (const keyValue of formData) {
            console.log(keyValue[0] + ", " + keyValue[1])
        };

        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageUrl(reader.result);
                resolve();
            };
        });

    };

    const [input, setInput] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        nickname: "",
        imageUrl: ""
    });

    const [usernameError, setusernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
    const [nicknameError, setnicknameError] = useState(false);


    //유효성검사
    const onChangeusername = (e) => {
        // console.log("e.target.value is", e.target.value)
        // console.log("e.target.value.length is ", e.target.value.length)
        const usernameRegex = /^[A-Za-z0-9+]{4,10}$/;
        if ((4 < e.target.value.length < 10 && (usernameRegex.test(e.target.value))))
            setusernameError(false);
        else if (e.target.value.length === 0 || !(usernameRegex.test(e.target.value))) {
            setusernameError(true);
        }


        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };


    const onChangePassword = (e) => {

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$/;

        if ((8 < e.target.value.length < 20 && (passwordRegex.test(e.target.value)))) setPasswordError(false);
        else setPasswordError(true);

        if (e.target.value.length === 0 || !(passwordRegex.test(e.target.value))) setPasswordConfirmError(false);
        else if (e.target === 0 || !(passwordRegex.test(e.target.value))) { setPasswordConfirmError(true); }
        // setInput(e.target.value);
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };


    const onChangePasswordConfirm = (e) => {
        if (input.password === e.target.value) setPasswordConfirmError(false);
        else setPasswordConfirmError(true);
        // setPasswordConfirmError(e.target.value);
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const onChangenickname = (e) => {
        // console.log("e.target.value is", e.target.value)
        // console.log("e.target.value.length is ", e.target.value.length)
        const nicknameRegex = /^[A-Za-z]{2,6}$/;
        if ((2 < e.target.value.length < 6 && (nicknameRegex.test(e.target.value))))
            setnicknameError(false);
        else if (e.target.value.length === 0 || !(nicknameRegex.test(e.target.value))) {
            setnicknameError(true);
        }


        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };
    //유효성 검사
    const validation = () => {
        if (!input.username) setusernameError(true);
        if (!input.password) setPasswordError(true);
        if (!input.passwordConfirm) setPasswordConfirmError(true);
        if (!input.nickname) setnicknameError(true);

        if (usernameError && passwordError && passwordConfirmError && nicknameError) return true;
        else return false;
    }

    // axios
    const addHandler = async () => {
        const { username, password, passwordConfirm, nickname, } = input;
        const user = {
            username: username,
            nickname: nickname,
            password: password,
            passwordConfirm: passwordConfirm,
        };
        // formData.append("username", username)
        // formData.append("nickname", nickname)
        // formData.append("password", password)
        // formData.append("passwordConfirm", passwordConfirm)

        // formData.append("info", user)

        let json = JSON.stringify(user);
        const usernameblob = new Blob([json], { type: "application/json" });
        formData.append("info", usernameblob);

        const nicknameblob = new Blob([json], { type: "application/json" });
        formData.append("info", nicknameblob);

        const passwordblob = new Blob([json], { type: "application/json" });
        formData.append("info", passwordblob);

        const passwordConfirmblob = new Blob([json], { type: "application/json" });
        formData.append("info", passwordConfirmblob);

        console.log("user is ", user)
        try {

            const data = await axios.post("http://3.37.88.29:8080/user/signup", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(data);

            if (data.data.success === false)
                alert(data.data.error.message);
            else {
                alert("회원가입이 완료되었습니다.");
                navigate('/login');
            }
            // return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            // return thunkAPI.rejectWithValue(error);
            alert("가입에 실패했습니다");
        }


        // }
        console.log(validation());

        if (validation()) {

        }
        return;
    };




    return (
        <StRegisterBox>
            <StHeader>
                <StHeaderTitle>회원가입</StHeaderTitle>
            </StHeader>
            <form style={{ marginTop: "10px" }} >

                <ImgBox >
                    <Avatar
                        src={imageUrl}
                        style={{ margin: '20px' }}
                        size={200}
                        onClick={() => { inputRef.current.click() }} />
                    <input
                        type='file'
                        id='imageUrl'
                        style={{ display: 'none' }}
                        accept='image/jpg,impge/png,image/jpeg'
                        name='imageUrl'
                        onChange={(e) => { onUploadImg(e.target.files[0]) }}
                        ref={inputRef} />
                </ImgBox>



                <InputBox>
                    <StLabel style={{ marginRight: "5px" }}> ❤ 아이디</StLabel>
                    <StInput
                        type="text"
                        name="username"
                        id="username"
                        placeholder="아이디를 입력해주세요"
                        value={input.username}
                        onChange={onChangeusername}
                    />
                    <StLine>❤</StLine>
                    <StIdCheck>중복확인</StIdCheck>
                </InputBox>
                {input.username.length <= 0 ? null : usernameError ? <StSmallWorning>아이디 형식을 확인하세요</StSmallWorning> :
                    <div style={{ marginLeft: "45%", fontSize: "13px", color: "blue", fontWeight: "600" }}>올바른 아이디형식입니다!</div>}
                {/* <StSmallWorning>아이디 형식을 확인하세요</StSmallWorning> */}
                <StsmallLabel style={{ marginBottom: "1%" }}>* 아이디는 영어와 숫자로 4~10자로 입력해주세요. *</StsmallLabel>
                <StLineBox>
                    {/* <StLine>❤</StLine> */}
                </StLineBox>



                <InputBox >
                    <StLabel style={{ marginRight: "5px" }}>❤ 비밀번호</StLabel>
                    <StInput
                        type="password"
                        name="password"
                        id="password"
                        placeholder="비밀번호를 입력해주세요"
                        onChange={onChangePassword}
                        value={input.password}
                    />
                    <StLine>❤</StLine>

                </InputBox>
                {input.password.length <= 0 ? null : passwordError ? <StSmallWorning>비밀번호 형식을 확인하세요</StSmallWorning> :
                    <div style={{ marginLeft: "45%", fontSize: "13px", color: "blue", fontWeight: "600" }}>안전한 비밀번호입니다!</div>}
                <StsmallLabel style={{ marginBottom: "1%" }}>* 비밀번호는 영어, 숫자 포함 8자이상 20자이하로 입력해주세요. * </StsmallLabel>
                <StLineBox>
                    {/* <StLine>❤</StLine> */}
                </StLineBox>




                <InputBox >
                    <StLabel style={{ marginRight: "5px" }}>❤ 비밀번호 재확인</StLabel>
                    <StInput
                        type="password"
                        name="passwordConfirm"
                        id="passwordConfirm"
                        placeholder="비밀번호를 재입력해주세요"
                        onChange={onChangePasswordConfirm}
                        value={input.passwordConfirm}
                    />
                    <StLine>❤</StLine>

                </InputBox>
                {passwordConfirmError &&
                    <StSmallWorning className="invalid-input">비밀번호가 일치하지 않습니다.</StSmallWorning>}
                <StsmallLabel style={{ marginBottom: "1%" }}>* 비밀번호를 위에와 동일하게 입력해주세요. *</StsmallLabel>
                <StLineBox>
                    {/* <StLine>❤</StLine> */}
                </StLineBox>




                <InputBox>
                    <StLabel style={{ marginRight: "5px" }}>❤  닉네임</StLabel>
                    <StInput
                        type="text"
                        name="nickname"
                        id="nickname"
                        placeholder="닉네임을 입력해주세요"
                        onChange={onChangenickname}
                        value={input.nickname}
                    />
                    <StLine>❤</StLine>

                    <StIdCheck>중복확인</StIdCheck>
                </InputBox>
                {/* <StSmallWorning>닉네임 형식을 확인하세요</StSmallWorning> */}
                {input.nickname.length <= 0 ? null : nicknameError ? <StSmallWorning>닉네임 형식을 확인하세요</StSmallWorning> :
                    <div style={{ marginLeft: "45%", fontSize: "13px", color: "blue", fontWeight: "600" }}>올바른 닉네임형식입니다!</div>}
                <StsmallLabel style={{ marginBottom: "1vw" }}>* 닉네임는 한글로 2~6자로 입력해주세요. *</StsmallLabel>

            </form>
            <StBtnBox>
                <JoinBtn onClick={() => { addHandler(); console.log("input type is", typeof (input)) }}>회원가입 완료</JoinBtn>
            </StBtnBox>
        </StRegisterBox>
    );
}

export default Form;

//헤더박스
const StHeader = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  ::after { 
    width: 100vw;
    height: 45%;
    content: "";
    background: url(${logo});
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.5;
    background-size: cover;
    /* background-repeat: no-repeat; */
}
`

//헤더 타이틀
const StHeaderTitle = styled.div`
    font-size: 35px;
    font-weight: 600;
    margin-top: 2vw;
    margin-bottom: 1vw;
    background: #ecd9f7;
    background: -webkit-linear-gradient(left, #420255, #ecd9f7);
    background:    -moz-linear-gradient(right, #420255, #ecd9f7);
    background:      -o-linear-gradient(right, #420255, #ecd9f7);
    background:         linear-gradient(to right, #420255, #ecd9f7);
    -webkit-background-clip: text;
            background-clip: text;
    color: transparent;
    font-weight: bold;
`

//전체 박스 
const StRegisterBox = styled.div`
    width: 40vw;
    height: auto;
    padding-bottom: 1%;
    margin: auto;
    margin-top: 7%;
    border: 5px solid #fdc2f0;
    border-radius: 15px;
    background-color: white;
`;

//이미지 박스 
const ImgBox = styled.div`
  display  : flex ;
  justify-content: center;
`;

//이미지 input
const Avatar = styled.img`
   border: 5px solid #f8b2f8;
    border-radius: 100px;
    width: 10vw;
    height: 10vw;
    background-size: cover;
`
//인풋 박스
const InputBox = styled.div`
    display: flex;
    justify-content: center;
`;

//박스안 타이틀
const StLabel = styled.label`
  margin-top: 1%;
  color : #6d0488;
  font-weight: bolder;
  padding: 1%;
  text-align: center;
  font-size: 15px;
`;

//아이디 인풋창
const StInput = styled.input`
  margin-top: 1%;
  border: none;
  border-radius: 5px;
  font-size: 15px; 
  padding:1%;
  :hover{
    border: 2px solid #f530f5;
  }
`;

//아이디 중복확인 버튼
const StIdCheck = styled.button`
  margin-left: 1%;
  border: 2px solid #6e96ee;
  background-color: white;
  border-radius: 10px;
  :hover{
    border: none;
    background-color: #4097df;
    color:white;
  }
`;

//인풋 참고사항 라벨
const StsmallLabel = styled.label`
    display: flex;
    justify-content: center;
    font-size: 10px;
    color:gray;
    
`;

//버튼 박스
const StBtnBox = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 1%;
`;

//회원가입 버튼
const JoinBtn = styled.button`
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 1%;
  font-weight: bold;
  font-size: 20px;
  color:#80036f;
  :hover{
    border: none;
    background-color: #80036f;
    color:white;
    font-weight: 800;
    padding: 1%;
  
}
`;

//비밀번호 오류 라벨
const StSmallWorning = styled.label`
  font-size: 12px;
  color: red;
  font-weight: 600;
  margin-left:45% ;
`;

//구분선 박스 
const StLineBox = styled.div`
  justify-content: center;
  display: flex;
`;

//구분선
const StLine = styled.div`
  margin-top:1.3%;
  color :#6d0488
`;