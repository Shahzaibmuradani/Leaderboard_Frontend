import React, {useState} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Segment,
  Content,
  Text,
} from 'native-base';
import CreateEvent from './CreateEvent';
import CreateJob from './CreateJob';
import {ThemeColor} from '../../utils/Constant';

const NewPost = ({navigation}) => {
  const [activetab, setActivetab] = useState(1);

  return (
    <Container>
      <Header
        androidStatusBarColor={ThemeColor}
        style={{backgroundColor: ThemeColor}}
        hasSegment>
        <Left>
          <Button transparent>
            <Icon
              name="arrow-back"
              onPress={() => navigation.navigate('allPosts')}
            />
          </Button>
        </Left>
        <Body style={{alignItems: 'baseline'}}>
          <Segment style={{backgroundColor: ThemeColor}}>
            <Button
              first
              active={activetab === 1 ? true : false}
              onPress={() => setActivetab(1)}>
              <Text>Job</Text>
            </Button>
            <Button
              last
              active={activetab === 2 ? true : false}
              onPress={() => setActivetab(2)}>
              <Text>Event</Text>
            </Button>
          </Segment>
        </Body>
        <Right>
          {/* <Button transparent>
            <Icon>Post</Icon>
          </Button> */}
        </Right>
      </Header>
      <Content padder>
        {activetab === 1 ? (
          <CreateJob navigation={navigation} />
        ) : (
          <CreateEvent navigation={navigation} />
        )}
      </Content>
    </Container>
  );
};

export default NewPost;
