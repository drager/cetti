import * as React from 'react';
import { connect } from 'react-redux';
import * as Colors from 'material-ui/lib/styles/colors';
import * as Typography from 'material-ui/lib/styles/typography';
import { Avatar, Card, CardActions, CardHeader, FontIcon } from 'material-ui';

import { Activity } from '../entites';

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
});

export class Stream extends React.Component<{activities: Activity[]}, {}> {

  render() {
    return (
      <div>
        {this.renderError()}
      </div>
    );
  }

  private renderError() {
    return this.props.activities.map((error) => {
          return (
              <Card key={error.id}>
                <CardHeader
                  title={error.title}
                  subtitle={error.timeOfOccurence}
                  avatar={<Avatar style={styles.avatar}>{error.timesOccurred}</Avatar>} />
                <CardActions>
                  <IconButton hoverColor='transparent'>
                    <FontIcon className='material-icons' style={styles.doneIcon}>done</FontIcon>
                  </IconButton>
                </CardActions>
              </Card>
          );
    });
  }
}

const mapStateToProps = state => {
  return {
    activities: state.activities
  };
};

export default connect(mapStateToProps)(Stream);
