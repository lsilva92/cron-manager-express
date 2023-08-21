const CronJob = require('cron').CronJob;
const shelljs = require('shelljs');

let cronJobs = [];

const startJob = (cron) => {
  const isJobRunning = cronJobs.some(
    (cronJob) => cronJob.context === cron.name
  );

  if (isJobRunning) return { error: `Job ${cron.name} already running!` };

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

  return `Job ${cron.name} started`;
};

const stopJob = (cronSchedule) => {
  if (!cronJobs.length) {
    return { error: `There are no Job's running` };
  }

  const job = cronJobs.filter((cron) => cron.context === cronSchedule);

  if (!job.length || !job[0].running) {
    return { error: `There is no job with the name ${cronSchedule} running` };
  }

  job[0].stop();

  return `Job ${cronSchedule} stopped`;
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
