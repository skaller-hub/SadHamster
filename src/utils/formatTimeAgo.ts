export const formatTimeAgo = (createdAt: string): string => {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

  if (diffDays > 0) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  } else if (diffHrs > 0) {
    return `${diffHrs} hour${diffHrs === 1 ? "" : "s"} ago`;
  } else {
    return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  }
};
