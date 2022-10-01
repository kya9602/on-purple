
import { animated, interpolate } from "react-spring/hooks";



function Card({ i, x, y, rot, scale, trans, bind, objs  }){
    
    const { nickname, age, area, introduction, imageUrl } = objs[i];
     
    return (
      <div>
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
      </div>
    );
  
}

export default Card;

