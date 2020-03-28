import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// import { Container } from './styles';

const K_HINT_HTML_DEFAULT_Z_INDEX = 1000000;
const K_SCALE_HOVER = 1;
const K_SCALE_TABLE_HOVER = 1;
const K_SCALE_NORMAL = 0.65;
const K_MIN_CONTRAST = 0.4;

const MapMarkerIcon = ({ size = '6x' }) => (
  <FontAwesomeIcon
    size={size}
    color="rgb(238, 66, 102)"
    icon={faMapMarkerAlt}
  />
);

export default function Marker() {
  return (
    <div>
      <MapMarkerIcon />
    </div>
  );
}
