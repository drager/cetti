import { ActivityItem } from './activity-item';
import * as React from 'react';
import { connect } from 'react-redux';

import { Activity } from '../entites';
import * as Actions from '../actions/activity';

type Properties = {
  activities: Activity[],
  markAsResolved: (activity: Activity) => void,
}

export class ActivityList extends React.Component<Properties, {}> {

  render() {
    return (
      <div>
        {this.renderActivity()}
      </div>
    );
  }

  private renderActivity() {
    return this.props.activities.map((activity) => {
        if (!activity.resolved) {
          return (
              <div key={activity.id}>
                <ActivityItem activity={activity}
                              markAsResolved={this.props.markAsResolved}
                              />
              </div>
          );
        }
    });
  }
}

const mapStateToProps = state => {
  return {
    activities: state.activities,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    markAsResolved: (activity) => {
      dispatch(Actions.markAsResolved(activity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
