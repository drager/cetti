import * as React from 'react';
import * as Colors from 'material-ui/lib/styles/colors';

import { WidgetConfiguration } from '../entites';

const styles = Object.freeze({
  widget: {
    position: 'absolute',
    backgroundColor: Colors.fullWhite,
  },
});

type Properties = {
  grid: {cols: number, rows: number},
  configuration: WidgetConfiguration,
  children?: JSX.Element|JSX.Element[],
};

export class Widget extends React.Component<Properties, {}> {

  render() {
    const { grid } = this.props;
    const { placement } = this.props.configuration;

    const top = (placement.y / grid.rows * 100) + '%';
    const left = (placement.x / grid.cols * 100) + '%';
    const width = (placement.width / grid.cols * 100) + '%';
    const height = (placement.height / grid.rows * 100) + '%';

    return (
      <div style={Object.assign({top, left, width, height}, styles.widget)}>
        {this.props.children}
      </div>
    );
  }
}
