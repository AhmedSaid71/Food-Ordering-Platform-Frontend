export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const getTime = (value: string, addTime?: number) => {
  const time = new Date(value);
  if (addTime) {
    time.setMinutes(time.getMinutes() + addTime);
  }
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${paddedMinutes}`;
};
