import * as React from 'react';
import {Platform, AppState} from 'react-native';
import Styled from 'styled-components/native';
import * as RNFS from 'react-native-fs';
import {FlatList} from 'react-native-gesture-handler';
import FileItem from './FileItem';

const Container = Styled.SafeAreaView`
  flex: 1;
`;

export default class Files extends React.Component {
  constructor(props: Props) {
    super(props);
    this._DOCUMENT_PATH = RNFS.DocumentDirectoryPath;

    this.props.navigation.setParams({loadFile: this.readFileList});

    this.state = {
      files: [],
      selectedFile: false,
    };
  }

  render() {
    const {files} = this.state;
    return (
      <Container>
        {files.length > 0 && (
          <FlatList
            data={files}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item, index}) => (
              <FileItem
                file={item}
                index={index}
                removeFile={this.removeFile}
                navigation={this.props.navigation}
              />
            )}
          />
        )}
      </Container>
    );
  }
  componentDidMount() {
    this.readFileList();
    AppState.addEventListener('change', this.handleAppStateChange);
  }
  handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.readFileList();
    }
  };
  removeFile = (path, index) => {
    RNFS.unlink(path)
      .then(() => {
        var array = [...this.state.files]; // make a separate copy of the array
        array.splice(index, 1);
        this.setState({files: array});
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  readFileList = async () => {
    if (Platform.OS === 'ios') {
      await this.moveInboxFiles();
    }

    RNFS.readDir(this._DOCUMENT_PATH)
      .then((srcFiles: Array<RNFS.ReadDirItem>) => {
        let files: Array<RNFS.ReadDirItem> = [];
        srcFiles.map((file: RNFS.ReadDirItem) => {
          console.log(file);
          if (file.isFile() && file.name.indexOf('.har') >= 0) {
            files.push(file);
          }
        });
        this.setState({files});
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  };
  moveInboxFiles = async () => {
    try {
      const inboxFiles = await RNFS.readDir(this._DOCUMENT_PATH + '/Inbox');
      if (inboxFiles) {
        inboxFiles.map(async file => {
          if (file.isFile()) {
            if (file.isFile()) {
              await RNFS.moveFile(
                file.path,
                `${this._DOCUMENT_PATH}/${file.name}`,
              );
            }
          }
        });
      }
    } catch (err) {
      console.log(err.message, err.code);
    }
  };
}
