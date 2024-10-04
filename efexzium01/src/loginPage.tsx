import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';

interface FormData {
  email: string;
  password: string;
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Gotham', 'Montserrat', sans-serif;
  }
`;

const LoginContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: #ffffff;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
`;

const Stars = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  transform: rotate(-45deg);
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: zoom 5s infinite;
  opacity: 0;

  @keyframes zoom {
    0% {
      opacity: 0;
      transform: scale(0.5) rotate(-45deg);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(1.2) rotate(-45deg);
    }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 3rem;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.7);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const LoginCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  width: 100%;
  max-width: 400px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 90%;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-bottom: 1rem;

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const SocialLogin = styled.div`
  text-align: center;
`;

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const GoogleButton = styled(SocialButton)`
  background-color: white;
  color: #757575;
  border: 1px solid #dadce0;
  
  &:hover {
    background-color: #f8f9fa;
    box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
  }
`;

const FacebookButton = styled(SocialButton)`
  background-color: #4267B2;
  color: white;
`;

const AppleButton = styled(SocialButton)`
  background-color: #000000;
  color: white;
`;

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    // Here you would typically send the login data to your backend
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    // Implement the social login logic here
  };

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <Stars />
        <Content>
          <MainTitle>Login</MainTitle>
          <LoginCard>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <SubmitButton type="submit">Login</SubmitButton>
            </form>
            <SocialLogin>
              <p>Or login with:</p>
              <SocialButtons>
                <GoogleButton onClick={() => handleSocialLogin('Google')}>
                  <FcGoogle size={20} /> Sign in with Google
                </GoogleButton>
                <FacebookButton onClick={() => handleSocialLogin('Facebook')}>
                  <FaFacebook size={20} /> Facebook
                </FacebookButton>
                <AppleButton onClick={() => handleSocialLogin('Apple')}>
                  <FaApple size={20} /> Apple
                </AppleButton>
              </SocialButtons>
            </SocialLogin>
          </LoginCard>
        </Content>
      </LoginContainer>
    </>
  );
};

export default LoginPage;