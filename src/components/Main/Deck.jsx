import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSprings } from 'react-spring'
import { useGesture } from "react-use-gesture";
import { __getMain } from "../../redux/modules/main";
import Card from "./Card";

//모달창
import { useCookies } from "react-cookie";
import Modal from "./Modal";
import { __getUser } from "../../redux/modules/signup";
import logo from "../../assets/images/perple.jpg";
import styled from "styled-components";
import moment from "moment";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";




const Deck = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //모달창
  /// 모달창안에 추가입력 함수들


  const [input, setInput] = useState({
    age: "",
    mbti: "",
    introduction: "",

    idealType: "",
    job: "",
    hobby: "",
    drink: "",
    pet: "",
    smoke: "",
    likeMovieType: "",
    area: "",
  });

  // {age, mbti, introduction, idealType, job, hobby, drink. pet, smoke, likeMovieType, area},  {RefreshToken, Authorization}




  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value, });
  };
  console.log(input)


  const accessToken = localStorage.getItem("Authorization"); //accesstoken 
  const refreshToken = localStorage.getItem("RefreshToken") //refreshToken



  const { userId } = useParams();
  const { user } = useSelector((state) => state.user);



  const userData = user.data;
  console.log("data is", userData)

  useEffect(() => {
    dispatch(__getUser(userId));
  }, [dispatch])



  // axios
  const addHandler = async () => {

    if (input.age.trim() === "" || input.mbti.trim() === "" || input.introduction.trim() === "" || input.area.trim() === "") {
      return alert("모든 칸을 채워주세요! 👀")
    };

    const { age, mbti, introduction, idealType, job, hobby, drink, pet, smoke, likeMovieType, area } = input;
    const user = {
      age: age,
      mbti: mbti,
      introduction: introduction,
      area: area,

      idealType: idealType,
      job: job,
      hobby: hobby,
      drink: drink,
      pet: pet,
      smoke: smoke,
      likeMovieType: likeMovieType,
    };
    console.log("user is ", user)





    const data = await axios.post(`${process.env.REACT_APP_HOST}/profile`, user, {
      headers: {
        Authorization: `${accessToken}`,
        RefreshToken: `${refreshToken}`,
      }
    }
    )
    setCookie('saebalHideModal', data.data.token);

    console.log(data.data);

    if (data.data.success) {

      alert('모든 정보입력이 완료되었습니다~~');
    }
    else {
      window.alert(data.error.message)
    }


    setInput(input);
  };



  // 1회성 모달창 만들어보기 
  const COOKIE_KEY = 'saebalHideModal'; 	               // 쿠키이름세팅 
  const [cookies, setCookie] = useCookies([COOKIE_KEY]); // 쿠키이름을 초기값으로 넣어 쿠키세팅

  const hideModal = () => {
    const decade = moment(); 	 	// 일단 moment 로 시간변수를 만들어주고
    decade.add(3650, 'd'); 	 	    // 10년뒤로 값을 add 해준다.
    setCookie(COOKIE_KEY, 'true', {	// 쿠키를 셋해준다.
      path: '/',			        // path를 지정해주고
      expires: decade.toDate(),	// 여기서 날짜를 지정해준다
    });
  };




  /* DB */
  const { data, isLoading, error } = useSelector((state) => state.main)
  //console.log(data)

  /* 보여줄 카드 갯수. */
  const cards = [];
  for (let i = 0; i < data.length; i++) {
    cards.push(i);
  }

  /* 
  -to와 from
  just helper, 보간(날라오고 회전하는)되는 값의 데이터
  */
  const to = i => ({
    x: 0,
    /* y: i * -10, */
    y: 0,
    scale: 1,
    /* rot: -10 + Math.random() * 20, // 회전 임의값 */
    rot: 0,
    delay: i * 50
  });
  const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

  /* 회전과 크기를 css로 바꿔 보간한다 */
  const trans = (r, s) =>
    `perspective(1500px) rotateX(0deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;





  /* 카드가 날아가도록 */
  const [gone] = useState(() => new Set());


  /* 스프링 묶음 나중에 이것으로 map을 그림 */
  const [propsmap, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i)
  }));


  /* 제스쳐 방향과 속도 */
  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      /* 세게치면 날아가도록 */
      const trigger = velocity > 0.2;

      /* 좌 우 로 날아가도록 한다 */
      const dir = xDir < 0 ? -1 : 1;

      /* 트리거 속도에 도달하면 카드가 날아갈수 있도록 준비 */
      if (!down && trigger) gone.add(index);

      /* react-spring을 이용한 데이터 변경 */
      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        /* 카드가 사라지면 왼쪽 혹은 오른쪽으로 사라지고 그렇지않으면 제자리(0)로 */
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        /* 카드가 회전하는 정도(세게 치면 빠르게 회전) */
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        /* 스와이프 할 카드가 살짝 떠있어 보이도록 */
        const scale = down ? 1.1 : 1;


        /* 스와이프 한 카드의 닉네임 확인( 나중에 매칭을 위한 기능 ) */
        if (x > 600) {
          console.log(data[i].nickname)
          console.log('좋아요')
        } if (x < -600) {
          console.log(data[i].nickname)
          console.log('싫어요')
        } /* if(x===0){
          console.log(objs[i].name)
        } */

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });
      if (!down && gone.size === cards.length)
        /* 애니메이션 값을 뷰에 입혀 한번만 렌더링 */
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );

  useEffect(() => {
    dispatch(__getMain());
  }, [dispatch])
  if (isLoading) return "😴로딩중이에요..😴"
  if (error) {
    return <>{error.message}</>
  }









  return propsmap.map(({ x, y, rot, scale, propsmap }, i) => (
    <>
      <Card
        key={i}

        props={propsmap}
        i={i}
        x={x}
        y={y}
        rot={rot}
        scale={scale}
        trans={trans}
        cards={cards}
        objs={data}
        bind={bind}
      /* imageUrlArry={imageUrlArry} */
      />


      {cookies[COOKIE_KEY] ? null :
        ( // 쿠키값이 있으면 null (즉, 모달닫기를 눌렀으면,)
          <>
            <Modal ref={props.modalRef}>
              <StHeader>
                <StHeaderTitle> On Purple </StHeaderTitle>
                <StHeaderBody>나만의 특별한 보랏빛 라이트를 켜줘</StHeaderBody>
              </StHeader>
              <SecondMypageBox>
                <form>
                  <SecondMyinfo>
                    <InfoBodyBox>
                      <MiniHeader>🌟 필수로 입력해주세요!  🌠</MiniHeader>

                      <AgeInput
                        placeholder="당신의 나이는 몇살인가요 ??"
                        type="text"
                        name="age"
                        value={input.age}
                        className="text"
                        onChange={onChangeHandler}
                      />
                      <StSelect
                        name='mbti'
                        type="text"
                        defaultValue="default"
                        onChange={onChangeHandler}
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
                        onChange={onChangeHandler}
                      />

                      <StBodyInput
                        placeholder="한줄로 10자 이상 나를 소개해주세요~"
                        type="text"
                        name="introduction"
                        minLength={10}
                        value={input.introduction}
                        onChange={onChangeHandler} />
                    </InfoBodyBox>
                  </SecondMyinfo>



                  {/* {age, mbti, introduction, 
                    idealType, job, hobby, drink. pet, smoke, likeMovieType, area} */}

                  {/* 아래 추가정보란 적는곳  */}
                  <AddMyinfo>
                    <MiniHeader>🌟 필수 입력란은 아닙니다 🌠</MiniHeader>
                    <MiniBox>
                      <MiniTitle>이상형 🎈</MiniTitle>
                      <MiniInput
                        placeholder="이상형을 적어주세요"
                        type="text"
                        name="idealType"
                        value={input.idealType}
                        onChange={onChangeHandler}
                      />
                    </MiniBox>
                    <MiniBox>
                      <MiniTitle>직업 👄</MiniTitle>
                      <MiniInput
                        placeholder="직업 또는 업종을 적어주세요"
                        type="text"
                        name="job"
                        value={input.job}
                        onChange={onChangeHandler}
                      />
                    </MiniBox>
                    <MiniBox>
                      <MiniTitle>취미 👓</MiniTitle>
                      <MiniInput
                        placeholder="좋아하는, 함께 했으면 좋겠는 취미를 적어주세요"
                        type="text"
                        name="hobby"
                        value={input.hobby}
                        onChange={onChangeHandler}
                      />
                    </MiniBox>
                    <MiniBox>
                      <MiniTitle>반려동물 유무 🐶</MiniTitle>
                      <MiniInput
                        placeholder="사랑하는 반려동물이 있다면 자랑해주세요!"
                        type="text"
                        name="pet"
                        value={input.pet}
                        onChange={onChangeHandler}
                      />
                    </MiniBox>
                    <MiniBox>
                      <MiniTitle>흡연 유무 🚬</MiniTitle>
                      <MiniInput
                        placeholder="Yes or No 본인 또는 원하는 상대방의 흡연유무"
                        type="text"
                        name="smoke"
                        value={input.smoke}
                        onChange={onChangeHandler}
                      />
                    </MiniBox>
                    <MiniBox>
                      <MiniTitle>음주습관 🍻</MiniTitle>
                      <MiniInput
                        placeholder="술을 즐기는 편인지 적어주세요"
                        type="text"
                        name="drink"
                        value={input.drink}
                        onChange={onChangeHandler}
                      />
                    </MiniBox>
                    <MiniBox>
                      <MiniTitle>좋아하는 영화 🎬</MiniTitle>
                      <MiniInput
                        placeholder="좋아하는 영화종류를 적어주세요."
                        type="text"
                        name="likeMovieType"
                        value={input.likeMovieType}
                        onChange={onChangeHandler}
                      />
                    </MiniBox>

                  </AddMyinfo>
                </form>
                <StBtbBox>
                  <StButton onClick={() => { addHandler(); hideModal(); console.log("input is", input) }}> 추가 필수정보도 작성완료 😘 👆</StButton>
                </StBtbBox>
              </SecondMypageBox>
            </Modal>
          </>
        )
      }
    </>

  ));
}

export default Deck;


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

//---------------------------------------------------------


//기본 인포 바디 
const InfoBodyBox = styled.div`
display: flex;
flex-direction: column;
`

//큰틀
const SecondMypageBox = styled.div`
  width:500px;
  height: auto;
  padding-bottom: 2%;
  margin-top:80px;
  /* border: 3px solid #fdc2f0; */
  border-radius: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

//작틀
const SecondMyinfo = styled.div`
/* background-color: red; */
  border-bottom-style:solid; 
  border-bottom-color:purple;
  border-bottom-width:5px;
  width: 450px;
  /* margin-left: 25vw; */
  display: flex;
  margin-left:auto;
  margin-right: auto;
  justify-content: center;
  padding-bottom: 5%;
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
  /* @media all and (max-width : 750px) {
  font-size: 12px; 
  width : 200px;
  height: 30px;
} */
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

/* @media all and (max-width : 750px) {
font-size: 14px; 
width : 40vw;
height: 10vw;
} */
&:focus {
    outline: none;
    border-bottom: 2px solid #80036f;
  }
  text-align: center;

  /* @media all and (max-width : 750px) {
  font-size: 12px; 
  width : 150px;
  height: 30px;
} */
`


//한줄소개 인풋창
const StBodyInput = styled.textarea`
margin-top: 1%;
border: 2px solid #80036f;
/* border-radius: 5px; */
font-size: 14px; 
padding:1%;
width: 400px;
height: 80px;
word-break: keep-all;
:hover{
  border: 2px solid #f797f7;
}
&:focus {
    outline: none;
    border: 2px solid #80036f;
  }
/* @media all and (max-width : 750px) {
  font-size: 14px; 
  width : 40vw;
  height: 10vw;
} */
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
/* @media all and (max-width:750px) {
  height: 30px;
} */
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
/* @media all and (max-width : 750px) {
  font-size: 14px; 
  width : 24vw;
  height: 1.5em;
} */
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
/* @media all and (max-width : 750px) {
  font-size: 12px; 
  width : 60vw;
  height: 1.5em;
} */
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
/* margin-bottom: 10px; */
/* @media all and (max-width : 800px) {
  font-size: 16px; 
  width : 100vw;
  height: 30px;
  margin-bottom: 15px;
} */
`