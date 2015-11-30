import * as React from 'react';
import { AppBar } from 'material-ui';
import * as ThemeManager from 'material-ui/lib/styles/theme-manager';

import {CettiTheme} from '../lib/theme';

export class NavBar extends React.Component<{}, {}> {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(CettiTheme),
    };
  }

  render() {
    return (
       <AppBar title='Cetti' />
    );
  }
}

NavBar.childContextTypes = {muiTheme: React.PropTypes.object};
