import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { __searchPosts } from "../../../redux/modules/board";
import Swal from "sweetalert2";
import searchIcon from "../../../assets/icons/search.png"
import SearchCard from "./SearchCard";
import Notfound from "../../../assets/images/notfound.png"
const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, error, post } = useSelector((state) => state?.post)

  const searchEnter = (e) => {
    //이벤트의 키 값이 엔터키와 일치할 때 다음을 실행한다
    if (searchTerm && e.key === "Enter") {
      const value = e.target.value;
      dispatch(__searchPosts(searchTerm));
      navigate("/search/" + value);
    } 
  };

  const getSearchTerm = () => {
    //검색어가 공란인 채로 온클릭 이벤트 실행 안됨
    if (searchTerm === "") {
      new Swal({
        title: "키워드를 입력해주세요!",
        icon: "warning",
      });
      return;
    }
    dispatch(__searchPosts(searchTerm)).then((res) => {
      navigate("/search/" + searchTerm);
    });
  };

  useEffect(() => {
    dispatch(__searchPosts(searchTerm));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        로딩이미지~
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <Container>
      <Head>게시글의 제목을 기준으로 검색합니다.</Head>
      <InputBtnWrap>
        <SearchInput
          type="search"
          name="search"
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
          onKeyDown={searchEnter}
          placeholder=" 검색어를 입력해주세요.." />
        <GoSearch 
            onClick={getSearchTerm}
            >
              <img src={searchIcon} alt="" />
        </GoSearch>
      </InputBtnWrap>
      {post === null ?
        (<None>
          <img src={Notfound} alt="" />
          <span>검색 결과가 없습니다 ☹️</span>
        </None>)
        : (
          <>
            <SearchResultHead>
              <span>" {searchTerm} "</span>을 검색한 결과 입니다.
            </SearchResultHead>  
            {post.map((item) => (<SearchCard item={item} key={item?.postId} />))}
          </>
        )}
    </Container>
  )
};

export default Search;

const Container = styled.div`
    background-color: white;
    height: 100vh;
    width: 100%;
    overflow-y: scroll;
`

const SearchInput = styled.input`
    width:65%;
    height: 40px;
    margin-left: 55px;
    border: none;
    border: 2px solid #9f95ad;
    border-radius: 15px;
    font-size: 15px;
    box-shadow: 1px 1px 1px 1px #D4B4FF;
    :focus {
        outline: #9C7FCB;
    }
`

const GoSearch = styled.div`
    width: 40px;
    height: 40px;
    border: 1px solid #9C7FCB;
    /* background-color: #FAEAFF; */
    border-radius: 100%;
    box-shadow: 1px 1px 1px 1px #D4B4FF;
    margin-top: 5px;
    /* margin-left: 82%; */
    cursor: pointer;
    margin-right: 15px;
    margin-bottom: 8px;
    img {
        width: 90%;
        height: 100%;
        object-fit: contain;
    }
`

const InputBtnWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const None = styled.div`
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    span{
        margin-top: 30px;
        font-size: 18px;
    };
    img{
        margin-top: 100px;
        width: 300px;
        height: 300px;
    }
`

const Head = styled.div`
    text-align: center;
    width: 100%;
    height: 20px;
    margin: 0 auto;
    padding-top: 90px;
`
const SearchResultHead = styled.div`
    text-align: center;
    font-size: 15px;
    span{
      font-weight: bold;
    }
`