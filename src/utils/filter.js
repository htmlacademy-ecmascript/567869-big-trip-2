function filterPoints (points) {
  const currentDate = new Date();

  return {
    EVERYTHING: points.length,
    FUTURE: points.filter((point) => new Date(point.dateFrom) > currentDate).length,
    PRESENT: points.filter((point) => new Date(point.dateFrom) <= currentDate && new Date(point.dateTo) >= currentDate).length,
    PAST: points.filter((point) => new Date(point.dateTo) < currentDate).length,
  };
}

export { filterPoints };
