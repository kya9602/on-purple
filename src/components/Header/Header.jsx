import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { __logout, logout } from "../../redux/modules/user";
import useDetectClose from "./useDetectClose";
import { __getUser } from "../../redux/modules/signup";
import profile from "../../assets/images/profile.jpg";
import logo from "../../assets/images/perple.jpg";
import Onlogo from "../../assets/images/On 소문자.svg";
import Offlogo from "../../assets/images/Off 소문자.svg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);

  //로그아웃
  const onClickHandler = () => {
    dispatch(__logout());
    dispatch(logout());
    window.alert("로그아웃 되었습니다");
    navigate('/');
  };

  const token = localStorage.getItem('RefreshToken')

  //object-fit : cover 이미지 설정시 사용해보기


  const { user, isLoding, error } = useSelector((state) => state.user);


  const userData = user;



  // console.log(userData)

  useEffect(() => {
    dispatch(__getUser());
  }, [__getUser])

  return (
    <HeaderContainer>
      {token === null ? <LogoImg><img src={Offlogo} alt="로그인 안된상태" /></LogoImg>
        : <LogoImg><img src={Onlogo} alt="로그인 된상태" /></LogoImg>}
      <Title onClick={() => {navigate('/')}}>Purple</Title>
      <UserSet >



        <DropDownContainer>
          <DropdownBtn onClick={myPageHandler} ref={myPageRef}>
            {token === null ? <img src={profile} alt="프로필" />
              : <img src={userData?.imageUrl} alt="프로필" />}

          </DropdownBtn>
          <Menu isDropped={myPageIsOpen}>
            <Ul>
              {token === null ?
                <>
                  <Li>
                    <LinkWrapper onClick={() => navigate('/login')}>
                      로그인
                    </LinkWrapper>
                  </Li>
                  <Li>
                    <LinkWrapper onClick={() => navigate('/signup')}>
                      회원가입
                    </LinkWrapper>
                  </Li>
                </>

                :
                <>
                  <Li>
                    <LinkWrapper
                      onClick={() => navigate(`/mypage/${user?.userId}`)}
                    >마이페이지 가기</LinkWrapper>
                  </Li>
                  <Li>
                    <LinkWrapper onClick={() => navigate('/post')}>
                      글쓰기
                    </LinkWrapper>
                  </Li>
                  <Li>
                    <LinkWrapper onClick={onClickHandler}>
                      로그아웃
                    </LinkWrapper>
                  </Li>
                </>
              }
            </Ul>
          </Menu>
        </DropDownContainer>


      </UserSet>


    </HeaderContainer>
  )
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0px;
  /* background-color: gray; */
  width: 100%;
  height: 70px;
  ::after { 
    width: 100vw;
    height: 70px;
    content: "";
    background: url(${logo});
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    /* opacity: 0.8; */
    /* filter: invert(10%); */
    /* filter: brightness(120%); */
    background-size: cover;}
`
const LogoImg = styled.div`
  box-shadow: 5px 5px 10px;
  margin-left: 10px;
  margin-top: 8px;
  height: 55px;
  filter: invert(91%) sepia(12%) saturate(205%) hue-rotate(248deg) brightness(103%) contrast(94%);
`

const Title = styled.div`
  flex:1;
  font-size: 25px;
  font-weight: 600;
  margin-top: 20px;
  background: #f7e9f5;
  background: -webkit-linear-gradient(left, #420255, #f7e9f5);
  background:    -moz-linear-gradient(right, #420255, #f7e9f5);
  background:      -o-linear-gradient(right, #420255, #f7e9f5);
  background:         linear-gradient(to right, #420255, #f7e9f5);
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  text-align: center;
`
const UserSet = styled.div`
    display: flex;
    margin-top: 8px;
`

const UserInfo = styled.div`
  /* margin-left: auto; */
  margin-top: 15px;
  text-align: center;
`

//-----------------------드롭다운------------------------------

const DropDownContainer = styled.div`
  position: relative;
  text-align: center;
  width: 100px;
`;

//프로필이미지 들어가야할 버튼
const DropdownBtn = styled.div`
  cursor: pointer;
  background-color: purple;
  width: 50px;
  height: 50px; 
  border-radius: 70%;
  overflow: hidden;
  margin-right: 10px;
  margin-left: 20px;
  img{
    height: 100%;
    width: 100%;
    border-radius: 70%;
  };
  `;

//메뉴박스
const Menu = styled.div`
/* border: 2px solid black; */
  background-color:white;
  margin-top: 13px;
  top: 52px;
  left: 50%;
  width: 160px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -6px;
    left: 75%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    /* border-bottom-color: #ffb6e3; */
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;


const Ul = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.li``;


//드롭다운  메뉴
const LinkWrapper = styled.div`
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;
  background: linear-gradient(40deg, #f5a2f5, #ffba3a);
  color:white;
  font-weight: bolder;
  width: 120px;
`;
