const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mernBrad', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});