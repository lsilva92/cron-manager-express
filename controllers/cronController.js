const fs = require('fs');
const { startJob, stopJob, stopAllJobs } = require('../utils/scheduler');
const readJsonFile = require('../utils/readJsonFile');

const getAllCrons = async (req, res, next) => {
  try {
    const crons = await readJsonFile();

    res.status(200).json({
      status: 'success',
      length: crons.length,
      crons,
    });
  } catch (error) {
    next(error);
  }
};

const createCron = async (req, res, next) => {
  try {
    const { name, schedule, command, active } = req.body;

    if (!name || !schedule || !command || !active) {
      throw new Error('Please insert the required fields');
    }

    const crons = await readJsonFile();

    //get the highest id from the array and add 1
    const id = Math.max(...crons.map((o) => o.id)) + 1;

    const newCron = {
      id,
      name,
      schedule,
      command,
      active,
    };

    crons.push({
      ...newCron,
    });

    fs.writeFile(
      `${__dirname}/.././cron-data/crons.json`,
      JSON.stringify(crons, null, 4),
      function (err) {
        if (err) throw err;
        console.log('The new cron was added to crons.json');
      }
    );

    res.status(201).json({
      status: 'success',
      newCron,
    });
  } catch (error) {
    next(error);
  }
};

const startCronbyName = async (req, res, next) => {
  try {
    const cronSchedule = req.body.cron;

    if (!cronSchedule) {
      throw new Error('Please specify a cron');
    }

    const crons = await readJsonFile();

    const cron = crons.filter((cron) => cron.name === cronSchedule);

    if (!cron.length) {
      throw new Error(`Can't find any cron with the name ${cronSchedule}`);
    }

    startJob(cron[0]);

    res.status(200).json({
      status: 'success',
      result: `New cron task ${cronSchedule} started`,
    });
  } catch (error) {
    next(error);
  }
};

const stopCronbyName = (req, res, next) => {
  try {
    const cronSchedule = req.body.cron;

    if (!cronSchedule) {
      throw new Error('Please specify a cron');
    }

    let result = stopJob(cronSchedule);

    if (result) {
      throw new Error(result);
    }

    res.status(200).json({
      status: 'success',
      result: `Cron task (${cronSchedule}) stopped`,
    });
  } catch (error) {
    next(error);
  }
};

const startAllCrons = async (req, res, next) => {
  try {
    const crons = await readJsonFile();

    crons.forEach((cron) => {
      if (cron.active) startJob(cron);
    });

    res.status(200).json({
      status: 'success',
      result: 'All Crons started',
    });
  } catch (error) {
    next(error);
  }
};

const stopAllCrons = async (req, res, next) => {
  try {
    const result = stopAllJobs();

    if (result) throw new Error(result);

    res.status(200).json({
      status: 'success',
      result: 'All Crons stopped!',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCrons,
  createCron,
  startCronbyName,
  stopCronbyName,
  startAllCrons,
  stopAllCrons,
};
