import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Animated, Dimensions } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { colors } from '~/config/layout';
import maps from '~/services/maps';

import ImageSearch from '~/assets/search-boy.png';

import {
  Container,
  Overlay,
  Content,
  Header,
  ButtonReturn,
  InputContainer,
  Input,
  ButtonSearch,
  SearchImage,
  SearchMessage,
  SearchResults,
  SearchResult,
  SearchIcon,
  SearchInfo,
  SearchResultName,
  SearchResultDesc,
  Loader,
} from './styles';

function City({ placeholder, filter, onPressItem }, ref) {
  const { height } = Dimensions.get('window');
  const [translateY] = useState(new Animated.Value(0));

  const searchInputRef = useRef();

  const [loading, setLoading] = useState(false);
  const [searchTimer, setSearchTimer] = useState(0);
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  const open = () =>
    Animated.timing(translateY, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => searchInputRef.current.focus());

  function close() {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      searchInputRef.current.clear();
      setQuery('');
      setData([]);
    });
  }

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  async function loadPlaces() {
    await maps
      .get('/place/autocomplete/json', {
        params: {
          input: query,
          types: filter,
          origin: '-12.085643,-52.627011',
          location: '-12.085643,-52.627011',
          radius: 2446000,
          strictbounds: true,
        },
      })
      .then(({ data }) => {
        const { predictions } = data;
        setData(predictions);
      });
  }

  async function handleItem({ place_id }) {
    await maps
      .get('/place/details/json', {
        params: {
          place_id,
          fields: 'name,geometry',
        },
      })
      .then(({ data }) => {
        const { result } = data;
        const { name, geometry } = result;
        const { location } = geometry;
        onPressItem({ place_id, name, location });
      });

    await close();
  }

  function emptyComponent() {
    if (loading) return null;

    if (query && query.length > 0) {
      return <SearchMessage>Nenhum resultado encontrado.</SearchMessage>;
    }

    return <SearchImage source={ImageSearch} />;
  }

  useEffect(() => {
    setLoading(false);
    setData([]);

    if (!query) return () => {};

    setLoading(true);
    const timer = setTimeout(async () => {
      await loadPlaces();
      setLoading(false);
      if (searchTimer === 0) setSearchTimer(1000);
    }, searchTimer);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Container ref={ref} pointerEvents="box-none">
      <Overlay
        style={{
          opacity: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        }}
        pointerEvents="box-none"
      />
      <Content
        style={{
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <SearchResults
          data={data}
          ListEmptyComponent={emptyComponent}
          ListHeaderComponent={
            <Header>
              <ButtonReturn onPress={close}>
                <Icon name="chevron-left" size={16} color={colors.primary} />
              </ButtonReturn>
              <InputContainer>
                <Input
                  placeholder={placeholder}
                  ref={searchInputRef}
                  onChangeText={text => setQuery(text)}
                  returnKeyType="search"
                />
                <ButtonSearch onPress={loadPlaces}>
                  <Icon name="search" size={16} color="#FFF" />
                </ButtonSearch>
              </InputContainer>
            </Header>
          }
          renderItem={({ item }) => (
            <SearchResult onPress={() => handleItem(item)}>
              <SearchIcon>
                <Icon name="map-marker" size={20} color="#999" />
              </SearchIcon>
              <SearchInfo>
                <SearchResultName>
                  {item.structured_formatting.main_text}
                </SearchResultName>
                <SearchResultDesc>{item.description}</SearchResultDesc>
              </SearchInfo>
            </SearchResult>
          )}
          ListFooterComponent={loading && <Loader />}
          stickyHeaderIndices={[0]}
        />
      </Content>
    </Container>
  );
}

export default forwardRef(City);
