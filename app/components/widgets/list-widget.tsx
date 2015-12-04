import * as React from 'react';

import {
  BucketCollection,
  ListType,
  ListWidgetConfiguration,
  WidgetConfiguration,
} from '../../lib/entites';
import { stateful } from '../../redux/helpers';

import { ListItem } from './list-item';
import { ErrorListItem } from './error-list-item';
import { Widget } from './widget';

type Properties = {
  grid: {cols: number, rows: number},
  configuration: WidgetConfiguration<ListWidgetConfiguration>,
  key?: any,
};

type State = {
  buckets?: BucketCollection,
};

const type = {
  [ListType.error]: ErrorListItem,
  [ListType.generic]: ListItem,
};

@stateful(state => ({buckets: state.buckets}))
export class ListWidget extends React.Component<Properties, State> {

  getListData(): any[] {
    const {filter, subtitle, title, type} = this.props.configuration.typeConfiguration;
    let dataPoints = this.state.buckets[this.props.configuration.bucket];

    if (filter) {
      dataPoints = dataPoints.filter(filter);
    }

    if (type === ListType.error) {
      return dataPoints;
    }

    const listItems = dataPoints.map(dataPoint => {
      let titleString, subtitleString;

      if (typeof title === 'function') {
        titleString = title(dataPoint);
      } else {
        titleString = dataPoint.value[title as string];
      }

      if (subtitle) {
        if (typeof subtitle === 'function') {
          subtitleString = subtitle(dataPoint);
        } else {
          subtitleString = dataPoint.value[subtitle as string];
        }
      }

      return {id: dataPoint.id, title: titleString, subtitle: subtitleString};
    });

    return listItems;
  }

  render() {
    const { configuration, grid } = this.props;

    return (
      <Widget grid={grid} configuration={configuration}>
        {this.getListData().map(this.renderItem.bind(this))}
      </Widget>
    );
  }

  private renderItem(item) {
    const ListItem = type[this.props.configuration.typeConfiguration.type];

    if (!ListItem) {
      throw new Error('Unsupported list type');
    }

    return (
      <div key={item.id}>
        <ListItem item={item} bucket={this.props.configuration.bucket} />
      </div>
    );
  }
}
