import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

import { PORT, ENDPOINT_SECRET, SECRET_KEY } from "./config/env.js";

import userRouter from "./routes/users.js";

import errorMiddleware from "./middleware/error.middleware.js";

import stripe from "stripe";

const app = express();

const Stripe = new stripe(SECRET_KEY);

app.use(cors({
    origin: "*", // Your frontend URL
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// let processedSessions = new Set();

// // Match the raw body to content type application/json
// app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res, next) => {
// 	const endpointSecret = ENDPOINT_SECRET;

//   	const sig = req.headers['stripe-signature'];

// 	let event;

// 	try {
// 	    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
// 	}
// 	catch (err) {
// 	    // console.log("first", err.message);
// 	    return res.status(400).send(`Webhook Error: ${err.message}`);
// 	}
  
//   	// console.log(event.type);
  
//   	// if (processedSessions.has(event.data.object.id)) {
//   	//   return res.json({ received: true });
//   	// }
  
//     if (processedSessions.has(event.id)) {
//       console.log(`Duplicate event received: ${event.id}`);
//       return res.json({ received: true });
//     }
//     processedSessions.add(event.id);
  
  
// 	try {
// 	    const { type, data } = event;
// 	    let session = data.object;
// 	    let customerId = session.customer || null;

// 	    // Handle the event
// 	    switch (event.type) {  
// 	      case 'checkout.session.completed':
// 	          // session = event.data.object;
// 	          console.log(`completed ${customerId}`);
// 	          break;
// 	      case 'checkout.session.expired':
// 	          // session = event.data.object;
// 	          console.log('expired');
// 	          break;
// 	      case 'payment_intent.payment_failed':
// 	          // session = event.data.object;
// 	          // console.log('PaymentIntent was successful!');
// 	          console.log('Customer payment_intent payment_failed...');
// 	          break;
// 	      case 'payment_intent.succeeded':
// 	          // session = event.data.object;
// 	          // console.log('PaymentIntent was successful!');
// 	          console.log('Customer payment_intent succeeded...');
// 	          break;
// 	      default:
// 	        console.log(`Unhandled event type ${event.type}`);
// 	    }

// 	    // Return a response to acknowledge receipt of the event
// 	    return res.json({ success: true });
// 	}

// 	catch (error) {
// 	  next(error);
// 	}
// });

app.use(userRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log(`Listening to localhost PORT ${PORT}...`);
})