const timeSinceParser = (timestamp) => {
  const pastTime = new Date(timestamp);
  const timeDiff = new Date() - pastTime;

  if (timeDiff >= 86400000) {
    return Math.ceil(timeDiff / (86400000)) + "d";
  } else if (timeDiff >= 3600000) {
    return Math.ceil(timeDiff / (3600000))+ "h";
  } else {
    return Math.ceil(timeDiff + 1 / 60000) + "m";
  }
};

export default timeSinceParser;
