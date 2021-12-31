import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Dashboard = Loader(lazy(() => import('src/tennis-table/dashboard')));
const Players = Loader(lazy(() => import('src/tennis-table/player/players')));
const Games = Loader(lazy(() => import('src/tennis-table/games/allgames')));
const Ranking = Loader(lazy(() => import('src/tennis-table/scores/ranking')));

const NewGame = Loader(lazy(() => import('src/tennis-table/games/new-game')));
const NewPlayer = Loader(lazy(() => import('src/tennis-table/player/new-player')));

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },{
    path: '*',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: 'home',
        element: <Navigate to="/" replace />
      },
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboards/players" replace />
      },
      {
        path: 'players',
        element: <Players />
      },
      {
        path: 'games',
        element: <Games />
      },
      {
        path: 'ranking',
        element: <Ranking />
      }
    ]
  },
  {
    path: 'admin',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        // element: <Navigate to="/dashboards/players" replace />
      },
      {
        path: 'newplayer',
        element: <NewPlayer />
      },
      {
        path: 'newgame',
        element: <NewGame />
      }
    ]
  }
];

export default routes;
