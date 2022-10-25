
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { animated, interpolate } from "react-spring";
import { __getMypage } from "../../redux/modules/mypage";
import { __getUser } from "../../redux/modules/signup";



function Card({ i, x, y, rot, scale, trans, bind, objs }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

    /* 내 성별 */
    const { user } = useSelector((state) => state.user);
    const myGender = user?.gender;
    useEffect(() => {
      dispatch(__getUser());
    }, [__getUser])
    
  const { nickname, age, area, introduction, imageUrl, userId, gender } = objs[i];

  return (

    <CardContainerDiv>
      {
        objs.map((person) => {
          /* 내가 남자일때 */
          if (myGender === 'male')
            if (gender === 'female') {
              return (
                <animated.div
                  key={person.nickname}
                  className="Container"
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
                      <h2 style={{ marginLeft: "10px" }}>{nickname},</h2>
                      <h2>{age}</h2>


                      <button className="Btn" onClick={() => { navigate(`/profileInfo/${userId}`); }}>더 알아보기 </button>


                      <h4>{area}</h4>
                      <h4>{introduction}</h4>
                    </div>
                  </animated.div>
                </animated.div>
              )
            }

          /* 내가 여자일때 */
          if (myGender === 'female') {
            if (gender === 'male') {
              return (
                <animated.div
                  key={person.nickname}
                  className="Container"
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
                      <h2 style={{ marginLeft: "10px" }}>{nickname},</h2>
                      <h2>{age}</h2>


                      <button className="Btn" onClick={() => { navigate(`/profileInfo/${userId}`); }}>더 알아보기 </button>


                      <h4>{area}</h4>
                      <h4>{introduction}</h4>
                    </div>
                  </animated.div>
                </animated.div>
              )
            }
          }


        })
      }
      {/* <animated.div
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
            <h2 style={{ marginLeft: "10px" }}>{nickname},</h2>
            <h2>{age}</h2>


            <button className="Btn" onClick={() => { navigate(`/profileInfo/${userId}`); }}>더 알아보기 </button>


            <h4>{area}</h4>
            <h4>{introduction}</h4>
          </div>
        </animated.div>
      </animated.div> */}
    </CardContainerDiv>
  );

}

export default Card;


const CardContainerDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;

.Btn{
  cursor: pointer;
  border: none;
  height: 30px;
  color: white;
  font-size: 12px;
  background-color: #BAA2D6;
  border : 1px solid #BAA2D6;
  border-radius: 5px;
}


.Container {
  margin-top: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  position: absolute;
  will-change: transform;
  
  
}

.CardContainer {
  
  
  background-color: white;
  background-size: auto 85%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 45vh;
  max-width: 300px;
  height: 85vh;
  max-height: 450px;
  will-change: transform;
  border-radius: 10px;
  box-shadow: 0 1px 21px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3);

}

.card {
  height: 500px !important;
  
}

.Cardimage {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  max-height: 570px;
  height: 330px;
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
  margin-left: 10px;
  color: gray;
}
h4:last-of-type {
  color: gray;
}

.card > div {
  height: 380px !important;
}
`