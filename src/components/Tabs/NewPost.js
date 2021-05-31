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
import {connect} from 'react-redux';

import {Something} from '../../actions/help';
import CreateEvent from './CreateEvent';
import CreateJob from './CreateJob';

const NewPost = ({Something, navigation}) => {
  // const [formdata, setFormdata] = useState({
  //   comments: '',
  // });

  const [activetab, setActivetab] = useState(1);

  // const {comments} = formdata;

  // const onChange = (name, value) =>
  //   setFormdata({
  //     ...formdata,
  //     [name]: value,
  //   });

  // const onSubmit = async () => {
  //   Something(comments);
  // };

  return (
    <Container>
      <Header
        androidStatusBarColor="#0C6CD5"
        style={{backgroundColor: '#0C6CD5'}}
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
          <Segment style={{backgroundColor: '#0C6CD5'}}>
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

NewPost.propTypes = {
  //Comments: PropTypes.func.isRequired,
};

export default connect(null, {Something})(NewPost);
