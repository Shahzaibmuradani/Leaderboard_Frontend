import React from 'react';

import {Content, Spinner} from 'native-base';
import {ThemeColor} from '../../utils/Constant';

export default () => {
  return (
    <Content>
      <Spinner color={ThemeColor} />
    </Content>
  );
};
