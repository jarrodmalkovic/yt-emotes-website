const Feedback = require('../models/feedback');
const catchAsync = require('../utils/catchAsync');

exports.createFeedback = catchAsync(async (req, res, next) => {
  const feedback = new Feedback({ ...req.body });
  await feedback.save();

  res.status(200).send({ status: 'success' });
});
