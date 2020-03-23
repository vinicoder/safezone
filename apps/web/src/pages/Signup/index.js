import React from 'react';

import heroImage from 'images/hero-image.svg';

function Signup() {
  return (
    <div className="container">
      <div className="row justify-content-md-center align-items-center">
        <div className="col col-md-5">
          <img src={heroImage} alt="Imagem sobre o projeto" />
        </div>
        <div className="col col-md-5">{/*  */}</div>
      </div>
    </div>
  );
}

export default Signup;
