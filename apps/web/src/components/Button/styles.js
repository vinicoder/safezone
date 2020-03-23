import styled from 'styled-components';
import { Link } from 'react-router-dom';

const colors = {
  christalle: 'rgb(42, 30, 92)',
  white_smoke: 'rgb(249, 249, 249)',
  white: 'rgb(250, 250, 250)',
  french_rose: 'rgb(238, 66, 102)',
};

export const ButtonStyled = styled.button`
  display: block;
  padding: 5px 35px;
  height: 40px;
  border-radius: 20px;
  border: none;

  font-weight: ${props => props.fontWeight || 'normal'};
  font-size: 16px;
  background: ${props => {
    switch (props.theme) {
      case 'primary':
        return colors.christalle;
      case 'secondary':
        return colors.white_smoke;
      case 'rose':
        return colors.french_rose;

      default:
        return colors.white_smoke;
    }
  }};
  color: ${props => {
    switch (props.theme) {
      case 'primary':
        return colors.white_smoke;
      case 'secondary':
        return colors.christalle;
      case 'rose':
        return colors.white_smoke;

      default:
        return colors.christalle;
    }
  }};
`;

export const LinkStyled = styled(Link)`
  display: block;
  text-align: center;
  line-height: 28px;
  padding: 5px 35px;
  height: 40px;
  border-radius: 20px;
  border: none;
  text-decoration: none;

  font-weight: ${props => props.fontWeight || 'normal'};
  font-size: 16px;
  background: ${props => {
    switch (props.theme) {
      case 'primary':
        return colors.christalle;
      case 'secondary':
        return colors.white_smoke;
      case 'rose':
        return colors.french_rose;

      default:
        return colors.white_smoke;
    }
  }};
  color: ${props => {
    switch (props.theme) {
      case 'primary':
        return colors.white_smoke;
      case 'secondary':
        return colors.christalle;
      case 'rose':
        return colors.white_smoke;

      default:
        return colors.christalle;
    }
  }};
`;
