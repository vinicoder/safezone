import styled from 'styled-components/native';
import Label from '~/components/Label';
import { List } from '~/components/Label/styles';

import bgImage from '~/assets/bg-company.png';

export const Header = styled.View`
  flex-direction: row;
  position: relative;
  height: 160px;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
`;

export const HeaderInfo = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  width: 210px;
  z-index: 2;
`;

export const HeaderImage = styled.ImageBackground.attrs({
  source: bgImage,
  resizeMode: 'contain',
})`
  position: absolute;
  top: 30px;
  right: -30px;
  width: 202px;
  height: 117px;
`;

export const LabelList = styled(List)``;

export const LabelItem = styled(Label)`
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const Info = styled.Text`
  font-size: 16px;
  color: #fff;
  margin: 20px 0;
`;

export const TextStrong = styled.Text`
  font-weight: bold;
  color: #fff;
`;

export const InputTitle = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 20px;
`;
