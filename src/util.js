module.exports = {};
module.exports.getArgs = function() {
  return process.argv.reduce((acc, arg, index) => {
    let [key, val] = arg.split('=');

    if (index === 0) {
      [key, val] = ['node_location', key];
    } else if (index === 1) {
      [key, val] = ['script', key];
    }
    return {
      ...acc,
      [key]: val,
    };
  }, {});
};
