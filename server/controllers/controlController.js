const {User} = require('../models/model')

class ControlController {
    async getAll(req, res) {
        const users = await User.findAll();
        res.json(users);
    }
    async delete(req, res) {
        const {email} = req.body; 
        await User.destroy({where: {email}});
        res.json({message: "User deleted"});
    }
    async block(req, res) {
        const {email} = req.body; 
        await User.update({block: "Block"}, {where: {email: email}});
        res.json({message: "User blocked"});
    }
    async unblock(req, res) {
        const {email} = req.body; 
        await User.update({block: "Unblock"}, {where: {email: email}});
        res.json({message: "User unblocked"});
    }
}

module.exports = new ControlController();