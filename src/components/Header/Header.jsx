import React from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __logout, logout } from "../../redux/modules/user";
import useDetectClose from "./useDetectClose";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);


  //로그아웃
  const onClickHandler = () => {
    dispatch(__logout());
    dispatch(logout());
    window.alert("로그아웃 되었습니다");
    navigate('/list');
  };

  const token = localStorage.getItem('RefreshToken')


  return (
    <HeaderContainer>

      <LogoImg>로고이미지</LogoImg>
      <Title>타이틀</Title>
      <UserSet>
        <UserInfo>@@@님안녕하세요</UserInfo>

        <DropDownContainer>
          <DropdownBtn onClick={myPageHandler} ref={myPageRef}> 이미지</DropdownBtn>
          <Menu isDropped={myPageIsOpen}>
            <Ul>
              <Li>
                <LinkWrapper
                  onClick={() => navigate("/mypage")}
                >마이페이지 가기</LinkWrapper>
              </Li>
              <Li>
                <LinkWrapper
                  onClick={() => navigate("/mypage")}
                >메뉴1</LinkWrapper>
              </Li>
              <Li>
                <LinkWrapper
                  onClick={() => navigate("/mypage")}
                >메뉴1</LinkWrapper>
              </Li>

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
  background-color: gray;
  width: 100%;
  height: 70px;
`
const LogoImg = styled.div`
  flex:1;
  margin-top: 20px;
`

const Title = styled.div`
  flex:1;
  margin-top: 20px
`
const UserSet = styled.div`
    display: flex;
    margin-top: 8px;
`

const UserInfo = styled.div`
  margin-left: auto;
  margin-top: 12px
`

//-----------------------드롭다운------------------------------

const DropDownContainer = styled.div`
  position: relative;
  text-align: center;
`;

//프로필이미지 들어가야할 버튼
const DropdownBtn = styled.div`
  cursor: pointer;
  background-color: red;
  width: 50px;
  height: 50px; 
  border-radius: 70%;
  overflow: hidden;
  margin-right: 15px;
  margin-left: 15px;
  `;

const Menu = styled.div`
  background: gray;
  position: absolute;
  top: 52px;
  left: 50%;
  width: 100px;
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
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: gray;
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
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.li``;

const LinkWrapper = styled.div`
  font-size: 16px;
  text-decoration: none;
  color: white;
  cursor: pointer;
`;
