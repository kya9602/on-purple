
import { animated, interpolate } from "react-spring/hooks";



function Card({ i, x, y, rot, scale, trans, bind, objs, }){
    
    const { name, age, distance, text, pics } = objs[i];
     
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

            {pics.map(pic => (
                  <div 
                  key={pic}
                  className="Cardimage" 
                  style={{ backgroundImage: `url(${pic})` }}></div>
                      ))}

            <h2>{name},</h2>
            <h2>{age}</h2>
            <h4>{distance}</h4>
            <h4>{text}</h4>
          </div>
        </animated.div>
      </animated.div>
      </div>
    );
  
}

export default Card;

