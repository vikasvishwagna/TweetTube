const asyncHandler = (requestHandlerFun) => {
  return (req, res, next) => {
    Promise.resolve(requestHandlerFun(req, res, next)).catch((err) =>
      next(err)
    );
  };
};

export { asyncHandler };
