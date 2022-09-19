import React from "react";
import styled from "styled-components";

const Header = () =>{
    return(
        <HeaderContainer>

            <LogoImg>로고이미지</LogoImg>
            <Title>타이틀</Title>
            <UserSet>
                <UserInfo>@@@님안녕하세요</UserInfo>
                <UserImage
                src="https://img.hankyung.com/photo/202108/BF.27314751.1.jpg"
                ></UserImage>
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
const UserImage = styled.img`
    width: 50px;
    height: 50px; 
    border-radius: 70%;
    overflow: hidden;
    margin-left: 15px;
    justify-content: start;
`

