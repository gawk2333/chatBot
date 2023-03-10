const convertTimeStamp = (timestamp: number | undefined) => {
  if (timestamp) {
    const date = new Date(timestamp * 1000);
    const dateString = date.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return dateString;
  }
  return "error";
};

export default convertTimeStamp;
