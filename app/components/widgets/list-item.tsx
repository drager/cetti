import * as React from 'react';
import { Card } from 'react-mdl';

const styles = require('./error-list-item.scss');

type Properties = {
  item: {id: string, title: string, subtitle: string}
}

export class ListItem extends React.Component<Properties, {}> {

  render() {
    const { item } = this.props;

    return (
      <Card key={item.id}>
        <div className={styles.text}>
          <h6 className={styles.header}>{item.title}</h6>
          <span className={styles.date}>{item.subtitle}</span>
        </div>
      </Card>
    );
  }
}
