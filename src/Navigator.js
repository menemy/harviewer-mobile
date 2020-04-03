import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Files from './Files/Files';
import File from './File/File';
import RequestDetails from './File/RequestDetails';

const AppNavigator = createStackNavigator(
  {
    Files: {
      screen: Files,
      navigationOptions: () => ({
        title: 'HAR files',
      }),
    },
    File: {
      screen: File,
      navigationOptions: () => ({
        title: 'File contents',
      }),
    },
    RequestDetails: {
      screen: RequestDetails,
      navigationOptions: () => ({
        title: 'Request contents',
      }),
    },
  },
  {
    initialRouteName: 'Files',
    // headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
