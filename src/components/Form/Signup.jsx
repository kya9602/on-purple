import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/perple.jpg";
import profileImage from "../../assets/images/profile.jpg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { __checkUsername, __checkNickname } from "../../redux/modules/user";
import { width } from "@mui/system";

const Newjoin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialState = {
        username: '',
        nickname: '',
        password: '',
        passwordConfirm: '',
        imageUrl: ''
    }

    const [user, setUser] = useState(initialState);



    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, });
    };

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



    // axios
    const addHandler = async () => {

        if (user.username.trim() === "" || user.nickname.trim() === "" || user.password.trim() === "" || user.passwordConfirm.trim() === "") {
            return alert("모든 칸을 채워주세요! 👀")
        } else if (user.imageUrl.trim === "") {
            return alert("사진을 등록해주세요! 😎")
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


        const data = await axios.post(`${process.env.REACT_APP_HOST}/user/signup`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        localStorage.setItem("Authorization", data.headers.authorization)    //accesstoken
        localStorage.setItem("RefreshToken", data.headers.refreshtoken)   //refreshtoken 
        localStorage.setItem("nickname", data.data.data.nickname)

        console.log(data.data);

        if (data.data.success) {
            alert('다음 step으로 넘어가주세요~');
            // navigate('/login');

        }
        else {
            window.alert(data.error.message)
        }
        setUser.preventDefault();
    };


    //유효성검사 
    const regexUsername = /^[A-Za-z0-9+]{4,12}$/;
    const regexNickname = /^[A-Za-z0-9+]{4,12}$/;
    const regexPassword = /^[A-Za-z0-9]{4,20}$/;



    //아이디 중복 체크
    const usernameCheckHandler = async (e) => {
        e.preventDefault();
        const { username } = user;
        const member = {
            username: username
        };
        dispatch(__checkUsername(member));

        return;
    };


    //닉네임 중복 체크
    const nicknameCheckHandler = async (e) => {
        e.preventDefault();
        const { nickname } = user;
        const member = {
            nickname: nickname
        };
        dispatch(__checkNickname(member));

        return;
    };

    return (
        <div>
            {/* <StHeader>
                <StHeaderTitle> On Purple </StHeaderTitle>
                <StHeaderBody>나만의 특별한 보랏빛 라이트를 켜줘</StHeaderBody>
            </StHeader> */}

            <StRegisterBox>
                {/* <StminiHeader>
                    <StminiHeaderTitle>회원가입</StminiHeaderTitle>
                </StminiHeader> */}
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
                        <div style={{ display: "flex", gap: "30px", }}>
                            <StLabel style={{ paddingLeft: "110px" }}> ❤ 아이디 ❤</StLabel>
                            <StIdCheck content={"check"} onClick={usernameCheckHandler}>중복확인</StIdCheck>
                        </div>
                        <StInput
                            type="text"
                            name="username"
                            id="username"
                            placeholder="아이디를 입력해주세요"
                            value={user.username}
                            onChange={onChangeHandler}
                            maxLength="10"
                        />
                        <StLine></StLine>
                    </InputBox>

                    {/*정규표현식 충족 ? 사용가능한 아이디 : 정규표현식 알려주기 */}

                    {user.username &&

                        (regexUsername.test(user.username) ?
                            (<div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "13px", color: "blue", fontWeight: "600" }}>올바른 아이디형식입니다!</div>
                                <CheckLabel>중복확인을 해주세요!!!🧐</CheckLabel>
                            </div>)
                            :
                            (<div style={{ textAlign: "center" }}>
                                <StSmallWorning>아이디 형식을 확인하세요</StSmallWorning>
                                <StsmallLabel>영어와 숫자로 4-12글자수로 적어주세요</StsmallLabel>
                            </div>))

                    }






                    <InputBox >
                        <StLabel style={{ marginRight: "5px" }}>❤ 비밀번호 ❤</StLabel>
                        <StInput
                            type="password"
                            name="password"
                            id="password"
                            placeholder="비밀번호를 입력해주세요"
                            onChange={onChangeHandler}
                            value={user.password}
                            maxLength="20"
                        />
                        <StLine></StLine>
                    </InputBox>
                    {
                        user.password &&
                        (regexPassword.test(user.password) ?
                            (<div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "13px", color: "blue", fontWeight: "600" }}>안전한 비밀번호입니다!</div>
                            </div>)
                            :
                            (<div style={{ textAlign: "center" }}>
                                <StSmallWorning>비밀번호 형식을 확인하세요</StSmallWorning>
                                <StsmallLabel>영어와 숫자로 4-20글자수로 적어주세요</StsmallLabel>
                            </div>
                            )
                        )
                    }





                    <InputBox >
                        <StLabel style={{ marginRight: "5px" }}>❤ 비밀번호 재확인 ❤</StLabel>
                        <StInput
                            type="password"
                            name="passwordConfirm"
                            id="passwordConfirm"
                            placeholder="비밀번호를 재입력해주세요"
                            onChange={onChangeHandler}
                            value={user.passwordConfirm}
                            maxLength="20"
                        />
                        <StLine></StLine>
                    </InputBox>
                    {
                        user.passwordConfirm &&
                        (user.password !== user.passwordConfirm ?
                            (<div style={{ textAlign: "center" }}>
                                <StSmallWorning>비밀번호가 일치하지않습니다😨</StSmallWorning>
                            </div>)
                            :
                            (<div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "13px", color: "blue", fontWeight: "600" }}>비밀번호가 일치합니다 😆 </div>
                            </div>)

                        )
                    }





                    <InputBox>
                        <div style={{ display: "flex", gap: "30px" }}>
                            <StLabel style={{ paddingLeft: "110px" }}>❤ 닉네임 ❤</StLabel>
                            <StIdCheck content={"check"} onClick={nicknameCheckHandler}>중복확인</StIdCheck>
                        </div>
                        <StInput
                            type="text"
                            name="nickname"
                            id="nickname"
                            placeholder="닉네임을 입력해주세요"
                            onChange={onChangeHandler}
                            value={user.nickname}
                            maxLength="6"
                        />
                        <StLine></StLine>
                    </InputBox>

                    {/* 정규표현식 충족 ? 사용가능한 아이디 : 정규표현식 알려주기*/}
                    {user.nickname &&
                        (regexNickname.test(user.nickname) ?
                            (<div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "13px", color: "blue", fontWeight: "600" }}>올바른 닉네임형식입니다!</div>
                                <CheckLabel>자, 이제 중복확인을 해주세요!!!🧐</CheckLabel>
                            </div>
                            )
                            :
                            (<div style={{ textAlign: "center" }}>
                                <StSmallWorning>닉네임 형식을 확인하세요</StSmallWorning>
                                <StsmallLabel>영어와 숫자로 4-12글자수로 적어주세요</StsmallLabel>
                            </div>
                            ))

                    }


                </form>
                <StBtnBox>
                    <JoinBtn onClick={() => { addHandler(); console.log("user is", user); }}>기본정보 입력완료 👆</JoinBtn>
                </StBtnBox>
            </StRegisterBox>
        </div >
    );
}

export default Newjoin;

//배경 헤더 박스
const StHeader = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  ::after { 
    width: 100vw;
    height: 35%;
    content: "";
    background: url(${logo});
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.5;
    background-size: cover;}
`

//배경 헤더 로고 타이틀
const StHeaderTitle = styled.div`
  font-size: 80px;
  font-weight: 600;
  background: #f7e9f5;
  background: -webkit-linear-gradient(left, #420255, #f7e9f5);
  background:    -moz-linear-gradient(right, #420255, #f7e9f5);
  background:      -o-linear-gradient(right, #420255, #f7e9f5);
  background:         linear-gradient(to right, #420255, #f7e9f5);
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  font-weight: bold;
  padding-top: 70px;
`
//배경 헤더 로고 안내글
const StHeaderBody = styled.div`
  font-size: 17px;
  margin-top: 1%;
  background: #09ffff;
  background: -webkit-linear-gradient(left, #420255, #09ffff);
  background:    -moz-linear-gradient(right, #420255, #09ffff);
  background:      -o-linear-gradient(right, #420255, #09ffff);
  background:         linear-gradient(to right, #420255, #09ffff);
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  font-weight: bold;
`

//회원가입 헤더박스
const StminiHeader = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  ::after { 
    width: 100vw;
    height: 45%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.5;
    background-size: cover;
    /* background-repeat: no-repeat; */
}
`

//회원가입 헤더 타이틀
const StminiHeaderTitle = styled.div`
    font-size: 35px;
    font-weight: 600;
    margin-top: 20px;
    background: #420255;
    background: -webkit-linear-gradient(left, #ecd9f7, #420255);
    background:    -moz-linear-gradient(right, #ecd9f7, #420255);
    background:      -o-linear-gradient(right, #ecd9f7, #420255);
    background:         linear-gradient(to right, #ecd9f7, #420255);
    -webkit-background-clip: text;
            background-clip: text;
    color: transparent;
    font-weight: bold;
    @media all and (max-width: 750px) {
    margin-bottom: 15px;
  }
`

//전체 박스 
const StRegisterBox = styled.div`
    margin-bottom: 30px;
    width: 300px;
    height: auto;
    padding-bottom: 1%;
    margin: auto;
    background-color: white;
    /* @media all and (max-width: 750px) {
     width: 600px;
  } */
`;

//이미지 박스 
const ImgBox = styled.div`
  display  : flex ;
  justify-content: center;
  width: 300px;
`;

//이미지 input
const Avatar = styled.img`
   /* border: 5px solid #f8b2f8; */
    /* border-radius: 100px; */
    width: 200px;
    height: 200px;
    background-size: cover;
    cursor: pointer;
    /* @media all and (max-width: 750px) {
     width: 20vw;
     height: 20vw;
     border: 3px solid #f8b2f8;
  } */
`
//인풋 박스
const InputBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    
`;

//박스안 타이틀
const StLabel = styled.label`
  margin-top: 7%;
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
  font-size: 12px; 
  padding:1%;
  font-size: 14px;
  text-align: center;

  border-bottom-style:solid; 
  border-bottom-color:#80036f;
  border-bottom-width:1px;

  &:focus{
    outline:none;
    border-bottom-style:solid; 
    border-bottom-color:#80036f;
    border-bottom-width:3px;
  }
  
  /* @media all and (max-width: 750px) {
     font-size: 15px;
  } */
`;

//아이디 중복확인 버튼
const StIdCheck = styled.button`
  margin-left: 1.5%;
  border: 2px solid #6e96ee;
  background-color: white;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
  height: 30px;
  margin-top: 25px;
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
    font-size: 14px;
    color:gray;
    @media all and (max-width: 750px) {
     font-size: 12px;
  }
`;

//중복확인 안내 라벨
const CheckLabel = styled.label`
    display: flex;
    justify-content: center;
    font-size: 14px;
    color:#424242;
    font-weight: 600;
    @media all and (max-width: 750px) {
     font-size: 12px;
  }
`

//버튼 박스
const StBtnBox = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 1%;
`;

//회원가입 버튼
const JoinBtn = styled.button`
  margin-top: 25px;
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 3%;
  font-weight: bold;
  font-size: 20px;
  color:#80036f;
  :hover{
    border: none;
    background-color: #80036f;
    color:white;
    font-weight: 800;
    padding: 1%;
    cursor: pointer;
}
/* @media all and (max-width: 750px) {
    font-size: 20px;
  } */
`;

//인풋 값 오류 라벨
const StSmallWorning = styled.label`
  font-size: 14px;
  color: red;
  font-weight: 600;
  @media all and (max-width: 750px) {
    font-size: 12px;
  }
`;


//구분선
const StLine = styled.div`
  margin-top:1.6%;
  color :#6d0488;
  font-size: 18px;
  text-align: center;
 @media all and (max-width: 750px) {
    font-size: 15px;
  } 
`;