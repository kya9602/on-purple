import React from "react";
import styled from "styled-components";
import delicious from "../../assets/images/delicious.png"
import drink from "../../assets/images/drink.png"
import drive from "../../assets/images/drive.png"
import fashion from "../../assets/images/fashion.png"
import meet from "../../assets/images/meet.png"
import recommend from "../../assets/images/recommend.png"
const Category = ({setCategory, category}) => {
    
    const handelClickRadioBtn = (e) => {
         console.log(e.target.value)
         setCategory(e.target.value)
    }
    
    return(
        <CategoryContainer style={{gap:"15px"}}>
{/* 맛집추천 */}        
        <StField>
            <StInput 
                type="radio"
                onChange={handelClickRadioBtn}
                value="taste"
                id="taste"
                checked={ category === "taste" }
            />
            
        <StLabel htmlFor="taste"> 
            <StImg src={delicious} alt="" id="taste"/> 
            맛집추천
        </StLabel>
        </StField>

{/* 데이트코스  */}
        <StField>
            <StInput 
                type="radio"
                onChange={handelClickRadioBtn}
                value="dateCourse"
                id="date"
                checked={ category === "dateCourse" }
            />
            
        <StLabel  htmlFor="date"> 
            <StImg src={recommend} alt="" id="date"/> 
            데이트 코스 추천 
        </StLabel>
        </StField>

{/* 만남 */}
        <StField>
            <StInput 
                type="radio"
                onChange={handelClickRadioBtn}
                value="meet"
                id="meet"
                checked={ category === "meet" }
            />
            
        <StLabel htmlFor="meet"> 
            <StImg src={meet} alt="" id="meet"/> 
            번개만남 
        </StLabel>
        </StField>

{/* 한잔 */}
        <StField>
            <StInput 
                type="radio"
                onChange={handelClickRadioBtn}
                value="bar"
                id="drink"
                checked={ category === "bar" }
            />
            
        <StLabel htmlFor="drink"> 
            <StImg src={drink} alt="" id="drink"/> 
            한잔하실분?
        </StLabel>        
        </StField>

{/* 드라이브 */}    
        <StField>
            <StInput 
                type="radio"
                onChange={handelClickRadioBtn}
                value="drive"
                id="drive"
                checked={ category === "drive" }
            />
            
        <StLabel htmlFor="drive"> 
            <StImg src={drive} alt="" id="drive"/> 
            드라이브 가실 분! 
        </StLabel>    
        </StField>

{/* 패션 */}
        <StField>
            <StInput 
                type="radio"
                onChange={handelClickRadioBtn}
                value="fashion"
                id="fashion"
                checked={ category === "fashion" }
            />
            
        <StLabel htmlFor="fashion"> 
            <StImg src={fashion} alt="" id="fashion"/> 
            패션 
        </StLabel>
        </StField>

        </CategoryContainer>
    )
}

export default Category;

const CategoryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 400px;
`
const StLabel = styled.label`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap:8px;
    margin-left: 10px;
`

const StInput = styled.input`
    display: inline-block;
    visibility: hidden;
    &:checked {
        display: inline-block;
        background: none;
        padding: 0px 10px;
        text-align: center;
        height: 35px;
        line-height: 33px;
        display: none;
    }
    &:checked + ${StLabel} {
        background: white;
        border: 0.2em solid orange;
        border-radius: 15px;
        padding: 3px;
        color: #e4794d;
    }
    display: none;
`

const StImg = styled.img` 
    width: 60px;
    margin: auto;
`


const StField = styled.fieldset`
    border: none;
    border-radius: 10px;
`
