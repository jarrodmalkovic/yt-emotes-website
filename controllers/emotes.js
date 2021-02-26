const Emotes = require('../models/emotes');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

exports.getAllEmotes = catchAsync(async (req, res, next) => {
  let query = Emotes.find({});

  if (req.query.search) {
    let search = req.query.search.split('+').join(' ');
    const RegEx = new RegExp(search);
    query = query.find({ emoteName: { $regex: RegEx, $options: 'si' } });
  }

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  query = query.populate('uploadedBy', 'name _id userId');

  const emotes = await query;

  res.status(200).send({ status: 'success', emotes });
});

exports.submitEmote = catchAsync(async (req, res, next) => {
  const emote = new Emotes({ ...req.body, uploadedBy: req.user._id });
  await emote.save();

  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { uploadedEmotes: emote._id } }
  );

  res.status(201).send({ status: 'success', emote });
});

exports.addEmoteToUser = catchAsync(async (req, res, next) => {
  const emote = await Emotes.findById(req.params.emote).populate(
    'uploadedBy',
    'name _id userId'
  );

  await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $addToSet: { channelEmotes: emote._id },
    }
  );

  res.status(200).send({ status: 'success', emote });
});

exports.removeEmoteFromUser = catchAsync(async (req, res, next) => {
  const emote = await Emotes.findById(req.body.emoteId);

  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { channelEmotes: req.body.emoteId } }
  );

  res.status(200).send({ status: 'success', emote });
});

exports.removeEmote = catchAsync(async (req, res, next) => {
  const emote = await Emotes.findById(req.params.emote);

  if (emote.uploadedBy + '' !== req.user._id + '') {
    return new appError('You cannot delete an emote you did not upload');
  }

  await Emotes.findOneAndRemove({ _id: req.params.emote });

  res.status(200).send({ status: 'success', emote });
});
