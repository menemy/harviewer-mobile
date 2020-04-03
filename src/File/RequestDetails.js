import * as React from 'react';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {Container, Tab, Tabs} from 'native-base';

export default class RequestDetails extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const entry = this.props.navigation.getParam('entry', {});
    if (
      entry.response &&
      entry.response.content &&
      entry.response.content.text &&
      entry.response.content.encoding === 'base64'
    ) {
      // eslint-disable-next-line no-undef
      entry.response.content.textDecoded = btoa(entry.response.content.text);
    }
    delete entry._initiator;
    const summary = {...entry};
    delete summary.request;
    delete summary.response;

    return (
      <Container>
        <Tabs locked={true}>
          <Tab heading="Summary">
            <SyntaxHighlighter
              language="json"
              style={docco}
              highlighter={'hljs'}>
              {JSON.stringify(summary, null, 2)}
            </SyntaxHighlighter>
          </Tab>
          <Tab heading="Request">
            <SyntaxHighlighter
              language="json"
              style={docco}
              highlighter={'hljs'}>
              {JSON.stringify(entry.request, null, 2)}
            </SyntaxHighlighter>
          </Tab>
          <Tab heading="Response">
            <SyntaxHighlighter
              language="json"
              style={docco}
              highlighter={'hljs'}>
              {JSON.stringify(entry.response, null, 2)}
            </SyntaxHighlighter>
          </Tab>
        </Tabs>
        {/*<Text>{JSON.stringify(entry, null, 2)}</Text>*/}
      </Container>
    );
  }
}
