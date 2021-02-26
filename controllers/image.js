const cloudinary = require('cloudinary');

const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.uploadImage = catchAsync(async (req, res, next) => {
  if (req.file.size > 1000000) {
    throw new appError('The emote file size must be below 1000000 bytes', 400);
  }

  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    eager: [{ width: 28, height: 28 }],
  });

  if (result.width !== 112 && result.height !== 112) {
    await cloudinary.v2.uploader.destroy(result.public_id);
    throw new appError('The emote must be 112x112', 400);
  }

  return res.status(200).send({
    largeImgUrl: result.secure_url,
    imageId: largeImgResult.public_id,
    smallImgUrl: result.eager[0].secure_url,
  });
});
