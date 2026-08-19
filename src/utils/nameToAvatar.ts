export const nameToAvatar = (name: string | null): string | null => {
  if (name === null) {
    return null;
  }
  const words = name.split(" ");
  const initials = words
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return initials;
};
