import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../styles/headerStyles';
import AddModal from '../Modal';

const Header = ({title}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View>
        <AddModal
          modalVisible={modalVisible}
          onPressOK={() => setModalVisible(!modalVisible)}
        />
      </View>
    </View>
  );
};

export default Header;
