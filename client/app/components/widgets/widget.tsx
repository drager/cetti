import * as React from 'react';
import { Card } from 'react-mdl';
import { Link } from 'react-router';

import { WidgetConfiguration } from 'common/lib/entites';
import { classNames } from '../../lib/helpers';

const styles = require('./widget.scss');
const globalStyles = require('../../style/definitions.scss');
const padding = 16;

type Properties = {
  grid: {cols: number, rows: number},
  configuration: WidgetConfiguration<any>,
  children?: JSX.Element|JSX.Element[],
};

export class Widget extends React.Component<Properties, {}> {

  render() {
    const { children, grid } = this.props;
    const { dashboard, placement, title } = this.props.configuration;

    const top = `calc(${placement.y / grid.rows * 100}% + ${padding / 2}px)`;
    const left = `calc(${placement.x / grid.cols * 100}% + ${padding / 2}px)`;
    const width = `calc(${placement.width / grid.cols * 100}% - ${padding}px)`;
    const height = `calc(${placement.height / grid.rows * 100}% - ${padding}px)`;

    const card = (
      <Card shadow={0} style={{top, left, width, height}}>
        {title && <h4 className={styles.title}>{title}</h4>}
        <div className={classNames(globalStyles.grow, globalStyles.relative)}>
          <div className={globalStyles.fill}>
            {children}
          </div>
        </div>
      </Card>
    );

    return dashboard
      ? <Link to={`/${dashboard}`}>{card}</Link>
      : card;
  }
}
