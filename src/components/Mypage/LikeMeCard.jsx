import React, { forwardRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const LikeMeCard = forwardRef((props, ref) => {
    const navigate = useNavigate();
    // key=1 post=json{}, props에 들어가잇음

    return (
        <div>
            <StContainer>
                <StBox ref={ref} onClick={() => {
                    //프로필 누르면 그사람 상세페이지로가게끔해야함.
                    navigate(`/detail/`);
                }}>

                    {props.likeMeCard.imageUrl && (
                        <img
                            src={props.likeMeCard.imageUrl}
                            alt="preview-img"
                            width="70%"
                            height="60%"
                            style={{
                                border: "2px solid white",
                                borderRadius: "10px",
                                backgroundColor: "whitesmoke",
                                padding: "20px"
                            }}
                        />
                    )}
                </StBox>
            </StContainer>
        </div >
    );
});

export default LikeMeCard;



const StContainer = styled.div`
    padding: 10px;
    display: flex;
`;

const StBox = styled.div`
    margin: auto;
    margin-left: 50px;
    background-color: #8adafd;
    border-radius: 10px;
    padding : 5px;
    width: 300px;
    height:400px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;

`;