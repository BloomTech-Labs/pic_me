module.exports = (res, status, data) => {
  res.status(status).send(data);
};
