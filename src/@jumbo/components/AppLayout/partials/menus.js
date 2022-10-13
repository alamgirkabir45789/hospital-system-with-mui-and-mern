import { PostAdd } from '@material-ui/icons';
import React from 'react';
import IntlMessages from '../../../utils/IntlMessages';

export const sidebarNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
      {
        name: <IntlMessages id={'Test Page'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/test-page',
      },
    ],
  },
];

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
      {
        name: <IntlMessages id={'Test Page'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/test-page',
      },
    ],
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
      {
        name: <IntlMessages id={'Test Page'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/test-page',
      },
    ],
  },
];
