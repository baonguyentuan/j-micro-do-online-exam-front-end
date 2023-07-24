import styled from "styled-components";

export const AuthFormWrapper = styled.section`
  .container {
    max-width: 100%;
    height: fit-content;
    border-radius: 10px;
    padding: 30px 30px 50px;
    border: 1px solid #d9e0ec;
    background-color: #ffffff;
  }

  .container_form_login {
    width: 80%;
    margin: 0 auto;
  }

  .error-helper {
    position: absolute;
  }

  //responsive
  @media (min-width: 800px) {
    .container {
      width: 60%;
    }
  }

  @media (min-width: 1200px) {
    .container {
      width: 32%;
    }
  }
`;