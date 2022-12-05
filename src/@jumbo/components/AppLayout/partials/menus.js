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
    ],
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'Home'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
  {
    name: <IntlMessages id={'Department'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'Add Department'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/department/department-new',
      },
      {
        name: <IntlMessages id={' Department List'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/department/department-list',
      },
    ],
  },
];
