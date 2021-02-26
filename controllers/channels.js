const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

exports.getProfile = catchAsync(async (req, res, next) => {
  const profile = await User.findOne({ userId: req.params.userId }).populate({
    path: 'uploadedEmotes channelEmotes',
    populate: {
      path: 'uploadedBy',
    },
  });

  res.status(200).send({ status: 'success', profile });
});

exports.getUserChannelEmotes = catchAsync(async (req, res, next) => {
  const userChannelEmotes = await User.findById(req.params.userId).select(
    'channelEmotes'
  );

  res.status(200).send({ status: 'success', userChannelEmotes });
});

exports.getUserSubmittedEmotes = catchAsync(async (req, res, next) => {
  const userSubmittedEmotes = await User.findById(req.params.userId).select(
    'submittedEmotes'
  );

  res.status(200).send({ status: 'success', userSubmittedEmotes });
});

exports.getUserEmotes = catchAsync(async (req, res, next) => {
  const userEmotes = await User.findById(req.params.userId).select(
    'submittedEmotes channelEmotes'
  );

  res.status(200).send({ status: 'success', userEmotes });
});
