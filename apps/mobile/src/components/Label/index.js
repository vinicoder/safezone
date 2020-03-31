import React from 'react';
import PropTypes from 'prop-types';
import { Container, Name, Icon } from './styles';

function Label({ name, hasIcon, active, small, ...rest }) {
  return (
    <Container {...rest} active={active} small={small}>
      {hasIcon &&
        (active ? (
          <Icon name="check" color="#FFF" size={small ? 14 : 16} />
        ) : (
          <Icon
            name="radio-button-unchecked"
            color="#FFF"
            size={small ? 14 : 16}
          />
        ))}
      <Name small={small}>{name}</Name>
    </Container>
  );
}

Label.propTypes = {
  name: PropTypes.string.isRequired,
  hasIcon: PropTypes.bool,
  active: PropTypes.bool,
  small: PropTypes.bool,
};

Label.defaultProps = {
  hasIcon: false,
  active: true,
  small: false,
};

export default Label;
