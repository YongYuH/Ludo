import React from 'react';
import withRedux from 'next-redux-wrapper';
import configureStore from '../../store/createStore';
import { unsetToken } from '../../utils/auth';
import { logout } from '../../utils/lock';

class SignOff extends React.Component {
  componentDidMount() {
    unsetToken();
    logout();
  }

  render() {
    return null;
  }
}

export default withRedux(configureStore)(SignOff);
