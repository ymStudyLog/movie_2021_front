import React, { useState, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import Button, { ButtonText } from "../components/common/Button";
import { RiNetflixFill, RiArrowRightSLine } from "react-icons/ri";
import myColor from "../lib/styles/myColor";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changeInput } from "../modules/auth";
import BodyWrapper from "../components/common/BodyWrapper";
import HeaderWrapper, { Header, Spacer } from "../components/common/HeaderWrapper";

const FirstText = styled.p`
  text-align: center;
  font-weight: bold;
  margin: 0;
  font-size: 3rem;

  @media (max-width: 600px) {
    font-size: 2.4rem;
  }
`;

const SecondText = styled.p`
  text-align: center;
  font-size: 1.6rem;
  max-width: 625px;
  margin: 1rem auto 0.7rem;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const ThirdText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const StyledBox = styled.div`
  width: 100%;
  min-height: 8rem;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const Input = styled.input`
  font-size: 20px;
  padding: 10px;
  border: none;
  line-height: 30px;
  width: 100%;
  color: ${myColor.mainGray[8]};

  &:focus {
    outline: none;
  }

  @media (min-width: 481px) and (max-width: 700px) {
    width: 55vw;
  }

  @media (min-width: 701px) {
    width: 25rem;
  }
`;

const ErrorMessage = styled.div`
  color: orange;
  font-size: 0.725rem;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const InputButton = styled(Button)`
  border-radius: 0 !important;

  @media (max-width: 480px) {
    width: 96%;
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }
`;

const InputWrapper = styled.div`
  @media (max-width: 480px) {
    width: 96%;
  }
`;

/*
 * ?????? Home ????????? - login ??????, logout ??????
 */

const HomePage = ({ history }) => {
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const inputEl = useRef();

  //????????? ?????? ?????????
  const emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const onhandleClick = () => {
    if (userEmail.length == 0) {
      setError("????????? ???????????????.");
      setUserEmail("");
      inputEl.current.focus();
    } else if (userEmail.match(emailRegExp) == null) {
      setError("????????? ???????????? ???????????????.");
      setUserEmail("");
      inputEl.current.focus();
    } else {
      dispatch(
        changeInput({
          form: "register",
          key: "username",
          value: userEmail,
        })
      );
      history.push("/register");
    }
  };

  return (
    <>
      <HeaderWrapper>
        <Header>
          <RiNetflixFill color={myColor.mainRed[0]} size={40} />
          <Link to="/login">
            <Button size={1}>?????????</Button>
          </Link>
        </Header>
      </HeaderWrapper>
      <Spacer />

      <BodyWrapper>
        <FirstText>????????? ????????? ????????? ???????????????.</FirstText>
        <SecondText>
          ????????? ?????????????????? ???????????????. ?????? ???????????? ????????? ?????????
          ???????????????.
        </SecondText>

        <StyledBox>
          <ThirdText>
            ????????? ????????? ????????????? ???????????? ??????????????? ????????? ?????????
            ???????????????.
          </ThirdText>
          <FormWrapper>
            <InputWrapper>
              <Input
                type="text"
                name="username"
                autoComplete="username"
                placeholder="????????? ??????"
                ref={inputEl}
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  setError(null);
                }}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </InputWrapper>
            <InputButton
              size={1.6}
              onClick={() => {
                onhandleClick();
              }}
            >
              <ButtonText>
                ???????????? <RiArrowRightSLine />
              </ButtonText>
            </InputButton>
          </FormWrapper>
        </StyledBox>
      </BodyWrapper>
    </>
  );
};

export default withRouter(HomePage);
