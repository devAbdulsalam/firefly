import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

import userRoutes from './routes/users.js';
import reportRoutes from './routes/reports.js';
// import bookingRoutes from './routes/booking.js';
// import orderRoutes from './routes/orders.js';
// import categoryRoutes from './routes/category.js';
// import setupRoutes from './routes/setup.js';

const app = express();
app.use(bodyParser.json());
app.use('/public', express.static('public'));

// console.log('hello');
app.use(cors(['']));
app.use('/welcome', (req, res) => {
	res.status(200).json({ message: 'Welcome to bus booking api' });
});
app.use('/users', userRoutes);
app.use('/reports', reportRoutes);
// // app.use('/booking', bookingRoutes);

// app.use('/setup', setupRoutes);

app.use('/', (req, res) => {
	res.status(200).json({ message: 'Page not found' });
});

const PORT = process.env.PORT || 3000;

/* MONGOOSE SETUP */
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
	})
	.catch((error) => console.log(`${error} did not connect`));
