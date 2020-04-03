import * as React from 'react';
import {Container, Spinner, List} from 'native-base';
import * as RNFS from 'react-native-fs';
import Request from './Request';

export default class File extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      file: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    const filepath = this.props.navigation.getParam('filepath', null);

    this.setState({isLoading: true});

    RNFS.readFile(filepath, 'utf8').then(selectedFile => {
      this.setState({isLoading: false, file: JSON.parse(selectedFile)});
    });
  }
  render() {
    return (
      <Container>
        {this.state.isLoading === true ? (
          <Spinner color={'blue'} />
        ) : (
          this.state.file &&
          this.state.file.log && (
            <List
              dataArray={this.state.file.log.entries}
              keyExtractor={(item, index) => `${index}`}
              renderRow={data => (
                <Request entry={data} navigation={this.props.navigation} />
              )}
            />
          )
        )}
      </Container>
    );
  }
}
