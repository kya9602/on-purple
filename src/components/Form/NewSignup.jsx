import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Newjoin from "./Newjoin";
import NewSignAdd from "./NewSignAdd";
import NewSignUpPlus from "./NewSignupPlus";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/perple.jpg";
import { makeStyles } from '@mui/styles';


const steps = [
    {
        label: "기본정보",
        description: `기본정보 입력!`,
        content: <Newjoin />
    },
    {
        label: "추가 필수정보 입력",
        description:
            "추가 필수 정보입니다. 입력해주세요",
        content: <NewSignAdd />
    },
    {
        label: "추가 정보입력",
        description: `추가정보를 입력하면 매칭될 확률이 높아집니다!`,
        content: <NewSignUpPlus />
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
    }
});



export default function VerticalLinearStepper() {
    //스타일링
    const classes = useStyles();


    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleFinish = () => {
        alert("회원가입이 완료되었습니다~!")
        navigate('/login');
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

                        <Step key={step.label}>

                            <StepLabel
                                optional={
                                    index === 2 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>

                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Typography>{step.content}</Typography>

                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            className={classes.root}
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >

                                            {index === steps.length - 1 ? "Finish" : "Continue"}
                                        </Button>


                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>



                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>


                {/* 마지막 회원가입 완료 스텝 */}
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>회원가입을 완료했습니다!</Typography>


                        <Button onClick={handleFinish}>완료!</Button>


                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
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