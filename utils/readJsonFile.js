const fs = require('fs');
module.exports = async () => {
  let crons = await fs.promises.readFile(
    `${__dirname}/.././cron-data/crons.json`,
    'utf8'
  );

  return JSON.parse(crons);
};
