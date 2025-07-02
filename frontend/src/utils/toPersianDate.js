import { toJalaali } from "jalaali-js";
import { toPersianDigits } from "./toPersianDigits";

export function toPersianDate(ISODate) {
  const date = new Date(ISODate);
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const gDay = date.getDate();

  // Convert to Persian (Jalali)
  const { jy, jm, jd } = toJalaali(gYear, gMonth, gDay);

  // Format month names (optional)
  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  // Format weekday (optional)
  const persianWeekdays = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه",
  ];
  const weekday = persianWeekdays[date.getDay()];

  return `${toPersianDigits(jd)} ${persianMonths[jm - 1]} ${toPersianDigits(
    jy
  )}`;
}
