import * as React from 'react';
import * as Colors from 'material-ui/lib/styles/colors';
import * as Typography from 'material-ui/lib/styles/typography';
import { Avatar, Card, CardHeader, FontIcon } from 'material-ui';

import { Activity } from '../entites';
import { layoutStyles } from '../styles';

import { IconButton } from './icon-button';

const styles = Object.freeze({
  avatar: {
    backgroundColor: Colors.red500,
    color: Colors.fullWhite,
    fontWeight: Typography.fontWeightLight,
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
  activity: Activity,
  markAsResolved: (activity: Activity) => void,
}

export class ActivityItem extends React.Component<Properties, {}> {

  render() {
    const { activity } = this.props;

    return (
      <Card key={activity.id}>
        <CardHeader style={styles.header}
          title={activity.title}
          subtitle={activity.timeOfOccurence}
          avatar={<Avatar style={styles.avatar}>{activity.timesOccurred}</Avatar>}>
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
