import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getMypage } from "../../../redux/modules/mypage";

import styled from "styled-components";
import axios from "axios";
import ProfileModal from "./ProfileModal";



const ProfileEditModal = (props) => {
    const dispatch = useDispatch();


    //마이페이지 처음 기본정보 불러오기
    const mypage = useSelector((state) => state.mypage);
    const { profileId } = useParams();

    //마이페이지 인포 정보
    const userInfo = mypage.mypage.data
    // console.log(userInfo)

    useEffect(() => {
        dispatch(__getMypage(profileId));
    }, [])



    const [imageUrl, setImageUrl] = useState(""); // img input value
    const [formData] = useState(new FormData())

    const inputRef = useRef(null);
    const onUploadImg = (fileBlob) => {
        formData.append('imageUrl', fileBlob);

        for (const keyValue of formData) {
            console.log(keyValue[0] + ", " + keyValue[1])
        };

        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageUrl(reader.result);
                resolve();
            };
        });

    };



    const handleClickUpdatePost = async () => {


        let a = await axios.put(`${process.env.REACT_APP_HOST}/mypage/image`, formData,
            {
                headers: {
                    "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                    "RefreshToken": localStorage.getItem("RefreshToken"),
                    'Content-Type': 'multipart/form-data'
                }
            });
        console.log(a.data);
        if (a.data.success) {
            alert('정보가 수정되었습니다.');
            window.location.reload();
        }


    };




    return (
        <ProfileModal ref={props.modalRef}>
            <Header>이미지를 변경하시겠습니까?</Header>
            <ImgBox >

                {imageUrl !== "" ?
                    <Avatar
                        src={imageUrl}
                        style={{ margin: '20px' }}
                        size={200}
                        onClick={() => { inputRef.current.click() }}
                    />

                    :

                    <Avatar
                        src={userInfo.imageUrl}
                        alt="기본이미지"
                        style={{ margin: '20px' }}
                        size={200}
                        onClick={() => { inputRef.current.click() }}
                    />
                }
                <input
                    type='file'
                    id='imageUrl'
                    style={{ display: 'none' }}
                    accept='image/jpg,impge/png,image/jpeg'
                    name='imageUrl'
                    onChange={(e) => { onUploadImg(e.target.files[0]) }}
                    ref={inputRef} />
            </ImgBox>


            <div>이미지를 눌러 파일을 선택해주세요!</div>


            <ButtonWrapper>
                <Btn onClick={handleClickUpdatePost}>수정하기</Btn>
            </ButtonWrapper>
        </ProfileModal>
    );
};


export default ProfileEditModal;

const Header = styled.div`
    margin-top: 65px;
    margin-bottom: 10px;
    font-size : 25px;
    font-weight: 600;
`


const ButtonWrapper = styled.div`
  margin-top  : 40px ;
`

const Btn = styled.button`
  border : none;
  background-color : white;
  font-size: 18px;
  font-weight: 600;
  padding: 3%;
  cursor: pointer;
:hover{
    background-color: #80036f;
    color:white;
    padding: 3%;

}
`

const Avatar = styled.img`
    border-radius: 100px;
    width: 140px;
    height: 140px;
    background-size: cover;
    cursor: pointer;
`

const ImgBox = styled.div`
  display  : flex ;
  justify-content: center;
`;