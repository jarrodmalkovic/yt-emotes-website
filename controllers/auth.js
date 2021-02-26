const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.checkAuth = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated) {
    next();
  } else {
    return new appError('You are not authenticated');
  }
});

exports.loginSuccess = catchAsync(async (req, res, next) => {
  if (req.user) {
    req.session.save();

    return res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  }

  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
});

exports.loginFailure = catchAsync(async (req, res, next) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  req.logout();
  res.redirect('http://localhost:3000');
});
