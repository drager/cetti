import * as React from 'react';
import { connect } from 'react-redux';
import * as Colors from 'material-ui/lib/styles/colors';

import { DashboardConfiguration, WidgetConfiguration, WidgetType } from '../entites';

import ChartWidget from './chart-widget';
import NumberWidget from './number-widget';

const styles = Object.freeze({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: Colors.lightWhite,
  },
});

export class Dashboard extends React.Component<{configuration: DashboardConfiguration}, {}> {

  render() {
    const { widgets } = this.props.configuration;

    return (
      <div style={styles.container}>
        {widgets.map(this.renderWidget.bind(this))}
      </div>
    );
  }

  private renderWidget(widget: WidgetConfiguration, key) {
    const { grid } = this.props.configuration;

    switch (widget.type) {
      case WidgetType.chart:
        console.log(widget);
        return <ChartWidget configuration={widget} grid={grid} key={key} />;
      case WidgetType.number:
        return <NumberWidget configuration={widget} grid={grid} key={key} />;
    }

    throw new Error('Unsupported widget type');
  }
}

const mapStateToProps = state => {
  return {
    configuration: state.dashboard,
  };
};

export default connect(mapStateToProps)(Dashboard);
