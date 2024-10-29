const express = require('express');
const helmet = require('helmet'); // for providing security
const cors = require('cors'); // for providing cors security
const userRoutes = require('./routes/UserRoutes.js')


require('./db.js');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/user', userRoutes);
app.listen(5000, () => console.log(`Console running at post 5000`));
