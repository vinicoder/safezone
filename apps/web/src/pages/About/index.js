import React from 'react';

import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import Button from 'components/Button';
import aboutImage from 'images/about-image.svg';

import { Container, AboutSection } from './styles';

function About() {
  return (
    <Container>
      <Header />
      <AboutSection>
        <div className="container">
          <div className="row justify-content-lg-center align-items-center">
            <div className="col-sm-12 col-lg-5">
              <img src={aboutImage} alt="Imagem sobre o projeto" />
            </div>
            <div className="col-sm-12 col-lg-5">
              <h3>Sobre o projeto</h3>
              <p className="sub-title">
                Por que atualizar o estado atual das empresas é tão importante?
              </p>
              <p className="description">
                O projeto Safezone, nasceu no inicio da pandemia do COVID-19,
                com o intuito de auxiliar as pessoas a saberem quais as empresas
                da sua região estão se mobilizando em prol da campanha
                #FiqueEmCasa.
                <br />
                Nosso principal objetivo é informar para a comunidade quais
                empresas já aderiram ao modelo de trabalho home-office, tendo a
                ciência de que estamos passando por uma pandemia, mostrando
                empatia sobre seus colaboradores e familiares.
              </p>

              <div className="row">
                <div className="col col-sm-7">
                  <Button to="/" theme="rose" fontWeight="bold">
                    Atualize sua empresa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AboutSection>
      <Footer />
    </Container>
  );
}

export default About;
