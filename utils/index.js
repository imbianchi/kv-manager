const fs = require('fs').promises;
const path = require('path');
let rootPath = path.resolve(__dirname);
let filePath = path.join(rootPath, '..', 'bin', 'app', 'config', '.kvm.config.json');


module.exports = {
    createConfigFile: (credentials) => {
        fs.writeFile(
            filePath,
            JSON.stringify(credentials, null, 2),
            'utf-8',
        );
    },
    resetKVM: async () => {
        try {
            await fs.unlink(filePath);
            console.log('Cache has been cleared.');
            console.log('Credentials removed.')
            console.log('KVM Module has been reseted successfully.')
        } catch (err) {
            console.error(`Error reeting module: ${err}`);
        }
    }
}