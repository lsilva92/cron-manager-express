const server = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Cron Endpoints', () => {
  it('GET /api/v1/crons should show all crons', async () => {
    const res = await requestWithSupertest.get('/api/v1/crons');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('crons');
  });

  it('GET /api/v1/crons/:id should show all crons', async () => {
    const res = await requestWithSupertest.get('/api/v1/crons/1');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('cron');
  });

  it('GET /api/v1/crons/:id should not find id', async () => {
    const res = await requestWithSupertest.get('/api/v1/crons/40000');
    expect(res.status).toEqual(500);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.message).toContain(`Can't find cron with the id`);
  });
});

describe('Manage Crons', () => {
  it('POST /api/v1/crons/manageCron should start cron', async () => {
    const res = await requestWithSupertest
      .post('/api/v1/crons/manageCron')
      .send({ id: 1, command: 'start' });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toContain('started');
  });

  it('POST /api/v1/crons/manageCron should stop cron', async () => {
    const res = await requestWithSupertest
      .post('/api/v1/crons/manageCron')
      .send({ id: 1, command: 'stop' });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toContain('stopped');
  });

  it('POST /api/v1/crons/manageCron with no command should throw an error', async () => {
    const res = await requestWithSupertest
      .post('/api/v1/crons/manageCron')
      .send({ id: 1, command: '' });
    expect(res.status).toEqual(500);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.message).toContain(
      'please specify one of the following commands: start, stop'
    );
  });
});
