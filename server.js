const express = require('express');
const app = express();
const  bodyParser = require('body-parser');

require('./db/mongoose');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

const itemRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');
const auth = require('./routes/auth');
app.use('/api/items', itemRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', auth)



const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is running on port ' + port))