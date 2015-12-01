import * as Colors from 'material-ui/lib/styles/colors';
import radium from 'radium';
import * as React from 'react';
import { Layout, Content, Drawer, Navigation } from 'react-mdl';
import { Link as RouterLink } from 'react-router';

import { DashboardsConfiguration } from '../lib/entites';
import { stateful } from '../redux/helpers';

const Link = radium(RouterLink);

const styles = Object.freeze({
  content: {
    display: 'flex',
    backgroundColor: Colors.grey100,
  },
  drawer: {
    display: 'flex',
    color: Colors.lightWhite,
    backgroundColor: Colors.blueGrey900,
  },
  navigation: {
    flexGrow: 1,
    backgroundColor: Colors.blueGrey800,
  },
  navLink: {
    color: Colors.lightWhite,

    active: {
      color: Colors.cyan300,
      backgroundColor: Colors.blueGrey700,
    },

    ':hover': {
      color: Colors.blueGrey800,
      backgroundColor: Colors.cyan500,
    },
  },
});

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
        <Drawer title='Cetti' style={styles.drawer}>
          <Navigation style={styles.navigation}>
            {Object.entries(dashboards).map(([id, dashboard]) =>
              <Link to={`/${id}`} key={id}
                    style={[styles.navLink, (id === params.id && styles.navLink.active)]}>
                {dashboard.name}
              </Link>
            )}
          </Navigation>
        </Drawer>
        <Content style={styles.content}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}
