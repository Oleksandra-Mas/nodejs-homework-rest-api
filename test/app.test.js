const request = require('supertest');
const {
  describe,
  test,
  expect,
  afterEach,
  afterAll,
} = require('@jest/globals');
const { deleteUserByEmail } = require('../service/user');
const { app, closeConnection } = require('../server');
const {
  userRegistrationData,
  userWithNotExistingData,
} = require('./userTestData');

describe('resister /users', () => {
  test('valid registration', async () => {
    const registrationResponse = await request(app)
      .post('/api/users/register')
      .send(userRegistrationData);
    const { statusCode, body } = registrationResponse;
    expect(statusCode).toBe(201);
    expect(body.data).toHaveProperty('user');

    const { user } = body.data;

    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('subscription');
    expect(user).toHaveProperty('verificationToken');
    expect(typeof user.subscription).toBe('string');

    const verificationResponse = await request(app)
      .get(`/api/users/verify/${user.verificationToken}`)
      .send(userRegistrationData);
    expect(verificationResponse.statusCode).toBe(200);
  });

  test('registration with existing data', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send(userRegistrationData);
    const { statusCode } = response;
    expect(statusCode).toBe(409);
  });

  test('login with existing data', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send(userRegistrationData);
    const { statusCode } = response;
    expect(statusCode).toBe(200);
  });

  test('login with not existing data', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send(userWithNotExistingData);
    const { statusCode } = response;
    expect(statusCode).toBe(401);
  });
});

afterEach((done) => {
  done();
});

afterAll(async () => {
  await deleteUserByEmail(userRegistrationData.email);
  closeConnection();
});
