import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSprings } from 'react-spring'
import { useGesture } from "react-use-gesture";
import { __getMain, __postLike, __postUnLike } from "../../redux/modules/main";
import { __getLikeme } from "../../redux/modules/likeme";
import Card from "./Card";
import styled from "styled-components";

function Deck() {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  /* 모든DB */
  const { data, isLoading, error } = useSelector((state) => state.main)
  // console.log('모든 DB', data)

  /* 내 닉네임 */
  const Nickname = localStorage.getItem("nickname")
  /* console.log('mynickname', Nickname) */

  /* 모든 DB에서 내 요소 제거 */
  let filterMyData = data.filter(function (data) {
    return data.nickname !== Nickname;
  });
  // console.log('나를 제외한 DB', filterMyData);


  //내가 좋아요한 사람 가져오기
  const likeme = useSelector((state) => state.likeme)
  // console.log(likeme.likeme.data)

  const likemeList = likeme?.likeme
  // console.log('제외되야하는', likemeList)

  useEffect(() => {
    dispatch(__getLikeme());
  }, [])


  //모든 DB에서 내가 좋아요한 사람 제거
  let finalMyData = filterMyData.filter(person => {
    let flag = true;
    likemeList?.forEach(i => {
      if (i.userId === person.userId) {
        flag = false;
      }
    })
    return flag;
  });
  // console.log('제외할 거 다한', finalMyData)

  /* 보여줄 카드 갯수. */
  const cards = [];
  for (let i = 0; i < finalMyData.length; i++) {
    cards.push(i);
  }
  //console.log('data',filterMyData)

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
          console.log('userId', finalMyData[i].userId, '좋아요')
          dispatch(__postLike(finalMyData[i].userId));

          /* unlike left swipe(회원 싫어요) */
        } if (x < -600) {
          console.log('userId', finalMyData[i].userId, '싫어요')
          dispatch(__postUnLike(finalMyData[i].userId));

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
  if (isLoading) return <IsLoading>😴로딩중이에요..😴</IsLoading>
  if (error) {
    return <>{error.message}</>
  }

  if (Nickname === null) {
    navigate('/guide')
  }









  return props.map(({ x, y, rot, scale, props }, i) => (

    <Card
      key={i}
      props={props}
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      cards={cards}
      objs={finalMyData}
      bind={bind}
    /* imageUrlArry={imageUrlArry} */
    />

  ));
}

export default Deck;

const IsLoading = styled.div`
    display: flex;
    justify-content: center;
`