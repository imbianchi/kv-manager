const { Select, prompt } = require('enquirer');
const { syncWithKV } = require('../cache');


module.exports = {
    askUserWantsToSyncWithKV: () => {
        const prompt = new Select({
            message: 'KVM already initiated. Do you want to synchronize with Azure?',
            choices: ['yes', 'no'],
        });

        prompt.run()
            .then(answer => {
                if (answer == 'yes') {
                    syncWithKV();
                }
            })
            .catch(console.error);
    },
    getAzureCredentialsFromUser: () => {
        return prompt([
            {
                type: 'password',
                name: 'clientId',
                message: 'Enter Azure Client ID:',
            },
            {
                type: 'password',
                name: 'keyVaultSecret',
                message: 'Enter Azure Key Vault Secret:',
            },
            {
                type: 'input',
                name: 'keyVaultUri',
                message: 'Enter Azure Key Vault URI:',
            },
            {
                type: 'input',
                name: 'keyVaultName',
                message: 'Enter Key Vault Name:',
            },
        ]);
    }
}