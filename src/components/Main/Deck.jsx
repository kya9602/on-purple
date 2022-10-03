import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";
import { __getMain } from "../../redux/modules/main?after";
import Card from "./Card?after";


function Deck() {
const dispatch = useDispatch();


 

/* DB */
/* const { data } = useSelector((state)=> state.main) */

const { data, isLoading, error } = useSelector(
  state => ({
    data: state.main,
    isLoading : state.main,
    errorn : state.main
  }),
  shallowEqual,
);

useEffect(() => {
  dispatch(__getMain());
}, [dispatch])



/* 보여줄 카드 갯수. */
const cards = [];
for(let i=0;i<data.data.length;i++){
  cards.push(i);
}

/* 보여줄 카드의 css */
const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  /* rot: -10 + Math.random() * 20, // 회전 임의값 */
  rot:0,
  delay: i * 50
});


/* 로딩 날라오는 */
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(0deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i)
  }));
  

  /* 제스쳐 */
  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;
                

      if (!down && trigger) gone.add(index);

      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;

        
        console.log(index)
        if(x>600){          
          console.log(data.data[i].nickname)
          console.log('좋아요')
        }if(x<-600){
          console.log(data.data[i].nickname)
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
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );  

  

  return props.map(({ x, y, rot, scale }, i) => (
    <Card
      key={i}

      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      cards={cards}
      objs={data.data}
      bind={bind}
      /* imageUrlArry={imageUrlArry} */
    />
  ));
}

export default Deck;
