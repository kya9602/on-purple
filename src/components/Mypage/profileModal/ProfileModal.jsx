import { forwardRef } from "react";
import styled from "styled-components";

const ProfileModal = forwardRef((props, ref) => {
  return (
    <Background>
      <Content>
        <ModalContainer ref={ref}>
          {props.children}
        </ModalContainer>
      </Content>
    </Background>
  );
});

export default ProfileModal;

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
`;

const Content = styled.div`
  height: 120%;
  width: 100%;
  margin-top: 5%;
  position: relative;
  overflow: scroll;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 380px;
  background-color: white;
  border: 1px solid whitesmoke;
  border-radius: 12px;
`;