import * as React from 'react';
import Styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {Button, Text, Icon} from 'native-base';
import {formatDate, formatFileSize} from '../utils';
const Container = Styled.View`
  flex: 1;
  flex-direction: row;
  padding: 16px;
  border-bottom-width: 1px;
  border-color: lightgray;
`;

const InfoContainer = Styled.View`
    flex: 1;
    flex-direction: column;
`;
const InfoItem = Styled.Text`
    ${(props: IStyled) =>
      props.isTitle
        ? `
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 16px;
    `
        : ''}
`;
const DateContainer = Styled.View`
    flex: 1;
    flex-direction: column;
`;
const DateItem = Styled.Text``;


export default class FileItem extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedFile: false,
    };
  }

  render() {
    const {file, index} = this.props;
    const {ctime, mtime, name, size} = file;

    return (
      <Container>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('File', {
              filepath: file.path,
            })
          }>
          <InfoContainer>
            <InfoItem isTitle={true}>{name}</InfoItem>

            <InfoItem>
              filesize: {formatFileSize(Number.parseInt(size, 10))}
            </InfoItem>
          </InfoContainer>
          <DateContainer>
            {ctime && (
              <>
                <DateItem>created</DateItem>
                <DateItem>{formatDate(ctime)}</DateItem>
              </>
            )}
            {mtime && (
              <>
                <DateItem>modified</DateItem>
                <DateItem>{formatDate(mtime)}</DateItem>
              </>
            )}
          </DateContainer>
          <Button
            small
            danger
            iconLeft
            bordered
            style={{width: 95, marginTop: 10}}
            removeFile
            onPress={() => {
              this.props.removeFile(file.path, index);
            }}>
            <Icon name="trash" />
            <Text>Delete</Text>
          </Button>
        </TouchableOpacity>
      </Container>
    );
  }
}
