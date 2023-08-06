const fs = require('fs');
const { startJob, stopJob, stopAllJobs } = require('../utils/scheduler');
const readJsonFile = require('../utils/readJsonFile');
const cronsWriteFile = require('../utils/fsManager');

const getAllCrons = async (req, res, next) => {
  try {
    const crons = await readJsonFile();

    res.status(200).json({
      success: true,
      length: crons.length,
      crons,
    });
  } catch (error) {
    next(error);
  }
};

const getCronById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const crons = await readJsonFile();

    const cron = crons.filter((cron) => cron.id === parseInt(id));

    if (!cron.length) throw new Error(`Can't find cron with the id ${id}`);

    res.status(200).json({
      success: true,
      cron,
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

    cronsWriteFile(crons, 'The new cron was added to crons.json');

    res.status(201).json({
      success: true,
      newCron,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCron = async (req, res, next) => {
  try {
    const { id } = req.params;
    const crons = await readJsonFile();

    if (crons.findIndex((cron) => cron.id === parseInt(id)) === -1)
      throw new Error(`Can't find cron with the id ${id}`);

    const filteredCrons = crons.filter((cron) => cron.id !== parseInt(id));

    cronsWriteFile(filteredCrons);

    res.status(200).json({
      success: true,
      result: `Cron with the id ${id} deleted`,
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
      success: true,
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
      success: true,
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
      success: true,
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
      success: true,
      result: 'All Crons stopped!',
    });
  } catch (error) {
    next(error);
  }
};

const changeCronStatus = async (req, res, next) => {
  try {
    const { cronId, status } = req.body;

    if (!cronId) throw new Error('Please specify the cronId');
    if (typeof status !== 'boolean')
      throw new Error(`Please specify a status 'true' or 'false'`);

    const crons = await readJsonFile();

    const cronIndex = crons.findIndex((cron) => cron.id === cronId);

    if (crons[cronIndex].active !== status) {
      crons[cronIndex].active = status;
    } else {
      throw new Error(`Cron already ${status ? 'active' : 'disable'}`);
    }

    cronsWriteFile(crons, `Cron ${crons[cronIndex].name} updated`);

    res.status(200).json({
      success: true,
      cron: crons[cronIndex],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCrons,
  getCronById,
  createCron,
  deleteCron,
  startCronbyName,
  stopCronbyName,
  startAllCrons,
  stopAllCrons,
  changeCronStatus,
};
