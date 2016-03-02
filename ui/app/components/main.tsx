import * as React from 'react';
import { Layout, Content, Drawer, Navigation } from 'react-mdl';
import { Link } from 'react-router';

import { DashboardsConfiguration } from 'cetti-common/lib/entites';
import { classNames } from '../lib/helpers';
import { stateful } from '../lib/store';

const styles = require('./main.scss');

type Properties = {
  children: JSX.Element,
  dashboards: DashboardsConfiguration,
  params: {id: string},
};

type State = {
  dashboards: DashboardsConfiguration,
};

@stateful(state => ({dashboards: state.dashboards}))
export class Main extends React.Component<Properties, State> {

  render() {
    const { dashboards } = this.state;
    const { params } = this.props;

    return (
      <Layout fixedDrawer>
        <Drawer title='Cetti'>
          <Navigation>
            {Object.entries(dashboards).map(([id, dashboard]) =>
              <Link to={`/${id}`} key={id}
                    className={classNames(styles.navLink, id === params.id && styles.active)}>
                {dashboard.name}
              </Link>
            )}
          </Navigation>
        </Drawer>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}
