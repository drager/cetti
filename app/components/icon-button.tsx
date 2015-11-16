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
    minWidth: 48,
  },
});

type Properties = {
  children?: JSX.Element,
  hoverColor?: string,
  onClick?: React.MouseEventHandler,
  style?: React.CSSProperties,
}

export class IconButton extends React.Component<Properties, {}> {

  render() {
    return (
      <FlatButton style={Object.assign({}, styles.container, this.props.style)}
                  hoverColor={this.props.hoverColor}
                  onClick={this.props.onClick}>
        <div style={styles.iconButton}>
          {this.props.children}
        </div>
      </FlatButton>
    );
  }
}
