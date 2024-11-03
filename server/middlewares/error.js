// Error Handling
const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Error";
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

const TryCatch = (passFuncn) => async (req, res, next) => {
  try {
    passFuncn(req,res, next);
  } catch (error) {
    next(error);
  }
};
export { errorMiddleware, TryCatch };
