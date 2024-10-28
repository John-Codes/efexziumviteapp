import React from 'react';
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const ServiceCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }
`;

const ServiceTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  opacity: 0.8;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ServiceFeatures = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const FeatureItem = styled.li`
  font-size: 0.9rem;
  line-height: 1.4;
  opacity: 0.7;
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #4CAF50;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Stars />
      <Content>
        <MainTitle>{t('services.title')}</MainTitle>
        <ServicesGrid>
          <ServiceCard>
            <ServiceTitle>{t('services.aiConsulting.title')}</ServiceTitle>
            <ServiceDescription>
              {t('services.aiConsulting.description')}
            </ServiceDescription>
            <ServiceFeatures>
              <FeatureItem>{t('services.aiConsulting.features.strategy')}</FeatureItem>
              <FeatureItem>{t('services.aiConsulting.features.implementation')}</FeatureItem>
              <FeatureItem>{t('services.aiConsulting.features.optimization')}</FeatureItem>
            </ServiceFeatures>
          </ServiceCard>
          <ServiceCard>
            <ServiceTitle>{t('services.aiFocus.title')}</ServiceTitle>
            <ServiceDescription>
              {t('services.aiFocus.description')}
            </ServiceDescription>
            <ServiceFeatures>
              <FeatureItem>{t('services.aiFocus.features.search')}</FeatureItem>
              <FeatureItem>{t('services.aiFocus.features.jira')}</FeatureItem>
              <FeatureItem>{t('services.aiFocus.features.goals')}</FeatureItem>
            </ServiceFeatures>
          </ServiceCard>
          <ServiceCard>
            <ServiceTitle>{t('services.aiTrading.title')}</ServiceTitle>
            <ServiceDescription>
              {t('services.aiTrading.description')}
            </ServiceDescription>
            <ServiceFeatures>
              <FeatureItem>{t('services.aiTrading.features.analysis')}</FeatureItem>
              <FeatureItem>{t('services.aiTrading.features.strategies')}</FeatureItem>
              <FeatureItem>{t('services.aiTrading.features.risk')}</FeatureItem>
            </ServiceFeatures>
          </ServiceCard>
        </ServicesGrid>
      </Content>
    </Container>
  );
};

export default ServicesPage;