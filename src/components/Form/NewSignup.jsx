import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/perple.jpg";
import { makeStyles } from '@mui/styles';
import { useDispatch } from "react-redux";
import React, { useState, useRef } from "react";
import axios from "axios";
import profileImage from "../../assets/images/profile.jpg";
import { __checkUsername, __checkNickname } from "../../redux/modules/user";
import { __logout, logout } from "../../redux/modules/user";






export default function VerticalLinearStepper() {

    //===============================================================================================
    //기본회원가입 정보 -------------------------------------------------------------------------------
    //===============================================================================================

    const dispatch = useDispatch();


    const initialState = {
        username: '',
        nickname: '',
        password: '',
        passwordConfirm: '',
        imageUrl: '',
        gender: ''
    }

    const [userinfo, setUserinfo] = useState(initialState);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUserinfo({ ...userinfo, [name]: value, });
    };

    const [imageUrl, setImageUrl] = useState(""); // img input value
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



    // 기본회원정보 axios
    // const addHandler = async () => {

    //     if (userinfo.username.trim() === "" || userinfo.nickname.trim() === "" || userinfo.password.trim() === "" || userinfo.passwordConfirm.trim() === "") {
    //         return alert("모든 칸을 채워주세요! 👀 ")
    //     } else if (userinfo.imageUrl.trim === "") {
    //         return alert("사진을 등록해주세요! 😎")
    //     } else if (gender === "") {
    //         return alert("성별을 선택해주세요! 👀 ")
    //     }

    //     ;

    //     if (usernameCheck === false) {
    //         return alert("아이디 중복확인을 해주세요!!!");
    //     } else if (nicknameCheck === false) {
    //         return alert("닉네임 중복확인을 해주세요!!!")
    //     };


    //     let json = JSON.stringify(userinfo);
    //     const usernameblob = new Blob([json], { type: "application/json" });
    //     formData.append("info", usernameblob);

    //     const nicknameblob = new Blob([json], { type: "application/json" });
    //     formData.append("info", nicknameblob);

    //     const passwordblob = new Blob([json], { type: "application/json" });
    //     formData.append("info", passwordblob);

    //     const passwordConfirmblob = new Blob([json], { type: "application/json" });
    //     formData.append("info", passwordConfirmblob);


    //     let genderJson = JSON.stringify(gender);
    //     const genderblob = new Blob([genderJson], { type: "application/json" });
    //     formData.append("info", genderblob);

    //     console.log("user is ", userinfo)
    //     console.log("gender is ", gender)


    //     const data = await axios.post(`${process.env.REACT_APP_HOST}/user/signup`, formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });

    //     console.log(data.data);

    //     if (data.data.success) {
    //         alert('다음 step으로 넘어가주세요~');
    //         // handleNext();
    //     }
    //     else {
    //         alert("중복확인 및 형식을 다시 확인하여 입력해주세요");
    //     }

    //     setUserinfo(initialState);

    // };

    //유효성검사 
    const regexUsername = /^[A-Za-z0-9+]{4,12}$/;
    const regexNickname = /^[가-힣0-9+]{2,8}$/;
    const regexPassword = /^[A-Za-z0-9+]{4,20}$/;

    const [usernameCheck, setUsernameCheck] = useState(false);


    //아이디 중복 체크
    const usernameCheckHandler = async (e) => {
        e.preventDefault();
        const { username } = userinfo;
        const member = {
            username: username
        };
        dispatch(__checkUsername(member));
        setUsernameCheck(true);
        return;
    };


    const [nicknameCheck, setNicknameCheck] = useState(false);


    //닉네임 중복 체크
    const nicknameCheckHandler = async (e) => {
        e.preventDefault();
        const { nickname } = userinfo;
        const member = {
            nickname: nickname
        };
        dispatch(__checkNickname(member));
        setNicknameCheck(true);
        return;
    };



    //=====================================================================================
    //추가정보입력 ====================================================================
    //======================================================================================

    const [input, setInput] = useState({
        age: "",
        mbti: "",
        introduction: "",
        area: "",

        idealType: "",
        job: "",
        hobby: "",
        drink: "",
        pet: "",
        smoke: "",
        likeMovieType: "",
    });

    const addonChangeHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value, });
    };

    // console.log("input is ", input.age)


    // axios
    const addaddHandler = async () => {
        if (userinfo.username.trim() === "" || userinfo.nickname.trim() === "" || userinfo.password.trim() === "" || userinfo.passwordConfirm.trim() === "") {
            return alert("모든 칸을 채워주세요! 👀 ")
        } else if (userinfo.imageUrl.trim === "") {
            return alert("사진을 등록해주세요! 😎")
        } else if (userinfo.gender.trim === "") {
            return alert("성별을 등록해주세요 ")
        }
        ;

        if (usernameCheck === false) {
            return alert("아이디 중복확인을 해주세요!!!");
        } else if (nicknameCheck === false) {
            return alert("닉네임 중복확인을 해주세요!!!")
        };


        let json = JSON.stringify(userinfo);
        const usernameblob = new Blob([json], { type: "application/json" });
        formData.append("info", usernameblob);

        const nicknameblob = new Blob([json], { type: "application/json" });
        formData.append("info", nicknameblob);

        const passwordblob = new Blob([json], { type: "application/json" });
        formData.append("info", passwordblob);

        const passwordConfirmblob = new Blob([json], { type: "application/json" });
        formData.append("info", passwordConfirmblob);


        const genderblob = new Blob([json], { type: "application/json" });

        formData.append("info", genderblob);





        if (input.age.trim() === "" || input.mbti.trim() === "" || input.introduction.trim() === "" || input.area.trim() === "") {
            return alert("필수 정보는 입력해주어야합니다!!! 👀")
        };



        let addjson = JSON.stringify(input);
        const ageblob = new Blob([addjson], { type: "application/json" });
        formData.append("userInfo", ageblob);

        const mbtiblob = new Blob([addjson], { type: "application/json" });
        formData.append("userInfo", mbtiblob);

        const introductionblob = new Blob([addjson], { type: "application/json" });
        formData.append("userInfo", introductionblob);

        const areablob = new Blob([addjson], { type: "application/json" });
        formData.append("userInfo", areablob);

        const idealTypeblob = new Blob([addjson], { type: "application/json" });
        formData.append("userInfo", idealTypeblob);

        const jobblob = new Blob([addjson], { type: "application/json" });
        formData.append("userInfo", jobblob);

        const hobbyblob = new Blob([addjson], { type: "application/json" });
        formData.append("userInfo", hobbyblob);

        const drinkblob = new Blob([addjson], { type: "application/json" });
        formData.append("userInfo", drinkblob);

        const petblob = new Blob([addjson], { type: "application/json" });
        formData.append("userInfo", petblob);

        const smokeblob = new Blob([addjson], { type: "application/json" });
        formData.append("userInfo", smokeblob);

        const likeMovieTypeblob = new Blob([addjson], { type: "application/json" });
        formData.append("userInfo", likeMovieTypeblob);


        const data = await axios.post(`${process.env.REACT_APP_HOST}/user/signup`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        localStorage.setItem("Authorization", data.headers.authorization)    //accesstoken
        localStorage.setItem("RefreshToken", data.headers.refreshtoken)   //refreshtoken 
        localStorage.setItem("nickname", data.data.data.nickname)

        console.log(data);

        if (data.data.success) {
            alert('회원가입이 완료되었습니다.');
            handleFinish();
        }
        else {
            window.alert(data.error.message)
        }
        input(initialState);
    };



    //=================     ===========           =========            =========           =========================
    //===============  ====================  ==============  ===================  ======   =========================
    //=================   =================  ==============            =========           =========================
    //====================   ==============  ==============  ===================  ==================================
    //===============      ================  ==============            =========  ==================================

    const steps = [
        {
            label: "기본정보",
            description: `기본정보 입력!`,
            content:
                <div>
                    <StRegisterBox>
                        <form style={{ marginTop: "10px" }} >

                            <ImgBox>

                                {imageUrl !== "" ?
                                    <Avatar
                                        src={imageUrl}
                                        style={{ margin: '7px' }}
                                        size={200}
                                        onClick={() => { inputRef.current.click() }} />
                                    :
                                    <Avatar
                                        src={profileImage}
                                        alt="기본이미지"
                                        style={{ margin: '7px' }}
                                        size={200}
                                        onClick={() => { inputRef.current.click() }}
                                    />
                                }


                                <input
                                    type='file'
                                    id='imageUrl'
                                    style={{ display: 'none' }}
                                    accept='image/jpg,impge/png,image/jpeg'
                                    name='imageUrl'
                                    onChange={(e) => { onUploadImg(e.target.files[0]) }}
                                    ref={inputRef} />
                            </ImgBox>

                            <GenderBox>
                                <StSelect
                                    name='gender'
                                    type="text"
                                    defaultValue="default"
                                    onChange={onChangeHandler}
                                    required>
                                    <MBTIInput value="default" disabled> 성별을 골라주세요</MBTIInput>
                                    <option value="female">여성</option>
                                    <option value="male">남성</option>
                                </StSelect>
                            </GenderBox>



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
                                    value={userinfo.username}
                                    onChange={onChangeHandler}
                                    maxLength="10"
                                />
                                <StLine></StLine>
                            </InputBox>

                            {/*정규표현식 충족 ? 사용가능한 아이디 : 정규표현식 알려주기 */}

                            {userinfo.username &&
                                (regexUsername.test(userinfo.username) ?
                                    (<div style={{ textAlign: "center" }}>
                                        <div style={{ fontSize: "13px", color: "blue", fontWeight: "600" }}>올바른 아이디형식입니다!</div>
                                        <CheckLabel>중복확인을 해주세요!!!🧐</CheckLabel>
                                    </div>)
                                    :
                                    (<div style={{ textAlign: "center" }}>
                                        <StSmallWorning>아이디 형식을 확인하세요</StSmallWorning>
                                        <StsmallLabel>숫자는 선택적으로 영어를 포함하여 4-12글자수로 적어주세요</StsmallLabel>
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
                                    value={userinfo.password}
                                    maxLength="20"
                                />
                                <StLine></StLine>
                            </InputBox>
                            {
                                userinfo.password &&
                                (regexPassword.test(userinfo.password) ?
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
                                    value={userinfo.passwordConfirm}
                                    maxLength="20"
                                />
                                <StLine></StLine>
                            </InputBox>
                            {
                                userinfo.passwordConfirm &&
                                (userinfo.password !== userinfo.passwordConfirm ?
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
                                    value={userinfo.nickname}
                                    maxLength="6"
                                />
                                <StLine></StLine>
                            </InputBox>

                            {/* 정규표현식 충족 ? 사용가능한 아이디 : 정규표현식 알려주기*/}
                            {userinfo.nickname &&
                                (regexNickname.test(userinfo.nickname) ?
                                    (<div style={{ textAlign: "center" }}>
                                        <div style={{ fontSize: "13px", color: "blue", fontWeight: "600" }}>올바른 닉네임형식입니다!</div>
                                        <CheckLabel>자, 이제 중복확인을 해주세요!!!🧐</CheckLabel>
                                    </div>
                                    )
                                    :
                                    (<div style={{ textAlign: "center" }}>
                                        <StSmallWorning>닉네임 형식을 확인하세요</StSmallWorning>
                                        <StsmallLabel>한글과 숫자로만 2-8자리</StsmallLabel>
                                    </div>
                                    ))

                            }


                        </form>

                    </StRegisterBox>
                </div >
        },

        //=================     ===========           =========            =========           =========================
        //===============  ====================  ==============  ===================  ======   =========================
        //=================   =================  ==============            =========           =========================
        //====================   ==============  ==============  ===================  ==================================
        //===============      ================  ==============            =========  ==================================

        {
            label: "추가 정보 입력",
            description:
                "추가 정보입니다. 입력해주세요",
            content:
                <>
                    <SecondMypageBox>
                        <form>
                            <SecondMyinfo>
                                <InfoBodyBox>
                                    <MiniHeader>🌟 필수로 입력해주어야 합니다~🌠</MiniHeader>
                                    <AgeInput
                                        placeholder="당신의 나이는 몇살인가요 ??"
                                        type="number"
                                        name="age"
                                        value={input.age}
                                        className="text"
                                        onChange={addonChangeHandler}
                                    />
                                    <StSelect
                                        name='mbti'
                                        type="text"
                                        defaultValue="default"
                                        onChange={addonChangeHandler}
                                        required>
                                        <MBTIInput value="default" disabled> MBTI를 골라주세요</MBTIInput>
                                        <option value="ISTJ">I S T J</option>
                                        <option value="ISTP">I S T P</option>
                                        <option value="ISFJ">I S F J</option>
                                        <option value="ISFP">I S F P</option>
                                        <option value="INFJ">I N F J</option>
                                        <option value="INFP">I N F P</option>
                                        <option value="INTJ">I N T J</option>
                                        <option value="INTP">I N T P</option>
                                        <option value="ESTP">E S T P</option>
                                        <option value="ESTJ">E S T J</option>
                                        <option value="ESFP">E S F P</option>
                                        <option value="ESFJ">E S F J</option>
                                        <option value="ENFP">E N F P</option>
                                        <option value="ENFJ">E N F J</option>
                                        <option value="ENTP">E N T P</option>
                                        <option value="ENTJ">E N T J</option>

                                    </StSelect>

                                    <Location
                                        placeholder="당신이 사는 지역은 어디인가요 ??"
                                        type="text"
                                        name="area"
                                        value={input.area}
                                        className="text"
                                        onChange={addonChangeHandler}
                                    />

                                    <StBodyInput
                                        placeholder="한줄로 10자 이상 나를 소개해주세요~"
                                        type="text"
                                        name="introduction"
                                        minLength={10}
                                        value={input.introduction}
                                        onChange={addonChangeHandler} />
                                </InfoBodyBox>
                            </SecondMyinfo>

                            <AddMyinfo>
                                <MiniHeader>🌟 필수 입력란은 아닙니다 🌠</MiniHeader>
                                <MiniBox>
                                    <MiniTitle>이상형 🎈</MiniTitle>
                                    <MiniInput
                                        placeholder="이상형을 적어주세요"
                                        type="text"
                                        name="idealType"
                                        value={input.idealType}
                                        onChange={addonChangeHandler}
                                    />
                                </MiniBox>
                                <MiniBox>
                                    <MiniTitle>직업 👄</MiniTitle>
                                    <MiniInput
                                        placeholder="직업 또는 업종을 적어주세요"
                                        type="text"
                                        name="job"
                                        value={input.job}
                                        onChange={addonChangeHandler}
                                    />
                                </MiniBox>
                                <MiniBox>
                                    <MiniTitle>취미 👓</MiniTitle>
                                    <MiniInput
                                        placeholder="좋아하는, 함께 했으면 좋겠는 취미를 적어주세요"
                                        type="text"
                                        name="hobby"
                                        value={input.hobby}
                                        onChange={addonChangeHandler}
                                    />
                                </MiniBox>
                                <MiniBox>
                                    <MiniTitle>반려동물 유무 🐶</MiniTitle>
                                    <MiniInput
                                        placeholder="사랑하는 반려동물이 있다면 자랑해주세요!"
                                        type="text"
                                        name="pet"
                                        value={input.pet}
                                        onChange={addonChangeHandler}
                                    />
                                </MiniBox>
                                <MiniBox>
                                    <MiniTitle>흡연 유무 🚬</MiniTitle>
                                    <MiniInput
                                        placeholder="Yes or No 본인 또는 원하는 상대방의 흡연유무"
                                        type="text"
                                        name="smoke"
                                        value={input.smoke}
                                        onChange={addonChangeHandler}
                                    />
                                </MiniBox>
                                <MiniBox>
                                    <MiniTitle>음주습관 🍻</MiniTitle>
                                    <MiniInput
                                        placeholder="술을 즐기는 편인지 적어주세요"
                                        type="text"
                                        name="drink"
                                        value={input.drink}
                                        onChange={addonChangeHandler}
                                    />
                                </MiniBox>
                                <MiniBox>
                                    <MiniTitle>좋아하는 영화 🎬</MiniTitle>
                                    <MiniInput
                                        placeholder="좋아하는 영화종류를 적어주세요."
                                        type="text"
                                        name="likeMovieType"
                                        value={input.likeMovieType}
                                        onChange={addonChangeHandler}
                                    />
                                </MiniBox>

                            </AddMyinfo>
                        </form>
                    </SecondMypageBox>
                </>
        }
    ];

    // 스타일링
    const useStyles = makeStyles({
        root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
        },
        number: {
            "& .Mui-active .MuiStepIcon-root": { color: "#FE6B8B" },
            "& .Mui-completed .MuiStepIcon-root": { color: "#FF8E53" },
            "& .Mui-disabled .MuiStepIcon-root": { color: "#FF69874c" }
        },

    });

    const classes = useStyles();

    //step 넘기는 함수들
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (userinfo.username.trim() === "" || userinfo.nickname.trim() === "" || userinfo.password.trim() === "" || userinfo.passwordConfirm.trim() === "") {
            return alert("모든 칸을 채워주세요! 👀 ")
        } else if (userinfo.imageUrl.trim === "") {
            return alert("사진을 등록해주세요! 😎")
        };

        if (usernameCheck === false) {
            return alert("아이디 중복확인을 해주세요!!!");
        } else if (nicknameCheck === false) {
            return alert("닉네임 중복확인을 해주세요!!!")
        };


        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };


    const onClickHandler = () => {
        dispatch(__logout());
        dispatch(logout());
        handleBack();
    };


    const onChangeReset = () => {
        setImageUrl('');
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    };

    const onClickResetHandler = () => {
        dispatch(__logout());
        dispatch(logout());
        handleReset();
    };


    const handleReset = () => {
        setActiveStep(0);
    };

    const handleFinish = () => {
        alert("바로 로그인 되었습니다!!!")
        navigate('/');
    }

    const navigate = useNavigate();



    return (
        <>

            <StHeader>
                <StHeaderTitle> On Purple </StHeaderTitle>
                <StHeaderBody>나만의 특별한 보랏빛 라이트를 켜줘</StHeaderBody>
            </StHeader>

            <Box sx={{ maxWidth: 400, marginTop: 10 }}>
                <Stepper className={classes.number} activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (

                        <Step className={classes.title} key={step.label}>

                            <StepLabel
                                optional={
                                    index === 1 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>

                            <StepContent>
                                <Description>{step.description}</Description>
                                <Description>{step.content}</Description>

                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        {index === 0 ?
                                            <Button
                                                className={classes.root}
                                                variant="contained"
                                                onClick={() => { handleNext(); }}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                "Continue"
                                            </Button>
                                            : index === 1 ?
                                                <Button
                                                    className={classes.root}
                                                    variant="contained"
                                                    onClick={() => { addaddHandler(); }}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >끝</Button> : null}


                                        {index === 0 ?
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                            : index === 1 ?
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={() => { onClickHandler(); onChangeReset(); }}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </Button> : null}
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>


                {/* 마지막 회원가입 완료 스텝 */}
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>이제, 모든 준비를 마쳤습니다!!! </Typography>


                        <Button onClick={handleFinish}>완료!</Button>


                        <Button onClick={onClickResetHandler} sx={{ mt: 1, mr: 1 }}>
                            다시 작성하기
                        </Button>

                    </Paper>
                )}
            </Box>
        </>
    );
}


//------------------------------스타일링----------------------------
const StHeader = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  ::after { 
    width: 100vw;
    height: 250px;
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

const Description = styled.div`
    font-size: 14px;   
`

///회원가입 스타일

//전체 박스 
const StRegisterBox = styled.div`
    margin-bottom: 30px;
    width: 300px;
    height: auto;
    padding-bottom: 10%;
    margin: auto;
    background-color: white;
`;

//이미지 박스 
const ImgBox = styled.div`
  display  : flex ;
  justify-content: center;
  width: 300px;
`;

//이미지 input
const Avatar = styled.img`
    width: 200px;
    height: 200px;
    background-size: cover;
    cursor: pointer;
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


//------------------------------------------------------------------------------------------------------------------------
//두번째 추가정보 입력란=====================================================================================================
//------------------------------------------------------------------------------------------------------------------------
//기본 인포 바디 
const InfoBodyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
`

//큰틀
const SecondMypageBox = styled.div`
    width:300px;
    height: auto;
    padding-bottom: 2%;
    margin-top: 15px;
    margin-bottom: 35px;
    /* border: 3px solid #fdc2f0; */
    border-radius: 15px;
    background-color: white;
    display: flex;
    flex-direction: column;
`

//작틀
const SecondMyinfo = styled.div`
    width: 300px;
    display: flex;
    margin-left: 10px;
`

//나이 인풋창
const AgeInput = styled.input`
  margin  : auto ;
  margin-top: 10px;
  height: 35px;
  width: 300px;
  font-size: 14px;
  word-break: keep-all;
  border: none;
  border-bottom:2px solid #80036f;
  &:focus {
      outline: none;
      border-bottom: 2px solid #80036f;
    }
    text-align: center;
`

//엠비티아이 드롭다운옵션
const MBTIInput = styled.option`
  display: flex;
  
`
//엠비티아이 옵션 헤드
const StSelect = styled.select`
  color: #797979;
  width:300px;
  height: 30px;
  border: none;
  border-bottom:2px solid #80036f;
  padding-left: 5px;
  display: flex;
  margin  : auto ;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 14px;
  &:focus {
      outline: none;
      border-bottom: 2px solid #80036f;
    }

`

//지역인풋값
const Location = styled.input`
  margin  : auto ;
  margin-bottom: 20px;
  height: 35px;
  width: 300px;
  font-size: 14px;
  word-break: keep-all;
  border: none;
  border-bottom:2px solid #80036f;

  &:focus {
      outline: none;
      border-bottom: 2px solid #80036f;
    }
    text-align: center;
`


//한줄소개 인풋창
const StBodyInput = styled.textarea`
  margin-top: 1%;
  border: 2px solid #80036f;
  /* border-radius: 5px; */
  font-size: 14px; 
  padding:1%;
  width: 300px;
  height: 80px;
  word-break: keep-all;
  margin: auto;
  :hover{
    border: 2px solid #f797f7;
  }
  &:focus {
      outline: none;
      border: 2px solid #80036f;
    }
`

//완료버튼창 박스
const StBtbBox = styled.div`
  height: 50px;
  margin-top: 15px;
  display: flex;
  justify-content:center;
  width : 300px;
  margin-left: 10px;
`

//수정 완료버튼창
const StButton = styled.button`
  cursor: pointer;
  height: 40px;
  width: 300px;
  font-size: 16px;
  border: 2px solid purple;
  font-weight: 600;
  background-color: white;
  :hover{
    color : #f56589;
    background-color: #ffffae;
    border : none;
  }
`

//------------------------------------------------------------------------------------------------------------------------
//두번째 추가정보 입력란=====================================================================================================
//------------------------------------------------------------------------------------------------------------------------


//마이페이지 추가 정보란 제일큰박스
const AddMyinfo = styled.div`
  width: 400px;
  height: auto;
`

//마이페이지 추가 정보란 낱개박스
const MiniBox = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;

`
//마이페이지 낱개 박스 타이틀
const MiniTitle = styled.div`
  margin-top: 1.3%;
  width: 130px;
  height: 1.5em;
  text-align: center;
  background-color: #bebaba;
  border-radius: 5px;
  font-size: 14px;

`

//마이페이지 낱개 박스 인풋
const MiniInput = styled.input`
  margin: 1%;
  text-align: center;
  width: 300px;
  margin-left: 2vw;
  height: 1.5em;
  border-radius: 5px;
  border: 2px solid gray;
  font-size: 14px;
  
`

//마이페이지 추가정보란 헤더
const MiniHeader = styled.div`
  /* border : 2px solid gray; */
  border-radius: 5px;
  padding: 1%;
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;
    font-weight: bolder;
  color: purple;
  width: 400px;
  margin-top: 10px;

`

//성별 버튼 박스
const GenderBox = styled.div`
  display: flex;
  justify-content: center;
`
