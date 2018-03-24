module.exports = {
  getPopularId: getPopularId,
  getNormalId: getNormalId
}

function getPopularId(requestParams, context, ee, next) {
  // get number that is divisible by 1000
  let num = (Math.floor(Math.random() * 10000))*1000
  context.vars.id = num;
  return next();
}

function getNormalId(requestParams, context, ee, next) {
  let num = (Math.floor(Math.random() * 10000000));
  if (num % 1000 === 0) {
    num++
  }
  context.vars.id = num;
  return next();
}