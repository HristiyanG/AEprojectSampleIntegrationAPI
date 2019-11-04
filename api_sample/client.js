
const AeSDK = require('@aeternity/aepp-sdk')
const Universal = AeSDK.Universal

const host = "http://localhost:3001"
const internalHost = "http://localhost:3001/internal"
const compilerUrl = 'http://localhost:3080'
const networkId = 'ae_devnet'

let keypair = {
    secretKey: "bb9f0b01c8c9553cfbaf7ef81a50f977b1326801ebf7294d1c2cbccdedf27476e9bbf604e611b5460a3b3999e9771b6f60417d73ce7c5519e12f7e127a1225ca",
    publicKey: "ak_2mwRmUeYmfuW93ti9HMSUJzCk1EYcQEfikVSzgo6k2VghsWhgU"
}

async function getClient() {
    const client = await Universal({
        url: host,
        internalUrl: internalHost,
        keypair: keypair,
        nativeMode: false,
        networkId: networkId,
        compilerUrl: compilerUrl
    })


    return client
}

async function getDeployedInstance(_contractSource, args = []) {
    let client = await getClient()
    let instance = await client.getContractInstance(_contractSource)
    await instance.deploy(args)

    return instance
}

module.exports = {
    getDeployedInstance
}