/**
 * @format
 * @flow
 */
import * as React from 'react';
import {Root} from 'native-base';

import Navigator from './src/Navigator';

const App: () => React$Node = () => {
  return (
    <Root>
      <Navigator />
    </Root>
  );
};

export default App;
