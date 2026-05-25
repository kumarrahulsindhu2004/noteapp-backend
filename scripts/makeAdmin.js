// scripts/makeAdmin.js
   require('dotenv').config();
   const mongoose = require('mongoose');
   const User = require('../models/User');
   mongoose.connect(process.env.MONGO_URI).then(async () => {
     await User.findOneAndUpdate({ email: 'rahul@gmail.com' }, { role: 'admin' });
     console.log('Done'); process.exit();
   });