import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Content, Card, CardItem, View, Text, Left} from 'native-base';
import {ThemeColor} from '../../utils/Constant';

const ShowExperience = ({
  navigation,
  experience: {_id, title, company, location, current, from, to, description},
  updateActions,
}) => {
  const fromdate = moment(from).format('YYYY/MM/DD');
  const todate = moment(to).format('YYYY/MM/DD');
  return (
    <>
      <Card>
        <CardItem>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>{title}</Text>
              {updateActions && (
                <FontAwesome5Icon
                  style={{
                    marginTop: 4,
                    marginLeft: 10,
                    alignSelf: 'flex-start',
                  }}
                  name="edit"
                  size={14}
                  color={ThemeColor}
                  onPress={() =>
                    navigation.navigate('EditExperience', {
                      id: _id,
                      title: title,
                      company: company,
                      location: location,
                      current: current,
                      from: from,
                      to: to,
                      description: description,
                    })
                  }
                />
              )}
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={{fontWeight: 'bold'}}>Company: </Text>
                <Text>{company}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={{fontWeight: 'bold'}}>Location: </Text>
                <Text>{location}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                {<Text>{fromdate} - </Text>}
                {current ? <Text>Present</Text> : <Text>{todate}</Text>}
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Text style={{fontWeight: 'bold'}}>Description: </Text>
                <Text>{description}</Text>
              </View>
            </View>
          </View>
        </CardItem>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
});

ShowExperience.defaultProps = {
  updateActions: true,
};

ShowExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ShowExperience;
