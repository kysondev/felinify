export const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
};

export const formatDateTime = (date: string | Date | null | undefined) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
};