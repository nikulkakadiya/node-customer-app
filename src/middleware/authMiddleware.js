const AppError = require("../utils/appError");

exports.registrationMiddleware = async (req, res, next) => {
    const { firstName, email, password } = req.body;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/])\S{8,}$/;
    
    if (!firstName) {
        return next(new AppError('Please enter a first name',400));
    }
    if (!email) {
        return next(new AppError('Please enter a email address',400));
    }
    if (!password) {
        return next(new AppError('Please enter a password',400));
    }

    if (!emailPattern.test(email)) {
        return next(new AppError('Please enter a valid email address',400));
    }

    if (!passwordPattern.test(password)) {
        return next(new AppError('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',400));
    }

    next();
  };

exports.loginMiddleware = async (req, res, next) => {
    const { email, password } = req.body;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/])\S{8,}$/;
    
    if (!email) {
        return next(new AppError('Please enter an email address',400));
    }
    if (!password) {
        return next(new AppError('Please enter a password',400));
    }

    if (!emailPattern.test(email)) {
        return next(new AppError('Please enter a valid email address',400));
    }

    if (!passwordPattern.test(password)) {
        return next(new AppError('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',400));
    }

    next();
};