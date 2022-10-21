import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styled from "styled-components";

import Guide1 from "../../assets/images/Guide1.jpg"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const GuideModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <BoxContainer>
            <BoxImg src={Guide1} alt=""/>
            <SignupButton onClick={() => {setOpen(false)}}>경험 해보기</SignupButton>
          </BoxContainer>
        </Box>
        
        
      </Modal>
    </div>
  );
}

export default GuideModal;

const BoxContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const BoxImg = styled.img`
  max-width: 400px;
  max-height: 700px;
`

const SignupButton = styled.button`
    border: 2px solid #6e96ee;
    color:white;
    background-color: #4097df;
    font-weight: 600;
    font-size: 15px;
    height: 40px;
    width: 300px;
    text-align: center;
    cursor: pointer;
`