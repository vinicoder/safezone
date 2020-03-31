import axios from 'axios';
import mapsConfig from '~/config/maps';

const maps = axios.create({
  baseURL: mapsConfig.baseURL,
});

maps.interceptors.request.use(config => {
  config.params = config.params || {};
  config.params.key = mapsConfig.apiKey;
  config.params.language = mapsConfig.language;

  return config;
});

export default maps;
