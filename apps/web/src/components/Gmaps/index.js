import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import useSupercluster from 'use-supercluster';

import mapsConfig from 'config/maps';

import BRAZIL_COORDINATES from 'consts/BRAZIL_COORDINATES.json';

import { ClusterMarker, CompanyMarker } from './styles';

const MapMarkerIcon = ({ size = '6x', color }) => (
  <FontAwesomeIcon
    size={size}
    color={color || 'rgb(238, 66, 102)'}
    icon={faMapMarkerAlt}
  />
);

const Marker = ({ children }) => children;

const Gmaps = forwardRef(({ points = [] }, ref) => {
  // Map setup
  const mapRef = useRef();
  const mapsRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(4);
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  useImperativeHandle(ref, () => ({
    getInstanceMap: () => {
      return mapRef.current;
    },
    getInstanceMaps: () => {
      return mapsRef.current;
    },
  }));

  return (
    <GoogleMapReact
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => {
        mapRef.current = map;
        mapsRef.current = maps;
      }}
      bootstrapURLKeys={{
        key: mapsConfig.apiKey,
        language: mapsConfig.language,
      }}
      defaultCenter={BRAZIL_COORDINATES}
      defaultZoom={zoom}
      onChange={({ zoom, bounds }) => {
        setZoom(zoom);
        setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
      }}
    >
      {clusters.map(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {
          cluster: isCluster,
          point_count: pointCount,
        } = cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              lat={latitude}
              lng={longitude}
            >
              <ClusterMarker
                style={{
                  width: `${10 + (pointCount / points.length) * 20}px`,
                  height: `${10 + (pointCount / points.length) * 20}px`,
                }}
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  mapRef.current.setZoom(expansionZoom);
                  mapRef.current.panTo({ lat: latitude, lng: longitude });
                }}
              >
                {pointCount}
              </ClusterMarker>
            </Marker>
          );
        }

        return (
          <Marker
            key={`company-${cluster.properties.companyId}`}
            lat={latitude}
            lng={longitude}
          >
            <CompanyMarker type="button" onClick={() => console.log(cluster)}>
              <MapMarkerIcon size="2x" />
            </CompanyMarker>
          </Marker>
        );
      })}
    </GoogleMapReact>
  );
});

export default Gmaps;
