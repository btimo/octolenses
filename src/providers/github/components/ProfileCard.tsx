import cx from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';

import { GithubProfile } from '..';
import { settingsStore } from '../../../store';

interface IProps {
  profile: GithubProfile;
}

export const ProfileCard = observer(({ profile }: IProps) => {
  if (!profile) {
    return null;
  }

  return (
    <div className="flex mb-8">
      <div
        className={cx(
          'w-16 h-16 rounded-full overflow-hidden mr-3',
          settingsStore.isDark ? 'bg-gray-700' : 'bg-gray-400'
        )}
      >
        <img src={profile.avatar_url} />
      </div>
      <div className="pt-2">
        <div
          className={settingsStore.isDark ? 'text-gray-300' : 'text-gray-800'}
        >
          {profile.name}
        </div>
        <a
          href={profile.html_url}
          target="__blank"
          className="text-sm text-gray-600 mt-1"
        >
          @{profile.login}
        </a>
      </div>
    </div>
  );
});
