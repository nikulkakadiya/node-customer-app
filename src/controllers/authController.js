const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userRepository } = require("../repository/userRepo");
const sendVerificationEmail = require("../utils/sendEmail");
const { EMAIL_EXPIRATION_TIME, USER_ROLES } = require('../config/constants');

/* Customer registration  */
exports.registerCustomer = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            if (!existingUser.isVerified) {
                const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: EMAIL_EXPIRATION_TIME });
                sendVerificationEmail(email, token);
                return res.status(200).json({ message: 'Verification email sent again. Please verify your email.' });
            }
            return res.status(400).json({ error: 'Email already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepository.save({
          ...req.body,
          password:hashedPassword,
        });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: EMAIL_EXPIRATION_TIME });
        sendVerificationEmail(email, token);
        res.status(201).json({ message: 'User registered, please verify your email.' });
    }catch(error){
        console.log(error);
        
        res.status(500).json({ error: 'Internal server error' });
    }
}

/* Admin registration  */
exports.registerAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    try{
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            if (!existingUser.isVerified) {
                const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: EMAIL_EXPIRATION_TIME });
                sendVerificationEmail(email, token);
                return res.status(200).json({ message: 'Verification email sent again. Please verify your email.' });
            }
            return res.status(400).json({ error: 'Email already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepository.save({
          ...req.body,
          role: USER_ROLES.ADMIN,
          password:hashedPassword,
        });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: EMAIL_EXPIRATION_TIME });
        sendVerificationEmail(email, token);
        res.status(201).json({ message: 'User registered, please verify your email.' });
    }catch(error){
        console.log(error);
        
        res.status(500).json({ error: 'Internal server error' });
    }
}

/* Only admin login  */
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userRepository.findOne({ where: { email } });
          if (!user) return res.status(400).json({ message: 'User not found.' });
          if (!user.isVerified) return res.status(400).json({ message: 'Please verify your email first.' });
          if (user.role !== USER_ROLES.ADMIN) return res.status(403).json({ message: 'You are not allowed to login from here' });
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return res.status(400).json({ message: 'Invalid email or password.' });
          
          const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: EMAIL_EXPIRATION_TIME });
          res.status(200).json({
            message: 'Admin login successfully...',
             token 
            });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  /* Verify email  */
exports.verifyEmail = async (req, res) => {
    const { token } = req.query;    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userRepository.findOneBy(decoded.id);      
      if (user) {
        await userRepository.update({id: user.id}, {isVerified: true});
        res.status(200).json({ message: 'Email verified successfully.' });
      } else {
        res.status(400).json({ message: 'Invalid token.' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };