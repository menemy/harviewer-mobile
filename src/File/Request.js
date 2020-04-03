import * as React from 'react';
import Url from 'url-parse';
import {formatDate, formatFileSize, formatTime} from '../utils';
import {ListItem, Text} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';

export default class Request extends React.Component {
  renderStatus(statusCode) {
    let color = '#339933';
    if (statusCode > 399) {
      color = '#F22720';
    } else if (statusCode > 299) {
      color = '#FF9901';
    }
    return (
      <Text style={{fontSize: 13, fontWeight: '600', color: color}}>
        {statusCode}
      </Text>
    );
  }

  render() {
    const {entry} = this.props;
    const startedDateTime = new Date(entry.startedDateTime);

    const parsedUrl = new Url(entry.request.url);

    return (
      <ListItem
        style={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          marginRight: 15,
        }}
        onPress={() =>
          this.props.navigation.navigate('RequestDetails', {entry: entry})
        }>
        <Grid>
          <Row style={{height: 25}}>
            <Col
              style={{
                width: 60,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <Text style={{fontSize: 13, fontWeight: '600'}}>
                {entry.request.method}
              </Text>
            </Col>
            <Col
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  flex: 1,
                  flexWrap: 'wrap',
                  flexShrink: 1,
                  color: 'gray',
                  fontSize: 12,
                }}>
                {parsedUrl.origin}
              </Text>
            </Col>
          </Row>
          <Row
            style={{
              height: 60,
              paddingBottom: 20,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Text
              numberOfLines={3}
              style={{
                flex: 1,
                flexWrap: 'wrap',
                flexShrink: 1,
                fontSize: 14,
                // fontWeight: '600',
              }}>{`${parsedUrl.pathname}${parsedUrl.query}${
              parsedUrl.hash
            }`}</Text>
          </Row>
          <Row style={{height: 15}}>
            <Col
              style={{
                borderRightWidth: 1,
                borderRightColor: 'gray',
                width: 50,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <Text style={{fontSize: 12}}>
                {this.renderStatus(entry.response.status)}
              </Text>
            </Col>
            <Col
              style={{
                borderRightWidth: 1,
                borderRightColor: 'gray',
                width: 90,
              }}>
              <Text style={{fontSize: 12}}>{formatTime(entry.time)}</Text>
            </Col>
            <Col
              style={{
                borderRightWidth: 1,
                borderRightColor: 'gray',
                width: 90,
              }}>
              <Text style={{fontSize: 12}}>
                {formatFileSize(entry.response.content.size)}
              </Text>
            </Col>
            <Col>
              <Text style={{fontSize: 12}}>{formatDate(startedDateTime)}</Text>
            </Col>
          </Row>
        </Grid>
      </ListItem>
    );
  }
}
