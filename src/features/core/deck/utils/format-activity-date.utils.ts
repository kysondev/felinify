export const formatActivityDate = (value: Date | string | null | undefined) => {
  if (!value) return "No recent activity";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No recent activity";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default formatActivityDate;
