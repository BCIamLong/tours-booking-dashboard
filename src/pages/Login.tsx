import styled from "styled-components";
import Heading from "~/components/Heading";
// import LoginForm from "~/features/authentication/LoginForm";
import LoginForm from "~/features/auth/LoginForm";
import Logo from "~/layouts/Logo";

const LoginPage = styled.div`
  display: flex;
  background-color: var(--color-grey-100);
  height: 100vh;
  flex-direction: column;
  padding: 4.8rem;
  gap: 1.2rem;

  div:first-child {
    width: 20%;
    margin: 0 auto;
    margin-bottom: 1.2rem;
  }

  form {
    width: 45rem;
    margin: 0 auto;
    background-color: var(--color-grey-0) !important;
    color: var(--color-grey-700);
  }

  form div {
    flex-direction: column;
    width: 100% !important;
    border-bottom: none;
    padding: 0 !important;
  }

  form div label {
    width: 100%;
    border-bottom: none !important;
  }

  form div input {
    width: 100%;
  }

  form button {
    margin-top: 2rem;
  }
`;

function Login() {
  return (
    <LoginPage>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      {/* <LoginForm /> */}
      <LoginForm />
    </LoginPage>
  );
}

export default Login;
