import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  color: #ffffff;
  font-family: 'Gotham', 'Montserrat', sans-serif;
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
  justify-content: flex-start;
  min-height: 100vh;
  padding: 8rem 2rem 2rem 2rem;

  @media (max-width: 768px) {
    padding: 6rem 1rem 1rem 1rem;
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
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem;
    width: 65%;
    margin: 0 auto;
    display: block;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  height: 150px;
  resize: vertical;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem;
    width: 65%;
    margin: 0 auto;
    display: block;
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

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem;
    width: auto;
    margin: 1rem auto 0;
    display: block;
  }
`;

const ContactInfo = styled.div`
  p {
    margin-bottom: 1rem;
  }
`;

const SocialLinks = styled.div`
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  display: inline-block;
  margin-right: 1rem;
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #4CAF50;
  }
`;

const ContactUsPage: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container>
      <Stars />
      <Content>
        <MainTitle>{t('contactUs.title')}</MainTitle>
        <ContactGrid>
          <Card>
            <SectionTitle>{t('contactUs.form.title')}</SectionTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">{t('contactUs.form.name')}</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">{t('contactUs.form.email')}</Label>
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
                <Label htmlFor="message">{t('contactUs.form.message')}</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <SubmitButton type="submit">{t('contactUs.form.submit')}</SubmitButton>
            </form>
          </Card>
          <Card>
            <SectionTitle>{t('contactUs.info.title')}</SectionTitle>
            <ContactInfo>
              <p><strong>{t('contactUs.info.email')}:</strong> efexzium@gmail.com</p>
              <p><strong>{t('contactUs.info.phone')}:</strong> +1 (787) 525-6420</p>
            </ContactInfo>
            <SocialLinks>
              <SocialLink href="#">{t('contactUs.info.linkedin')}</SocialLink>
              <SocialLink href="#">{t('contactUs.info.youtube')}</SocialLink>
            </SocialLinks>
          </Card>
        </ContactGrid>
      </Content>
    </Container>
  );
};

export default ContactUsPage;