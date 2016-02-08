import * as React from 'react';

import {
  DashboardsConfiguration,
  ListWidgetConfiguration,
  WidgetConfiguration,
  WidgetType,
} from '../lib/entites';
import { stateful } from '../redux/helpers';

import { ChartWidget } from './widgets/chart-widget';
import { ListWidget } from './widgets/list-widget';
import { NumberWidget } from './widgets/number-widget';

const styles = require('./dashboard.scss');

const type = {
  [WidgetType.chart]: ChartWidget,
  [WidgetType.list]: ListWidget,
  [WidgetType.number]: NumberWidget,
};

type State = {
  dashboards: DashboardsConfiguration,
}

type Properties = {
  params: {id: string}
}

@stateful(state => ({dashboards: state.dashboards}))
export class Dashboard extends React.Component<Properties, State> {

  render() {
    const configuration = this.state.dashboards[this.props.params.id];
    const { grid, widgets } = configuration;

    return (
      <div className={styles.container}>
        {widgets.map(this.renderWidget.bind(this, grid))}
      </div>
    );
  }

  private renderWidget(grid, widget: WidgetConfiguration<ListWidgetConfiguration>, key) {
    const WidgetComponent = type[widget.type];

    if (!WidgetComponent) {
      throw new Error('Unsupported widget type');
    }

    return <WidgetComponent configuration={widget} grid={grid} key={key} />;
  }
}
