import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSprings } from 'react-spring'
import { useGesture } from "react-use-gesture";
import { __getMain, __postLike, __postUnLike } from "../../redux/modules/main";
import { __getUser } from "../../redux/modules/signup";
import GuideCard from "./GuideCard";

import styled from "styled-components";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #ABA1B0',
  boxShadow: 24,
  p: 4,
};

function GuideDeck() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  /* 모든DB */
  const { data, isLoading, error } = useSelector((state) => state.main)
  
  const filterData = data.slice(0,5)

  /* 보여줄 카드 갯수. */
  const cards = [];
  for (let i = 0; i < filterData.length; i++) {
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
  const [props, set] = useSprings(cards.length, i => ({
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
        
        /* like rigth swipe(회원 좋아요) */
        if (x > 600) {
          handleOpen()
        /* unlike left swipe(회원 싫어요) */
        } if (x < -600) {
          handleOpen()
        } /* if(x===0){
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
  if (isLoading) return <IsLoading>😴로딩중이에요..😴</IsLoading>
  if (error) {
    return <>{error.message}</>
  }

  if(open){
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
              <h2>새로운 사람을 만나러 가 볼까요?</h2>
              <div>
                <ModalButton1 onClick={() => {navigate(`/signup`);}}>회원 가입 하러 가기</ModalButton1>
                <ModalButton2 onClick={() => {setOpen(false)}}>닫기</ModalButton2>
              </div>
            </BoxContainer>
          </Box>
          
          
        </Modal>
      </div>
    );
  }

  return props.map(({ x, y, rot, scale, props }, i) => (
    <GuideCard
      key={i}
      props={props}
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      cards={cards}
      objs={filterData}
      bind={bind}
    /* imageUrlArry={imageUrlArry} */
    />
  
  ));


}

export default GuideDeck;

const IsLoading = styled.div`
    display: flex;
    justify-content: center;
`
const BoxContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`
const ModalButton1 = styled.button`
    margin-right: 10px;
    border: 2px solid #9966CC;
    border-radius: 12px;
    color:white;
    background-color: #9966CC;
    font-weight: 600;
    font-size: 15px;
    height: 40px;
    width: 150px;
    text-align: center;
    cursor: pointer;
`

const ModalButton2 = styled.button`
    margin-left: 10px;
    border: 2px solid #9966CC;
    border-radius: 12px;
    color:white;
    background-color: #9966CC;
    font-weight: 600;
    font-size: 15px;
    height: 40px;
    width: 150px;
    text-align: center;
    cursor: pointer;
`