import styled from "styled-components";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/moon.jpg";
import profileImage from "../../assets/icons/profile.jpg";
import axios from "axios";

const Form = () => {
    const navigate = useNavigate();


    const [imageUrl, setImageUrl] = useState(profileImage); // img input value
    const [formData] = useState(new FormData())

    // Event Handler
    // Img Upload hadler
    const inputRef = useRef(null);
    const onUploadImg = useCallback((fileBlob) => {
        formData.append('file', fileBlob);
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

    }, []);

    const [input, setInput] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        imageUrl: "",
    });

    const [usernameError, setusernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);



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

    //유효성 검사
    const validation = () => {
        if (!input.username) setusernameError(true);
        if (!input.password) setPasswordError(true);
        if (!input.passwordConfirm) setPasswordConfirmError(true);

        if (usernameError && passwordError && passwordConfirmError) return true;
        else return false;
    }

    // axios
    const postHandler = async () => {

        const { nickname, password, passwordConfirm } = input;
        const user = {
            nickname: nickname,
            password: password,
            passwordConfirm: passwordConfirm
        };

        formData.append('username', input.username);
        formData.append('password', input.password);
        formData.append('passwordConfirm', input.passwordConfirm);

        // console.log(typeof (usernameblob, passwordblob, passwordConfirmblob, contentblob, locationblob));
        for (const keyValue of formData) {
            console.log("Ready to data>>", keyValue[0] + ", " + keyValue[1])
        }


        try {

            const response = await axios.post("http://13.209.26.228:8080/user/signup", formData,

                {
                    headers: {
                        "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                        "RefreshToken": localStorage.getItem("RefreshToken"),
                        'Content-Type': 'multipart/form-data',
                    }
                });
            console.log("👏 Axios Work >>> ", response)

            if (response.status === 200 || 201) {
                window.alert("회원가입이 완료되었습니다.")
                console.log("newPosting: ", response.data)
                navigate('/login') //로그인화면으로
            } else {
                console.log("Not Ok")
                console.error(response)
            }

        } catch (error) {
            window.alert("🥒ERROR🥒")
            console.error(error);
            setImageUrl("")
        }
        console.log(validation());

        if (validation()) {

        }
        return;
    };

    useEffect(() => {

    }, []);


    return (
        <StRegisterBox>
            <StHeader>
                <StHeaderTitle>회원가입</StHeaderTitle>
            </StHeader>
            <form style={{ marginTop: "10px" }} >
                {/* <MyProfile src={profileImage}></MyProfile> */}
                <ImgBox >
                    <Avatar
                        src={imageUrl}
                        style={{ margin: '20px' }}
                        size={200}
                        onClick={() => { inputRef.current.click() }} />
                    <input
                        type='file'
                        style={{ display: 'none' }}
                        accept='image/jpg,impge/png,image/jpeg'
                        name='profile_img'
                        onChange={(e) => { onUploadImg(e.target.files[0]) }}
                        ref={inputRef} />
                </ImgBox>



                <InputBox>
                    <StLabel style={{ marginRight: "5px" }}>아이디</StLabel>
                    <StInput
                        type="text"
                        name="username"
                        id="username"
                        placeholder="아이디를 입력해주세요"
                        value={input.username}
                        onChange={onChangeusername}
                    />
                    <StIdCheck>중복확인</StIdCheck>
                </InputBox>
                {/* <StSmallWorning>아이디 형식을 확인하세요</StSmallWorning> */}
                <StsmallLabel style={{ marginBottom: "10px", marginTop: "5px" }}>* 아이디는 영어와 숫자로 4~10자로 입력해주세요. *</StsmallLabel>
                <StLineBox>
                    <StLine>❤</StLine>
                </StLineBox>



                <InputBox >
                    <StLabel style={{ marginRight: "5px" }}>비밀번호</StLabel>
                    <StInput
                        type="password"
                        name="password"
                        id="password"
                        placeholder="비밀번호를 입력해주세요"
                        onChange={onChangePassword}
                        value={input.password}
                    />
                </InputBox>
                {/* <StSmallWorning>비밀번호 형식을 확인하세요</StSmallWorning> */}
                <StsmallLabel style={{ marginBottom: "10px" }}>* 비밀번호는 영어, 숫자 포함 8자이상 20자이하로 입력해주세요. * </StsmallLabel>
                <StLineBox>
                    <StLine>❤</StLine>
                </StLineBox>




                <InputBox >
                    <StLabel style={{ marginRight: "5px" }}>비밀번호 재확인</StLabel>
                    <StInput
                        type="password"
                        name="passwordConfirm"
                        id="passwordConfirm"
                        placeholder="비밀번호를 재입력해주세요"
                        onChange={onChangePasswordConfirm}
                        value={input.passwordConfirm}
                    />
                </InputBox>
                {/* <StSmallWorning className="invalid-input">비밀번호가 일치하지 않습니다.</StSmallWorning> */}
                <StsmallLabel style={{ marginBottom: "10px" }}>* 비밀번호를 위에와 동일하게 입력해주세요. *</StsmallLabel>
                <StLineBox>
                    <StLine>❤</StLine>
                </StLineBox>




                <InputBox>
                    <StLabel style={{ marginRight: "5px" }}>닉네임</StLabel>
                    <StInput
                        type="text"
                        name="nickname"
                        id="nickname"
                        placeholder="닉네임을 입력해주세요"
                    />
                    <StIdCheck>중복확인</StIdCheck>
                </InputBox>
                {/* <StSmallWorning>닉네임 형식을 확인하세요</StSmallWorning> */}
                <StsmallLabel style={{ marginBottom: "10px", marginTop: "5px" }}>* 닉네임는 한글로 2~6자로 입력해주세요. *</StsmallLabel>

            </form>
            <StLineBox>
                <StLine>❤</StLine>
            </StLineBox>
            <StBtnBox>
                <JoinBtn onClick={() => { postHandler(); console.log("input is", input) }}>회원가입 완료</JoinBtn>
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
    font-size: 45px;
    margin-top: 50px;
    margin-bottom: 50px;
`

//전체 박스 
const StRegisterBox = styled.div`
    width: 40vw;
    height: auto;
    padding-bottom: 2%;
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
   border: 7px solid #ec79ec;
    border-radius: 100px;
    width: 200px;
    height: 200px;
    background-size: cover;
    margin-left: 100px;
`

// //이미지 넣는곳 
// const MyProfile = styled.img`
//     border: 7px solid #ec79ec;
//     border-radius: 100px;
//     width: 200px;
//     height: 200px;
//     margin: 50px auto 50px auto;
//     background-size: cover;
//     display: flex;
// `



//인풋 박스
const InputBox = styled.div`
    display: flex;
    justify-content: center;
`;

//박스안 타이틀
const StLabel = styled.label`
  margin-top: 5px;
  color : #6d0488;
  font-weight: bolder;
  padding: 1%;
  text-align: center;
  font-size: 20px;
`;

//아이디 인풋창
const StInput = styled.input`
  margin-top: 5px;
  border: none;
  border-radius: 5px;
  font-size: 20px; 
  padding:1%;
  :hover{
    border: 3px solid #f530f5;
  }
`;

//아이디 중복확인 버튼
const StIdCheck = styled.button`
  margin-left: 5px;
  border: 3px solid #6e96ee;
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
    font-size: 12px;
    color:gray;
    
`;

//버튼 박스
const StBtnBox = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 20px;
`;

//회원가입 버튼
const JoinBtn = styled.button`
  margin-top: 10px;
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 1%;
  font-weight: bold;
  font-size: 25px;
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
  
`;