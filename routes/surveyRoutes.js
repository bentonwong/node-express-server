const mongoose = require('mongoose');
const requireLogin = require ('../middlewares/requireLogin');
const requireCredits = require ('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};

/*
const charge = await stripe.charges.create({
  amount: 500,
  currency: 'usd',
  description: '$5 for 5 credits',
  source: req.body.id
});
title: String,
body: String,
subject: String,
recipients: [RecipientSchema],
yes: { type: Number, default: 0 },
no: { type: Number, default: 0 },
_user: { type: Schema.Types.ObjectId, ref: 'User' },
dateSent: Date,
lastResponded: Date
*/
