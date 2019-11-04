const Deployer = require('aeproject-lib').Deployer;

let deployer;
let instance;
let hamsterName;
let keypair = {
    secretKey: "bb9f0b01c8c9553cfbaf7ef81a50f977b1326801ebf7294d1c2cbccdedf27476e9bbf604e611b5460a3b3999e9771b6f60417d73ce7c5519e12f7e127a1225ca",
    publicKey: "ak_2mwRmUeYmfuW93ti9HMSUJzCk1EYcQEfikVSzgo6k2VghsWhgU"
}



    

async function AeprojectDeploy(contractPath, args = []) {
    deployer = new Deployer('local', keypair.secretKey)
    let deployedInstance = await deployer.deploy(contractPath, args)

    return deployedInstance
}

module.exports = AeprojectDeploy;