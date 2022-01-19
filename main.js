import * as core from '@actions/core';
import * as jwt from 'jsonwebtoken';

async function generateToken() {
  try {
    const secret = core.getInput('secret');
    const payload = core.getInput('payload');
    const expiry = core.getInput('expiry');

    const token = jwt.sign(JSON.parse(payload), secret, { expiresIn: expiry });

    core.setOutput('access_token', token);
  } catch (error) {
    core.setFailed(error.message);
  }
}

generateToken();
