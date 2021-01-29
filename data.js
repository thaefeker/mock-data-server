const moment = require("moment");

const dataPoints = [
  {
    date: "2021-01-01T12:00:00.000Z",
    values: {
      value_1: 20.857028969284144,
      value_2: 31.410409169034864,
      value_3: 6.855221936269999,
      value_4: 2.2029563078484813,
      value_5: 4.606104435176448,
      value_6: 42.653168242473356,
      value_7: 72.869628362317,
      value_8: 20.701142658393366,
      value_9: 53.3970101900164,
      value_10: 18.93689206087437,
      value_11: 76.73811648425078,
      value_12: 64.96817412746177,
    },
  },
];

function randomInteger(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function updateData(interval) {
  const latestValues = dataPoints[0].values;
  let values = { ...latestValues };

  for (const [key, value] of Object.entries(latestValues)) {
    values[key] = Math.abs(randomInteger(value - 20, 80));
  }

  dataPoints.unshift({
    date: moment(dataPoints[0].date).add(interval, "milliseconds"),
    values,
  });
}

module.exports = {
  dataPoints,
  updateData,
};
