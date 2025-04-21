import io from "../config/socket.js";

import stripe from "stripe";

import { SECRET_KEY, PRICE_ID } from "../config/env.js";

const Stripe = new stripe(SECRET_KEY);

export const show_users = async (req, res, next) => {
  // console.log(req.params, req.query);
  const sessionId = req.query?.customer || '';

  if (!sessionId) {
    return res.status(400).send('Session ID missing');
  }

  try {
    const session = await Stripe.checkout.sessions.retrieve(sessionId);

    console.log(session);
    
    if (session.payment_status === 'paid') {
      io.getIO().emit("success", { action: "create", data: true });
      return res.redirect("/success");
    } 

    else {
      io.getIO().emit("success", { action: "create", data: false });
      return res.redirect('/cancel'); // Redirect to the cancel page if the payment failed or is incomplete
    }
  } 

  catch (error) {
    next(error);
  }
}

export const show_success = async (req, res, next) => {
  try {
    return res.send("Payment Successfull");
  }

  catch (error) {
    next(error);
  }
}

export const show_cancel = async (req, res, next) => {
  try {
    return res.send('Payment was canceled. Please try again or contact support.');
  }

  catch (error) {
    next(error);
  }
}