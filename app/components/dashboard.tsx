import * as React from 'react';
import * as Colors from 'material-ui/lib/styles/colors';

import {
  DashboardsConfiguration,
  WidgetConfiguration,
  WidgetType,
} from '../lib/entites';
import { stateful } from '../redux/helpers';

import { ChartWidget } from './chart-widget';
import { ErrorListWidget } from './error-list-widget';
import { NumberWidget } from './number-widget';

const styles = Object.freeze({
  container: {
    position: 'relative',
    margin: 4,
    flex: 1,
    backgroundColor: Colors.lightWhite,
  },
});

const type = {
  [WidgetType.chart]: ChartWidget,
  [WidgetType.errorList]: ErrorListWidget,
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
      <div style={styles.container}>
        {widgets.map(this.renderWidget.bind(this, grid))}
      </div>
    );
  }

  private renderWidget(grid, widget: WidgetConfiguration, key) {
    const WidgetComponent = type[widget.type];

    if (!WidgetComponent) {
      throw new Error('Unsupported widget type');
    }

    return <WidgetComponent configuration={widget} grid={grid} key={key} />;
  }
}
