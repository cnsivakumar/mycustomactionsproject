import { exec } from 'child_process';
import { promisify } from 'util';
import * as core from '@actions/core';

const execAsync = promisify(exec);

async function run() {
  try {
    core.startGroup('Running ESLint');
    await execAsync('npm run lint');
    core.endGroup();

    core.startGroup('Running Vitest');
    await execAsync('npm run test');
    core.endGroup();

    core.info('Code quality checks passed.');
  } catch (error) {
    core.setFailed(`Check failed: ${error.message}`);
  }
}

run();
