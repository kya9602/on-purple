import React, { useState } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";
import Card from "./Card";

import "./Deck.css";



//db
const objs = [
  {
    pics: [
      "http://img.tf.co.kr/article/home/2022/02/23/202273711645596568.jpg"
    ],
    name: "이은지",
    age: 29,
    /* distance: "서울",
    text: "짧은소개" */
  },
  {
    pics: [
      "https://v-phinf.pstatic.net/20220621_231/1655788898269qilbT_JPEG/cropped_band_crop_2022-06-21_0219470.jpg?type=w1000"
  ],
    name: "미미",
    age: 22,
    /* distance: "인천",
    text:
      "짧은소개" */
  },
  {
    pics: [
      "https://mblogthumb-phinf.pstatic.net/MjAyMDEyMjBfNDAg/MDAxNjA4NDM4NjQwMjIz.SEOPy-YwMlzPf1O4fN948vSu9O-0CQ2hnS8x_VnCXcIg.CS19Satxf_Rg6Zuv4gju0FGzfo3r2r_X4tVXO28e25Yg.JPEG.cwmylee/IMG_5218.JPG?type=w800"
  ],
    name: "이영지",
    age: 21,
    /* distance: "대전",
    text: "짧은소개" */
  },
  {
    pics: [    
      "https://images.chosun.com/resizer/LBHLdv9vB0M4sCv7V03liNNTqdc=/464x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/EYJJLS4XTNCBU3S6BP3STTVXFY.jpg"
  ],
    name: "안유진",
    age: 20,
    /* distance: "원주",
    text:
      "짧은소개" */
  }
];
const cards = [];
for(let i=0;i<objs.length;i++){
  cards.push(i);
}

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

function Deck() {
  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i)
  }));




  
  /* const [lastDirection, setLastDirection] = useState('') */
  /* 제스쳐를 이용한 */
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

        
        if(x>600){          
          console.log(objs[i].name)
          console.log('좋아요')
        }if(x<-600){
          console.log(objs[i].name)
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
      objs={objs}
      bind={bind}
    />
  ));
}

export default Deck;
