import * as React from 'react';
import { Card } from 'react-mdl';

import { WidgetConfiguration } from '../lib/entites';

const padding = 16;
const styles = Object.freeze({
  widget: {
    position: 'absolute',
    minHeight: 0,
  },
  title: {
    margin: 0,
    padding: 16,
    color: 'rgba(0, 0, 0, 0.7)',
  },
});

type Properties = {
  grid: {cols: number, rows: number},
  configuration: WidgetConfiguration,
  children?: JSX.Element|JSX.Element[],
};

export class Widget extends React.Component<Properties, {}> {

  render() {
    const { children, grid } = this.props;
    const { placement, title } = this.props.configuration;

    const top = `calc(${placement.y / grid.rows * 100}% + ${padding / 2}px)`;
    const left = `calc(${placement.x / grid.cols * 100}% + ${padding / 2}px)`;
    const width = `calc(${placement.width / grid.cols * 100}% - ${padding}px)`;
    const height = `calc(${placement.height / grid.rows * 100}% - ${padding}px)`;

    return (
      <Card shadow={0} style={Object.assign({top, left, width, height}, styles.widget)}>
        {title && <h3 style={styles.title}>{title}</h3>}
        {children}
      </Card>
    );
  }
}
