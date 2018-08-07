import { filter, find, slice, findIndex } from 'lodash';

import { fetchFilter } from '../../lib/github';

export const filters = {
  state: [
    {
      id: 0,
      label: 'Botify PR - Mine',
      data: [],
      fields: {
        type: 'pr',
        repo: 'botify-hq/botify-report',
        author: 'rgehan',
        archived: 'false',
        is: 'open',
      },
    },
    {
      id: 1,
      label: 'Botify PR - To Review',
      data: [],
      fields: {
        type: 'pr',
        repo: 'botify-hq/botify-report',
        '-author': 'rgehan',
        archived: 'false',
        is: 'open',
        label: ['PR: Review Todo'],
      },
    },
    {
      id: 2,
      label: 'Laravel issues',
      data: [],
      fields: {
        type: 'issue',
        repo: 'laravel/framework',
        is: 'open',
        archived: 'false',
      },
    },
  ],
  reducers: {
    addFilter(state, filter) {
      return [...state.filters, filter];
    },
    removeFilter(state, { id }) {
      return filter(state, filter => filter.id !== id);
    },
    updateFilterData(state, { id, data }) {
      const filterIndex = findIndex(state, { id });

      return [
        ...slice(state, 0, filterIndex),
        {
          ...state[filterIndex],
          data,
        },
        ...slice(state, filterIndex + 1),
      ];
    }
  },
  effects: dispatch => ({
    async fetchFilter({ filterId }, rootState) {
      const filter = find(rootState.filters, { id: filterId });
      const data = await fetchFilter(filter.fields);
      dispatch.filters.updateFilterData({ id: filter.id, data });
    }
  }),
};