import * as React from 'react';

import * as Colors from 'material-ui/lib/styles/colors';
import * as Typography from 'material-ui/lib/styles/typography';
import { Avatar, Card, CardHeader } from 'material-ui';

const styles = Object.freeze({
  avatar: {
    backgroundColor: Colors.red500,
    color: Colors.fullWhite,
    fontWeight: Typography.fontWeightLight,
  },
});

export class Stream extends React.Component<{}, {}> {
  private error: [{
    title: string,
    timesOccurred: number,
    timeOfOccurence: string,
  }];

  constructor() {
    super();

    this.error = [
      {
        title: `./app/components/card-list.tsx
                (9,3): error TS2377: Constructors for derived classes must contain a 'super' call.`,
        timesOccurred: 5,
        timeOfOccurence: '2015-11-10 09:39:42',
      },
      {
        title: `./app/components/card-list.tsx(54,43): error TS1005: ':' expected.`,
        timesOccurred: 1,
        timeOfOccurence: '2015-11-10 10:59:22',
      },
    ];
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title={this.error[0].title}
            subtitle={this.error[0].timeOfOccurence}
            avatar={<Avatar style={styles.avatar}>{this.error[0].timesOccurred}</Avatar>}/>
        </Card>
        <Card>
          <CardHeader
            title={this.error[1].title}
            subtitle={this.error[1].timeOfOccurence}
            avatar={<Avatar style={styles.avatar}>{this.error[1].timesOccurred}</Avatar>}/>
        </Card>
      </div>
    );
  }
}
