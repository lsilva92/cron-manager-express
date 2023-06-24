const CronJob = require('cron').CronJob;
const shelljs = require('shelljs');

let cronJobs = [];

const startJob = (cron) => {
  shelljs.cd(`${__dirname}/../jobs`);
  const job = new CronJob(
    cron.schedule,
    function () {
      shelljs.exec(cron.command);
    },
    null,
    true,
    null,
    cron.name
  );
  cronJobs.push(job);
};

const stopJob = (cronSchedule) => {
  let result = null;

  if (!cronJobs.length) {
    return (result = `There are no Job's running`);
  }

  const job = cronJobs.filter((cron) => cron.context === cronSchedule);

  if (!job.length || !job[0].running) {
    return (result = `There is no job with the name ${cronSchedule} running`);
  }

  job[0].stop();

  return result;
};

const stopAllJobs = () => {
  if (!cronJobs.length) {
    return (result = `There are no Job's running`);
  }

  cronJobs.forEach((job) => job.stop());
};

module.exports = {
  startJob,
  stopJob,
  stopAllJobs,
};
