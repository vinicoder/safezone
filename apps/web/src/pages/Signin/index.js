import React from 'react';

import aboutImage from 'images/about-image.svg';

function Signin() {
  return (
    <div className="container">
      <div className="row justify-content-md-center align-items-center">
        <div className="col col-md-5">
          <img src={aboutImage} alt="Imagem sobre o projeto" />
        </div>
        <div className="col col-md-5">{/*  */}</div>
      </div>
    </div>
  );
}

export default Signin;
