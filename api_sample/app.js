const fs = require('fs')
const express = require("express");
const app = express();
const { 
    getDeployedInstance
} = require('./client');
const contractSource = '../contracts/boilerplatePlayground.aes'
let instance;

const AeprojectDeploy = require('./deployer');

app.get("/api/:address", async (req, res, next) => {

    const amountToFund = 13312552
    let address = req.params.address;
    
    instance = await getDeployedInstance(fs.readFileSync(contractSource, 'utf-8'))

    //the caller of the tx will add money to himself in the context of the contract, which in our case will be the owner
    await instance.methods.fundBeneficiary({ amount: amountToFund })

    let resut = await instance.methods.balanceOf(address)
    
    

    res.json({
        result: resut.decodedResult,
        calledFrom: 'From the client instance'
    })

});

app.get("/deployer/:address", async (req, res, next) => {
    const amountToFund = 13312552
    let address = req.params.address;

    instance = await AeprojectDeploy(contractSource)
    
    //the caller of the tx will add money to himself in the context of the contract, which in our case will be the owner
    await instance.fundBeneficiary({ amount: amountToFund })

    let resut = await instance.balanceOf(address)

    
    res.json({
        result: resut.decodedResult,
        calledFrom: 'From AEproject deployer'
    })

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});