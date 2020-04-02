import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

import colors from 'metrics/colors';

const getThemeBackground = theme => {
  switch (theme) {
    case 'primary':
      return colors.christalle;
    case 'secondary':
      return colors.white_smoke;
    case 'rose':
      return colors.french_rose;
    case 'persian_green':
      return colors.persian_green;
    case 'blue_haze':
      return colors.blue_haze;

    default:
      return colors.white_smoke;
  }
};

const getThemeColor = theme => {
  switch (theme) {
    case 'primary':
      return colors.white_smoke;
    case 'secondary':
      return colors.christalle;
    case 'rose':
      return colors.white_smoke;
    case 'persian_green':
      return colors.white_smoke;
    case 'blue_haze':
      return colors.white;

    default:
      return colors.christalle;
  }
};

export const ButtonStyled = styled.button`
  display: block;
  padding: 5px 35px;
  height: 40px;
  border-radius: 20px;
  border: none;

  font-weight: ${props => props.fontWeight || 'normal'};
  font-size: 16px;
  background: ${props =>
    props.noBackground ? '' : getThemeBackground(props.theme)};
  color: ${props => getThemeColor(props.theme)};
  transition: background 300ms;

  &:hover {
    background: ${props =>
      props.noBackground ? '' : darken(0.1, getThemeBackground(props.theme))};
    color: ${props =>
      props.noBackground ? '' : darken(0.1, getThemeColor(props.theme))};
  }
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
  background: ${props =>
    props.noBackground ? '' : getThemeBackground(props.theme)};
  color: ${props => getThemeColor(props.theme)};
  transition: background 300ms;

  &:hover {
    background: ${props =>
      props.noBackground ? '' : darken(0.1, getThemeBackground(props.theme))};
    color: ${props =>
      props.noBackground ? '' : darken(0.1, getThemeColor(props.theme))};
  }
`;
