const express = require('express');
require('dotenv').config();
const globleErrorhandler = require('./middleware/errorMiddleware');
const { connectionDB } = require('./config/database');
const authRouter = require('./routes/authRoute')
const app = express();

app.use(express.json());
app.use('/api',authRouter)
app.use(globleErrorhandler);

app.all("*", (req, res, next) => {
    const err = new Error(`Not Found ${req.originalUrl} on this server`);
  
    res.status(404).json({
      message: err.message,
    });
  });
  
app.listen(process.env.PORT, async()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    await connectionDB()
})
