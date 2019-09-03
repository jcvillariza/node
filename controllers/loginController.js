import loginService from '../services/loginService';

exports.login = (req, res) => {
    loginService.login(req.body);
    res.json(req.body);
};