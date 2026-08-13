export function formatDate(value: string | Date) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formatDateTime(value: string | Date) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function actionLabel(action: string) {
  const map: Record<string, string> = {
    "admin.login": "Admin login",
    "admin.logout": "Admin logout",
    "inquiry.created": "Inquiry created",
    "inquiry.status_changed": "Status changed",
    "inquiry.priority_changed": "Priority changed",
    "inquiry.deleted": "Inquiry deleted",
    "admin.password_changed": "Password changed",
  };
  return map[action] ?? action;
}
