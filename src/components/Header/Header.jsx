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
import purple from "../../assets/images/제목으로.png"

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
 

  // 관리자 확인용 
  const admin = user?.role



  useEffect(() => {
    dispatch(__getUser());
  }, [__getUser])

  return (
    <HeaderContainer>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", zIndex: "2" }}>
        {token === null ? <LogoImg><img src={Offlogo} alt="로그인 안된상태" /></LogoImg>
          : <LogoImg><img src={Onlogo} alt="로그인 된상태" /></LogoImg>}
        <Title onClick={() => { navigate('/') }}>
          <img src={purple} alt="로고" />
        </Title>
        <UserSet >
          <DropDownContainer>
            <DropdownBtn onClick={myPageHandler} ref={myPageRef}>
              {token === null ? <img src={profile} alt="프로필" />
                : <img src={userData?.imageUrl} alt="프로필" />}

            </DropdownBtn>
            <Menu isDropped={myPageIsOpen}>
              <Ul>
                {token === null ?
                  //로그인 안했을 때
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
                  //로그인 했을 때 
                  (admin !== "ADMIN" ?
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
                    :
                    <>
                      <Li>
                        <LinkWrapper
                          onClick={() => navigate(`/reportInfo`)}
                        >신고목록 확인하기</LinkWrapper>
                      </Li>

                      <Li>
                        <LinkWrapper onClick={onClickHandler}>
                          관리자 로그아웃
                        </LinkWrapper>
                      </Li>
                    </>
                  )}
              </Ul>
            </Menu>
          </DropDownContainer>
        </UserSet>
      </div>

    </HeaderContainer>
  )
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  z-index: 3;
  top: 0px;
  /* background-color: gray; */
  max-width: 428px;
  width: 100%;
  height: 70px;
  margin: 0 auto;
  justify-content: space-between;
  ::after { 
    width: 100%;
    height: 70px;
    content: "";
    background: url(${logo});
    position: absolute;
    top: 0;
    left: 0;
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
  cursor: pointer; 
  text-align: center;
  flex:1; 
  margin:3px auto 3px auto ; 
  img{ 
    width: 120px;
    height: 100%; }
`
const UserSet = styled.div`
    display: flex;
    margin-top: 8px;
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
