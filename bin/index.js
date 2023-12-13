#!/usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
yargs(hideBin(process.argv));

const init = require('./commands/init');
const secrets = require('./commands/secrets');

const { _beforeCommand } = require('./middleware');

yargs
    .help()
    .middleware((argv) => _beforeCommand(argv))
    .command({
        command: 'init',
        describe: "Initializes KVM module",
        aliases: ['i'],
        handler: () => init(),
    })
    .command({
        command: 'secret:get:all',
        describe: "Retrieve all secrets",
        aliases: ['s:g:a'],
        handler: () => secrets.getAll(),
    })
    .command({
        command: 'secret:get <secret>',
        describe: "Retrieve a specific secret",
        aliases: ['s:g'],
        builder: {
            secret: {
                describe: 'Specify secret name',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => secrets.get(argv.secret),
    })
    .command({
        command: 'secret:add <secret> <value>',
        describe: "Register a new secret in Azure KV",
        aliases: ['s:a'],
        builder: {
            secret: {
                describe: 'Specify secret name',
                demandOption: true,
                type: 'string'
            },
            value: {
                describe: 'Specify secret value',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => secrets.add(argv.secret, argv.value),
    })
    .command({
        command: 'secret:remove <secret>',
        describe: "Remove for good a specific secret from Azure KV",
        aliases: ['s:r'],
        handler: (argv) => secrets.remove(argv.secret),
    })
    .command({
        command: 'secrets:remove:all',
        describe: "Remove all secrets from Azure KV for good.",
        aliases: ['s:r:a'],
        handler: () => secrets.removeAll(),
    })
    .alias('v', 'version')
    .alias('h', 'help')
    .version()
    .wrap(yargs.terminalWidth() * 70 / 100)
    .demandCommand(1, 'Please specify a command')
    .help()
    .strict()
    .recommendCommands().argv;


