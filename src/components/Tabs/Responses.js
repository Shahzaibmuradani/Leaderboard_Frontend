import React, {Fragment, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {GreenColor} from '../../utils/Constant';
import ShowResponses from './ShowResponses';

const Responses = ({responses, navigation}) => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <View>
        {responses === undefined || responses.length == 0 ? (
          <></>
        ) : (
          <View
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                width: '40%',
                height: 25,
                borderRadius: 10,
              }}
              onPress={() => setOpen(!open)}>
              <Text
                style={{
                  color: GreenColor,
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                View Responses
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View>
        {open && (
          <FlatList
            data={responses}
            showsVerticalScrollIndicator={false}
            keyExtractor={(responses) => responses._id}
            renderItem={({item}) => (
              <ShowResponses response={item} navigation={navigation} />
            )}
          />
        )}
      </View>
    </Fragment>
  );
};

export default Responses;

const styles = StyleSheet.create({});
