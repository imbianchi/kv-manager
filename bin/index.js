#!/usr/bin/env node

const yarg = require('yargs');
const { init } = require('./commands/init');
const keys = require('./commands/keys');

const { _beforeCommand } = require('./middleware');


const yargs = yarg();

yargs
    .help()
    .version()
    .command('get:key', 'Drop database specified by configuration', _beforeCommand(), keys.get())
    .command('delete:key', 'Initializes project', _beforeCommand(), keys.delete())
    .command('init', 'Initializes module.', _beforeCommand(), init())
    .command('add:key', 'Initializes migrations', _beforeCommand(), keys.add())
    .wrap(yargs.terminalWidth())
    .demandCommand(1, 'Please specify a command')
    .help()
    .strict()
    .recommendCommands().argv;

