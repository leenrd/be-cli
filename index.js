#!/usr/bin/env node

import inquirer from 'inquirer';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import 'colors';
import createDirectoryContents from './createDirectoryContents.js';
// eslint-disable-next-line no-undef
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: '> What project template would you like to generate?'.blue,
    choices: CHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: '🦖 Project name:',

    validate: function (input) {
      if (input === '.' || /^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else
        return '⚠️ Project name may only include letters, numbers, underscores and hashes.'
          .red;
    },
  },
];

inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];
  const templatePath = `${__dirname}/templates/${projectChoice}`;

  if (projectName !== '.') {
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  }

  console.log(' ');
  console.log('Assembling project scaffold...'.blue);
  console.log('Creating project directory...'.blue);
  createDirectoryContents(templatePath, projectName);
  console.log('-----------------------------------------------------------');
  console.log('Project scaffold created!'.rainbow, projectName.blue);
  console.log(' ');
  console.log('Run the following commands to get started:'.blue);
  console.log(' ');
  console.log('     npm install'.green);
  console.log('     npm run'.green);
  console.log(' ');
});
