const mongDb = require('./mong');

class Controller{
    async getMainPageController(req, res){
        const main = await mongDb.main();
        res.json(main)
    }

    async getWelcomePageController(req, res){
        const wellcome = await mongDb.welcome();
        res.json(wellcome)
    }

    async registerPageController(req, res){
        const user = await mongDb.register(req.body)
        res.status(201).json(user)
    }

    async loginPageController(req, res){
        const user = await mongDb.login(req.body)
        user ? res.status(200).json(user) : res.status(400).send('Invalid Credentials')
    }
}

module.exports = new Controller();
