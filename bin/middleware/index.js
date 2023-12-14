const fs = require('fs');
const path = require('path');

const kvmFile = path.resolve(__dirname, '..', 'app', 'config', '.kvm.config.json');

const {
    askUserWantsToSyncWithKV,
    getAzureCredentialsFromUser,
} = require('../app/terminal');
const {
    resetKVM,
    createConfigFile
} = require('../../utils');
const cache = require('../app/cache');

const checkConfigFileExists = () => {
    return fs.existsSync(kvmFile, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('Error getting file: ', err);
        } else {
            return true;
        }
    });
}

const checkInitConfig = async () => {
    if (!checkConfigFileExists()) {
        const credentials = await getAzureCredentialsFromUser();

        return createConfigFile(credentials);
    }

    askUserWantsToSyncWithKV();
}

const syncWithKV = () => {
    if (!userConfigFileExists) {
        return syncUsingKVMConfigFile();
    }

    syncUsingUserConfigFile();
}

module.exports = {
    _beforeCommand: (argv) => {
        switch (argv._[0]) {
            case 'init':
            case 'i':
                checkInitConfig();
                return;

            case 'sync':
                return cache.syncWithKV();

            case 'secret:get':
            case 's:g':
                return cache.getSecret();

            case 'secret:get:all':
            case 's:g:a':
                return cache.getAllSecrets();

            case 'create:config:file':
            case 'c:c:f':
                return createUserConfigFile();

            case 'reset':
                if (checkConfigFileExists()) {
                    return resetKVM();
                }

                return console.log('Nothing to reset. Module not initialized.')

            default:
                break;
        }
    }
}