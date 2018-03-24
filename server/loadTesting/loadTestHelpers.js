module.exports = {
  getPopularId: getPopularId,
  getNormalId: getNormalId
}

function getPopularId(requestParams, context, ee, next) {
  let num = (Math.floor(Math.random() * 1000000))*10
  let endDigit = Math.random() < 0.5 ? 5 : 9;
  num += endDigit;
  context.vars.id = num;
  return next();
}

function getNormalId(requestParams, context, ee, next) {
  let num = (Math.floor(Math.random() * 1000000))*10
  let random = Math.random();
  let endDigit;
  if (random < 0.125) {
    endDigit = 0;
  } else if (random < 0.25) {
    endDigit = 1;
  } else if (random < 0.375) {
    endDigit = 2;
  } else if (random < .5) {
    endDigit = 3;
  } else if (random < .625) {
    endDigit = 4;
  } else if (random < .75) {
    endDigit = 6;
  } else if (random < .875) {
    endDigit = 7;
  } else {
    endDigit = 8;
  }
  num += endDigit;
  context.vars.id = num;
  return next();
}