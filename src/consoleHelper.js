const consoleHelper = (data) => {
  if (process.env.NODE_ENV === 'production') return;
    console.log(data);
}

module.exports = {
  consoleHelper,
}