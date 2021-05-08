import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Card, CardItem, Container, Content} from 'native-base';
import {getQueries} from '../../actions/help';
import Spinner from '../layout/Spinner';

const Help = ({
  getQueries,
  help: {queries, loading},
  auth: {user},
  navigation,
}) => {
  useEffect(() => {
    getQueries();
  }, [getQueries]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container style={styles.container}>
          <Content padder>
            <View style={styles.container}>
              <Text style={styles.sectionsub}>Help Me</Text>
            </View>
            <View style={styles.container1}>
              {queries.map((que, index) => (
                <>
                  <View style={{paddingBottom: 10}}></View>
                  <Card key={index}>
                    <Text>{JSON.stringify(index)}</Text>
                    <CardItem>
                      {que.queries.map((q) => (
                        <View>
                          <Text>{JSON.stringify(index)}</Text>
                          <Text
                            // key={index}
                            style={{fontWeight: 'bold', color: 'black'}}>
                            {q.questions}?
                          </Text>
                          <View style={{margin: 2}}></View>
                          <Text style={{color: 'darkgreen'}}>{q.answers}.</Text>
                        </View>
                      ))}
                    </CardItem>
                  </Card>
                </>
              ))}
            </View>
            {user.status === 'Admin' && (
              <Button
                mode="contained"
                color="#0C6CD5"
                style={styles.button}
                onPress={() => navigation.navigate('AddHelp')}>
                Add More
              </Button>
            )}
          </Content>
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 6,
    paddingBottom: 4,
    alignItems: 'center',
  },
  container1: {
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 5,
  },
  sectionsub: {
    fontSize: 20,
    marginEnd: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#0C6CD5',
  },
  button: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 14,
    width: 140,
  },
});

Help.propTypes = {
  getQueries: PropTypes.func.isRequired,
  help: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  help: state.help,
  auth: state.auth,
});

export default connect(mapStateToProps, {getQueries})(Help);
