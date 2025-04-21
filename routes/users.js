import express from 'express';

import { show_users, show_success, show_cancel } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  return res.send("home...");
})

userRouter.get("/users", show_users);

userRouter.get("/success", show_success);

userRouter.get("/cancel", show_cancel);

// userRouter.get('/payment', async (req, res, next) => {
//   try {
//     const paymentLink = await Stripe.paymentLinks.create({
//       line_items: [
//         {
//           price: PRICE_ID,
//           quantity: 1,
//         },
//       ],
//     });

//     console.log(paymentLink);

//     return res.redirect(paymentLink?.url);
//   }

//   catch(error) {
//     next(error);
//   }
// });

// userRouter.get("/users", async (req, res, next) => {
//   // console.log(req.params, req.query);
//   const sessionId = req.query?.customer || '';

//   if (!sessionId) {
//     return res.status(400).send('Session ID missing');
//   }

//   try {
//     const session = await Stripe.checkout.sessions.retrieve(sessionId);

//     console.log(session);
    
//     if (session.payment_status === 'paid') {
//       return res.redirect("/success");
//     } else {
//       return res.redirect('/cancel'); // Redirect to the cancel page if the payment failed or is incomplete
//     }
//   } catch (error) {
//     next(error);
//   }
// })

// userRouter.get("/success", async (req, res, next) => {
//   try {
//     return res.send("Payment Successfull");
//   }

//   catch (error) {
//     next(error);
//   }
// })

// userRouter.get("/cancel", async (req, res, next) => {
//   try {
//     return res.send("Payment Failed... Try again next time...");
//   }

//   catch (error) {
//     next(error);
//   }
// })

export default userRouter;