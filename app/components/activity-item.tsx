import * as React from 'react';
import * as Colors from 'material-ui/lib/styles/colors';
import * as Typography from 'material-ui/lib/styles/typography';
import { Avatar, Card, CardHeader, FontIcon } from 'material-ui';

import { DataPoint, ErrorMessage } from '../entites';
import { layoutStyles } from '../lib/styles';

import { IconButton } from './icon-button';

const styles = Object.freeze({
  avatar: {
    backgroundColor: Colors.red500,
    color: Colors.fullWhite,
    fontWeight: Typography.fontWeightLight,
    flexShrink: 0,
  },
  doneIcon: {
    fontSize: 32,
    display: 'flex',
    color: Colors.green500,
  },
  header: {
    alignItems: 'center',
    display: 'flex',
  },
});

type Properties = {
  activity: DataPoint<ErrorMessage>,
  markAsResolved: (activity: DataPoint<ErrorMessage>) => void,
}

export class ActivityItem extends React.Component<Properties, {}> {

  render() {
    const { activity } = this.props;

    const format = new Intl.DateTimeFormat('sv-SE', {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
    });

    return (
      <Card key={activity.id}>
        <CardHeader style={styles.header}
          title={activity.value.message}
          subtitle={format.format(new Date(activity.timestamp))}
          avatar={<Avatar style={styles.avatar}>{1}</Avatar>}>
            <span style={layoutStyles.flex} />
            <IconButton hoverColor='transparent'
                        onClick={(e) => {
                          e.preventDefault();
                          this.props.markAsResolved(activity);
                        }}>
              <FontIcon className='material-icons' style={styles.doneIcon}>done</FontIcon>
            </IconButton>
        </CardHeader>
      </Card>
    );
  }
}
