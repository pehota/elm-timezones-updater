module.exports = {};

const momentTZPackageName = 'moment-timezone';
const exec = require('child_process').exec;

const checkForDBUpdates = () =>
  new Promise((resolve, reject) => {
    const args = require('./util').getArgs();

    if ('force' in args) {
      resolve(!!args.force);
      return;
    }

    const momentTZ = require(momentTZPackageName).tz;
    const compareVersions = require('compare-versions');

    exec(`npm view ${momentTZPackageName} version`, (err, ver) => {
      if (err) {
        reject(err);
      } else {
        resolve(compareVersions(momentTZ.version, ver.trim()) === -1);
      }
    });
  });

const downloadDB = shouldDownloadDB =>
  new Promise((resolve, reject) => {
    if (shouldDownloadDB) {
      exec(`yarn add -D ${momentTZPackageName}@latest`, err => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    } else {
      resolve(false);
    }
  });

const loadDB = shouldLoadDB =>
  new Promise((resolve, reject) => {
    if (!shouldLoadDB) {
      resolve([]);
      return;
    }
    const tz = require(momentTZPackageName).tz;

    resolve(
      tz.names().reduce((acc, name) => {
        const zone = tz.zone(name);
        if (!zone) {
          // console.warn(`Timezone ${name} does not exist`);
          return acc;
        }
        if (zone.name.indexOf('Cairo') > -1) {
          console.log({ zone });
          throw new Error('Test');
        }
        return [
          ...acc,
          {
            name: zone.name,
            eras: zone.abbrs.map((abbr, i) => ({
              abbr,
              offset: zone.offsets[i],
              start: zone.untils[i],
            })),
          },
        ];
      }, [])
    );
  });

module.exports.checkForDBUpdates = checkForDBUpdates;
module.exports.downloadDB = downloadDB;
module.exports.loadDB = loadDB;
