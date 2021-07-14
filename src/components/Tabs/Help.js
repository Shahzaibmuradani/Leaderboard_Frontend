import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {getQueries} from '../../redux/actions/help';
import Spinner from '../layout/Spinner';
import {
  BlackColor,
  DarkGreenColor,
  ThemeColor,
  WhiteColor,
} from '../../utils/Constant';

const SHeight = Dimensions.get('window').height;

const Help = ({
  getQueries,
  help: {queries, loading},
  navigation,
  auth: {user},
}) => {
  useEffect(() => {
    getQueries();
  }, [getQueries]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{alignItems: 'center'}}
      style={styles.container}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <View>
            <Text style={styles.sectionsub}>Help Me</Text>
          </View>
          <View>
            {queries.map((q, index) => (
              <Fragment key={index}>
                {q.queries.map((question, i) => (
                  <View key={i}>
                    {question.questions.map((que, q) =>
                      question.answers.map((ans, a) => (
                        <View
                          style={{
                            alignSelf: 'center',
                            width: '95%',
                            backgroundColor: 'lightgray',
                            marginBottom: 10,
                            borderRadius: 20,
                            padding: 8,
                          }}
                          key={q}>
                          <Text style={{fontWeight: 'bold', color: BlackColor}}>
                            {que.question}?
                          </Text>
                          <Text style={{color: DarkGreenColor}}>
                            {ans.answer}.
                          </Text>
                        </View>
                      )),
                    )}
                  </View>
                ))}
              </Fragment>
            ))}
          </View>
          {user.status === 'Admin' && (
            <Button
              style={{marginBottom: SHeight * (3 / 100)}}
              mode="contained"
              color={ThemeColor}
              onPress={() => navigation.navigate('AddFaqs')}>
              Add More
            </Button>
          )}
        </>
      )}
    </ScrollView>
  );
};

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: WhiteColor,
    paddingTop: 6,
    paddingBottom: 4,
    height: SHeight,
  },
  sectionsub: {
    fontSize: 20,
    marginEnd: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    color: ThemeColor,
  },
});
