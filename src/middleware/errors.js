export function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(err => next(err));
  };
}

export function catchErrors(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message });
}
