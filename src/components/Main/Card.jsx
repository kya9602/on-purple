
import styled from "@emotion/styled";
import { animated, interpolate } from "react-spring";



function Card({ i, x, y, rot, scale, trans, bind, objs, props,  }){
  
  
    const { nickname, age, area, introduction, imageUrl } = objs[i];
     
    return (
      <CardContainer>
      <animated.div 
        className="Container"
        key={i}        
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          )
        }}
      
      >
        <animated.div
        className="Container"
          {...bind(i)}
          style={{
            transform: interpolate([rot, scale], trans)
          }}
        >
          <div className="CardContainer">        

                  <div                   
                  className="Cardimage" 
                  style={{ backgroundImage: `url(${imageUrl})` }}></div>                      

            <h2>{nickname},</h2>
            <h2>{age}</h2>
            <h4>{area}</h4>
            <h4>{introduction}</h4>
          </div>
        </animated.div>
      </animated.div>
      </CardContainer>
    );
  
}

export default Card;


const CardContainer = styled.div`



margin-top: 80px;

.Container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
}

.CardContainer {
  margin-bottom: 80px;
  padding: 5px;
  background-color: white;
  background-size: auto 85%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 45vh;
  max-width: 300px;
  height: 550px;
  max-height: 570px;
  will-change: transform;
  border-radius: 10px;
  box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4),
  0 10px 10px -10px rgba(50, 50, 73, 0.3);
  
}

.card {
  height: 500px !important;
  
}

.Cardimage {
  background-position: center center;
  background-size: 100%;
  background-repeat: no-repeat;
  max-height: 570px;
  height: 380px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  
}


h2 {
  display: inline-block;
  margin-right: 10px;
}

h2:nth-of-type(2) {
  opacity: 0.7;
  font-size: 1.35rem;
}

h4 {
  margin-top: -15px;
  margin-left: 2px;
  color: gray;
}
h4:last-of-type {
  color: gray;
}

.card > div {
  height: 380px !important;
}

.slider-control-bottomcenter {
  bottom: -15px !important;
}

.slider-control-bottomcenter > ul > li > button {
  color: salmon !important;
}
`