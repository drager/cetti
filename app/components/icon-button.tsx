import * as React from 'react';

import { FlatButton } from 'material-ui';

const styles = Object.freeze({
  iconButton: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    minWidth: 48
  },
});

export class IconButton extends React.Component<{children?: JSX.Element, hoverColor?: string}, {}> {

  render() {
    return (
      <FlatButton style={styles.container} hoverColor={this.props.hoverColor}>
        <div style={styles.iconButton}>
          {this.props.children}
        </div>
      </FlatButton>
    );
  }
}
