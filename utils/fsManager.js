const fs = require('fs');
module.exports = (crons, message) => {
  fs.writeFile(
    `${__dirname}/.././cron-data/crons.json`,
    JSON.stringify(crons, null, 4),
    function (err) {
      if (err) throw err;
      console.log(message);
    }
  );
};
