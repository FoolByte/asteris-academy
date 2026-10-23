import * as migration_20261019_214752 from './20261019_214752';
import * as migration_20261019_214948 from './20261019_214948';
import * as migration_20261020_162623 from './20261020_162623';
import * as migration_20261021_091536 from './20261021_091536';
import * as migration_20261021_122917 from './20261021_122917';
import * as migration_20261022_142638 from './20261022_142638';

export const migrations = [
  {
    up: migration_20261019_214752.up,
    down: migration_20261019_214752.down,
    name: '20261019_214752',
  },
  {
    up: migration_20261019_214948.up,
    down: migration_20261019_214948.down,
    name: '20261019_214948',
  },
  {
    up: migration_20261020_162623.up,
    down: migration_20261020_162623.down,
    name: '20261020_162623',
  },
  {
    up: migration_20261021_091536.up,
    down: migration_20261021_091536.down,
    name: '20261021_091536',
  },
  {
    up: migration_20261021_122917.up,
    down: migration_20261021_122917.down,
    name: '20261021_122917',
  },
  {
    up: migration_20261022_142638.up,
    down: migration_20261022_142638.down,
    name: '20261022_142638'
  },
];
