import cx from 'classnames';
import { partition } from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import { settingsStore } from '../../store';
import { SETTINGS_VIEWS, SettingView } from './SettingsModal';

const Wrapper = styled.div`
  width: 200px;
  font-family: Roboto;
  padding-right: 30px;
  flex-shrink: 0;
`;

const ItemHeader = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1em;
  padding-left: 12px;
  margin-bottom: 14px;
`;

const Item = styled.div`
  font-size: 18px;
  padding: 6px;
  padding-left: 12px;
  margin-bottom: 10px;
  cursor: pointer;
`;

interface IProps {
  selectedTab: string;
  selectTab: Function;
}

export const Sidebar = observer(({ selectedTab, selectTab }: IProps) => {
  const [providerItems, staticItems] = partition(SETTINGS_VIEWS, 'isProvider');

  function renderItems(items: SettingView[]) {
    return items.map(({ label, id }) => (
      <Item
        key={id}
        onClick={() => selectTab(id)}
        className={cx(
          selectedTab === id && 'text-white bg-blue-500 font-medium rounded',
          settingsStore.isDark && 'text-gray-300'
        )}
        data-setting-tab={label}
      >
        {label}
      </Item>
    ));
  }

  const headerClass = settingsStore.isDark ? 'text-gray-600' : 'text-gray-500';

  return (
    <Wrapper>
      <ItemHeader className={headerClass}>Settings</ItemHeader>
      {renderItems(staticItems)}
      <ItemHeader className={cx('mt-10', headerClass)}>Providers</ItemHeader>
      {renderItems(providerItems)}
    </Wrapper>
  );
});
