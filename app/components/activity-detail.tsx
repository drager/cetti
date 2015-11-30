import * as React from 'react';
import * as Colors from 'material-ui/lib/styles/colors';
import * as Typography from 'material-ui/lib/styles/typography';
import { connect } from 'react-redux';

//import { Activity } from '../entites';
import { fontStyles, layoutStyles } from '../styles';

const styles = Object.freeze({
  container: {
    flex: 1,
  },
  header: {
    padding: 8,
    display: 'flex',
    borderBottom: '1px solid ' + Colors.grey300,
    height: 200,
  },
  heading: Object.assign({
    color: Colors.fullBlack,
    fontWeight: Typography.fontWeightLight,
    margin: 0,
    padding: 8,
  }, fontStyles.title),
  occurredLabel: Object.assign({
    display: 'flex',
    alignItems: 'center',
  }, layoutStyles.column),
  timesOccurred: {
    fontWeight: Typography.fontWeightLight,
    fontSize: 64,
  },
  stackframe: {
    fontFamily: 'Consolas, monospace',
  },
});

class ActivityDetail extends React.Component<{params: {id: string}}, {}> {

  render() {
    const { params } = this.props;
    //const activity = activities[params.id];
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h2 style={styles.heading}>{'activity.title'}</h2>
        </header>
        <div style={styles.stackframe}>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activities: state.activities,
  };
};

export default connect(mapStateToProps)(ActivityDetail);
