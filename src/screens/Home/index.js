import React, {useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getParticipants} from '../../redux/actions/participant';
import {useDispatch, useSelector} from 'react-redux';
import Item from './Item';
import Spinner from '../../utils/Spinner';
import {styles} from '../../styles/itemStyles';
import Header from '../../components/Header';
import {SHeight, SWidth} from '../../utils/Constant';

const Home = (props) => {
  const dispatch = useDispatch();
  // get posts
  const getPart = useSelector((state) => state.participant?.participants);

  console.log('Participants', getPart);
  // loader
  const loading = useSelector((state) => state.participant?.loading);

  useEffect(() => {
    dispatch(getParticipants());
  }, [getPart]);
  return (
    <SafeAreaView>
      {loading || getPart === null ? (
        <Spinner />
      ) : (
        <>
          <Header title="Leaderboard" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              padding: SHeight * 0.01,
              borderBottomWidth: 0.5,
              backgroundColor: '#eceef0',
            }}>
            <View
              style={{
                width: '10%',
                alignItems: 'center',
              }}>
              <Text style={styles.titleStyle}>#</Text>
            </View>
            <View
              style={{
                width: '20%',
                alignItems: 'center',
              }}>
              <Text style={styles.titleStyle}>Name</Text>
            </View>
            <View style={{width: '30%', alignItems: 'center'}}>
              <Text style={styles.titleStyle}>Location</Text>
            </View>
            <View style={{width: '30%', alignItems: 'center'}}>
              <Text style={styles.titleStyle}>Date</Text>
            </View>
            <View style={{width: '10%', alignItems: 'center'}}>
              <Text style={styles.titleStyle}>Units</Text>
            </View>
          </View>
          {/* all posts*/}
          {getPart ? (
            <FlatList
              style={styles.listStyle}
              data={getPart}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <Item participant={item} index={index} />
              )}
            />
          ) : (
            <Spinner />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
