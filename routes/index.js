import login from '../controllers/loginController';

export default (app) => {
    app.route('/login')
        .post(login.login);
};