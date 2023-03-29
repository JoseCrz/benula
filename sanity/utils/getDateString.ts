const months: Record<number, string> = {
  0: "enero",
  1: "febrero",
  2: "marzo",
  3: "abril",
  4: "mayo",
  5: "junio",
  6: "julio",
  7: "agosto",
  8: "septiembre",
  9: "octubre",
  10: "noviembre",
  11: "diciembre",
};

export function getDateString(date: string) {
  const currentDate = new Date(date);
  const currentMonth = currentDate.getUTCMonth();
  const currentYear = currentDate.getUTCFullYear();
  return `${months[currentMonth]} del ${currentYear}`;
}
