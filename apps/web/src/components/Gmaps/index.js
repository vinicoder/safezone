import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// import useSWR from 'swr';
import useSupercluster from 'use-supercluster';

import mapsConfig from 'config/maps';
// import mapsApi from 'services/maps';
import api from 'services/api';
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

const Gmaps = forwardRef(({ city }, ref) => {
  // Map setup
  const mapRef = useRef();
  const mapsRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(4);

  useImperativeHandle(ref, () => ({
    getInstanceMap: () => {
      return mapRef.current;
    },
    getInstanceMaps: () => {
      return mapsRef.current;
    },
  }));

  // const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=PIRACICABA&key=AIzaSyCmWArZHnZJjWjJGgBNNQLwgklP0Z81fg4&types=(cities)&language=pt-BR`;
  // const fetcher = fetchUrl => fetch(fetchUrl).then(response => response.json());
  const url = 'companies';
  const fetcher = swrUrl =>
    api.get(swrUrl, {
      params: {
        place_id: city && city.place_id,
      },
    });
  // const { data, error } = useSWR(url, fetcher);
  // const companies = data && !error ? data.predictions : [];

  const points = [].map(company => ({
    type: 'Feature',
    properties: {
      id: company.id,
      cluster: false,
      companyId: company.id,
      category: company.category,
      description: company.description,
      place_id: company.place_id,
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(company.location.longitude),
        parseFloat(company.location.latitude),
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

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
