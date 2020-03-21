import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import GoogleMapReact from 'google-map-react';

import logoVertical from 'images/logo-vertical.svg';
import heroImage from 'images/hero-image.svg';

import {
  Container,
  Header,
  Hero,
  MapSection,
  ShapedLink,
  UserProfileButton,
  CompanyList,
  CompanyBox,
  Tag,
} from './styles';

function Home() {
  return (
    <Container>
      <Header>
        <img src={logoVertical} alt="Logo SAFEZONE" />

        <nav>
          <li>
            <ShapedLink>Sobre o projeto</ShapedLink>
          </li>

          <li>
            <ShapedLink primary strong>
              Consultar Empresas
            </ShapedLink>
          </li>

          <li>
            <UserProfileButton>
              <FontAwesomeIcon icon={faUser} />
            </UserProfileButton>
          </li>
        </nav>
      </Header>

      <Hero className="flex-container">
        <div className="box-description-hero">
          <h1>Situação atual das empresas na pandemia.</h1>

          <p>Consulte as medidas tomadas pelas empresas da sua região</p>

          <ShapedLink primary strong>
            Atualize sua empresa
          </ShapedLink>
        </div>
        <div className="box-image-hero">
          <img src={heroImage} alt="Imagem demonstrativa" srcSet="" />
        </div>
      </Hero>

      <MapSection>
        <div className="companies">
          <div className="description">
            <span className="header-list">
              Empresas em <br /> <strong>Piracicaba</strong>
            </span>
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Alterar local
            </div>
          </div>
          <CompanyList>
            {Array(10)
              .fill(null)
              .map((item, index) => (
                <CompanyBox>
                  <div className="title">Empresa Lorem Ipsum Dolor{index}</div>
                  <div className="tag-list">
                    <ul>
                      {['home-office', 'fechada'].map(status => (
                        <Tag key={status}>home-office</Tag>
                      ))}
                    </ul>
                  </div>
                  <div className="updated-info">
                    Atualizado em 18/03/2020 às 12:30
                  </div>
                </CompanyBox>
              ))}
          </CompanyList>
        </div>
        <div className="map">
          <GoogleMapReact
            // bootstrapURLKeys={{ key: null }}
            defaultCenter={{
              lat: 59.95,
              lng: 30.33,
            }}
            defaultZoom={10}
          >
            {/* <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            /> */}
          </GoogleMapReact>
        </div>
      </MapSection>

      {/*

      <footer>
        <div>
          Ajude-nos a manter a plataforma. <strong>Faça uma doação.</strong>
        </div>
        <div>
          Deseja contribuir com o projeto?{' '}
          <strong>Acesse o repositório no GitHub</strong>
        </div>
      </footer>
    */}
    </Container>
  );
}

export default Home;
