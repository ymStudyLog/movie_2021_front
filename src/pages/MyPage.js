import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { logout } from "../modules/user";
import HeaderWrapper, {
  Spacer,
  Header,
} from "../components/common/HeaderWrapper";
import Button from "../components/common/Button";
import myColor from "../lib/styles/myColor";
import { RiNetflixFill } from "react-icons/ri";
import styled from "styled-components";
import MovieForm from "../containers/MovieForm";
//import UserForm from "../containers/UserForm";
import BodyWrapper from "../components/common/BodyWrapper";

const StyledBox = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  cursor: pointer;
  font-weight: 600;
  margin-right: 0.4rem;

  @media (min-width: 480px) {
    margin-right: 1rem;
  }
`;

const MyPage = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const [mypage, setMypage] = useState(false);

  /* 새로고침하면 로그인 정보 날아가는것 수정하기 
-> 새로고침하면 localStorage와 cookie 살아있는데 modules/user의 user가 날아감 
-> HomePage에서 user 정보 저장해줘야 안 날아감.
*/
  useEffect(() => {
    try {
      const storageUser = localStorage.getItem("user");
      if (!user || !storageUser) {
        console.log("로그인 중 아님");
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div>
      <HeaderWrapper>
        <Header>
          <RiNetflixFill color={myColor.mainRed[0]} size={40} />
          {!user ? (
            <StyledBox>
              <Link to="/login">
                <Button size={1}>로그인</Button>
              </Link>
            </StyledBox>
          ) : (
            <StyledBox>
              <UserInfo
                onClick={() => {
                  setMypage(!mypage);
                }}
              >
                {user.username}
              </UserInfo>
              <Button size={1} onClick={onLogout}>
                로그아웃
              </Button>
            </StyledBox>
          )}
        </Header>
      </HeaderWrapper>
      <Spacer />

      {!user && (
        <BodyWrapper>
          <span>로그인 후에 이용하실 수 있습니다.</span>
        </BodyWrapper>
      )}
      {user && (mypage ? <BodyWrapper><span>구현 전</span></BodyWrapper> : <MovieForm />)}
    </div>
  );
};

export default withRouter(MyPage);
