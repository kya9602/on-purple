import React from "react";
import styled from "styled-components";
const Gender = ({ setGender, gender }) => {

    const handelClickRadioBtn = (e) => {
        //console.log(e.target.value)
        setGender(e.target.value)
    }

    return (
        <CategoryContainer style={{ gap: "15px" }}>

            <StField>
                <StInput
                    type="radio"
                    onChange={handelClickRadioBtn}
                    value="female"
                    id="female"
                    checked={gender === "female"}
                />

                <StFemaleLabel htmlFor="female">
                    여
                </StFemaleLabel>
            </StField>

            <StField>
                <StInput
                    type="radio"
                    onChange={handelClickRadioBtn}
                    value="male"
                    id="male"
                    checked={gender === "male"}
                />

                <StMaleLabel htmlFor="male">
                    남
                </StMaleLabel>
            </StField>



        </CategoryContainer>
    )
}

export default Gender;

const CategoryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 400px;
    justify-content: center;
`
const StFemaleLabel = styled.label`
    display: flex;
    justify-content: center;
    padding-top:5px;
    cursor: pointer;
    border: 2px solid pink;
    background-color: white;
    width: 30px;
    height: 25px;
    
`

const StMaleLabel = styled.label`
    display: flex;
    justify-content: center;
    padding-top:5px;
    cursor: pointer;
    border: 2px solid skyblue;
    background-color: white;
    width: 30px;
    height: 25px;
`


const StInput = styled.input`
    display: inline-block;
    visibility: hidden;
    &:checked {
        display: inline-block;
        background: none;
        /* padding: 0px 10px; */
        text-align: center;
        height: 35px;
        line-height: 33px;
        display: none;
    }
    &:checked + ${StFemaleLabel} {
        background: pink;
        border: 2px solid pink;
    }
    &:checked + ${StMaleLabel} {
        background: skyblue;
        border: 2px solid skyblue;
    }


    display: none;
`




const StField = styled.fieldset`
    border: none;
    border-radius: 10px;
`
