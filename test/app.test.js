const request = require('supertest')
const { describe, test, expect } = require('@jest/globals');

const app = require('../server');

const userRegistrationData = {
  email : "test12@qqq.com",
  password : "111111"
}


const userWithNotExistingData = {
  email : "doesnot@exist.com",
  password : "doesnotexist"
}

describe('resister /users', () => {
  test('valid registration', async () => {
    const response = await request(app).post('/api/users/register').send(userRegistrationData);
    const { statusCode, body } = response;
    expect(statusCode)
      .toBe(201);
    expect(body.data)
      .toHaveProperty('user');
    
    const { user } = body.data;

    expect(user)
      .toHaveProperty(['email']);
    expect(user)
      .toHaveProperty(['subscription']);
      expect(typeof user.subscription).toBe('string')
  });

  test('registration with existing data', async () => {
    const response = await request(app).post('/api/users/register').send(userRegistrationData);
    const { statusCode } = response;
    expect(statusCode)
      .toBe(409);
  });

  test('login with existing data', async () => {
    const response = await request(app).post('/api/users/login').send(userRegistrationData);
    const { statusCode } = response;
    expect(statusCode)
      .toBe(200);
  });

  test('login with not existing data', async () => {
    const response = await request(app).post('/api/users/login').send(userWithNotExistingData);
    const { statusCode } = response;
    expect(statusCode)
      .toBe(401);
  });

})
