import React from 'react';
import PropTypes from 'prop-types';
import { Container, Name, Icon } from './styles';

function Label({ name, hasIcon, active, ...rest }) {
  return (
    <Container {...rest} active={active}>
      {hasIcon &&
        (active ? (
          <Icon name="check" color="#FFF" size={16} />
        ) : (
          <Icon name="radio-button-unchecked" color="#FFF" size={16} />
        ))}
      <Name>{name}</Name>
    </Container>
  );
}

Label.propTypes = {
  name: PropTypes.string.isRequired,
  hasIcon: PropTypes.bool,
  active: PropTypes.bool,
};

Label.defaultProps = {
  hasIcon: false,
  active: true,
};

export default Label;
