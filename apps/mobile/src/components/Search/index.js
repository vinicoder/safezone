import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Animated, Dimensions } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import layoutConfig from '~/config/layout';
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

function Search({}, ref) {
  const { height } = Dimensions.get('window');
  const [translateY] = useState(new Animated.Value(0));

  const searchInputRef = useRef();

  const [loading, setLoading] = useState(false);
  const [searchTimer, setSearchTimer] = useState(0);
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  const open = () => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      searchInputRef.current.focus();
    });
  };

  function closeHandler() {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      searchInputRef.current.clear();
      setQuery('');
    });
  }

  useImperativeHandle(ref, () => ({
    open,
  }));

  async function loadPlaces() {
    await maps
      .get('/place/autocomplete/json', {
        params: {
          input: query,
          types: '(cities)',
        },
      })
      .then(({ data }) => {
        const { predictions } = data;
        setData(predictions);
      });
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
    if (query && query.length > 0) {
      setLoading(true);
      const timer = setTimeout(async () => {
        await loadPlaces();
        setLoading(false);
        if (searchTimer === 0) setSearchTimer(1000);
      }, searchTimer);
      return () => clearTimeout(timer);
    }
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
              <ButtonReturn onPress={closeHandler}>
                <Icon
                  name="chevron-left"
                  size={16}
                  color={layoutConfig.colors.primary}
                />
              </ButtonReturn>
              <InputContainer>
                <Input
                  placeholder="Pesquisar cidades"
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
            <SearchResult>
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

export default forwardRef(Search);
