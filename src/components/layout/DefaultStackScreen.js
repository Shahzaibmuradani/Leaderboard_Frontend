import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Test from '../Tabs/Test';
import Reviews from '../Tabs/Reviews';

import AppTabsScreen from './AppTabsScreen';
import AppDrawerScreen from './AppDrawerScreen';
import CreateProfile from '../Dashboard/CreateProfile';
import DashboardActions from '../Dashboard/DashboardActions';
import EditProfile from '../Dashboard/EditProfile';
import AddEducation from '../Dashboard/AddEducation';
import AddExperience from '../Dashboard/AddExperience';
import EditEducation from '../Dashboard/EditEducation';
import EditExperience from '../Dashboard/EditExperience';
import Apply from '../Tabs/Apply';
import PostItem from '../Tabs/PostItem';
import NewPost from '../Tabs/NewPost';
import CreateJob from '../Tabs/CreateJob';
import Post from '../Tabs/Post';
import CommentForm from '../Tabs/CommentForm';
import {connect} from 'react-redux';
import Responses from '../Tabs/Responses';
import People from '../Tabs/People';
import ShowResponses from '../Tabs/ShowResponses';
import Profile from '../Profile/Profile';
import Help from '../Tabs/Help';
import AddFaqs from '../Tabs/AddFaqs';
import Email from '../Tabs/Email';

const DefaultStack = createStackNavigator();

const DefaultStackScreen = ({isAuthenticated}) => {
  return (
    <DefaultStack.Navigator headerMode="none">
      <DefaultStack.Screen name="Login" component={Login} />
      <DefaultStack.Screen name="Register" component={Register} />

      {isAuthenticated && (
        <>
          <DefaultStack.Screen
            name="AppDrawerScreen"
            component={AppDrawerScreen}
          />
          <DefaultStack.Screen name="AppTabsScreen" component={AppTabsScreen} />
          <DefaultStack.Screen name="Help" component={Help} />
          <DefaultStack.Screen name="AddFaqs" component={AddFaqs} />
          <DefaultStack.Screen name="NewPost" component={NewPost} />
          <DefaultStack.Screen name="Test" component={Test} />
          <DefaultStack.Screen name="PostItem" component={PostItem} />
          <DefaultStack.Screen name="Apply" component={Apply} />
          <DefaultStack.Screen name="Email" component={Email} />
          <DefaultStack.Screen name="Reviews" component={Reviews} />

          {/* <DefaultStack.Screen name="AddHelp" component={AddHelp} /> */}
          <DefaultStack.Screen name="CreateProfile" component={CreateProfile} />
          <DefaultStack.Screen name="CreateJob" component={CreateJob} />
          <DefaultStack.Screen name="Post" component={Post} />
          <DefaultStack.Screen name="CommentForm" component={CommentForm} />
          <DefaultStack.Screen name="Responses" component={Responses} />
          <DefaultStack.Screen name="ShowResponses" component={ShowResponses} />
          <DefaultStack.Screen name="Profile" component={Profile} />
          <DefaultStack.Screen
            name="DashboardActions"
            component={DashboardActions}
          />
          <DefaultStack.Screen name="EditProfile" component={EditProfile} />
          <DefaultStack.Screen name="AddEducation" component={AddEducation} />
          <DefaultStack.Screen name="AddExperience" component={AddExperience} />
          <DefaultStack.Screen name="EditEducation" component={EditEducation} />
          <DefaultStack.Screen
            name="EditExperience"
            component={EditExperience}
          />
        </>
      )}
    </DefaultStack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(DefaultStackScreen);
