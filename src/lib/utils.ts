import { type ClassValue, clsx } from "clsx"
import {  format, subDays } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value?: number) {
  // const finalValue = convertAmountFromMiliunits(value)
  return Intl.NumberFormat('USD', {
    style: 'currency',
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value? value : "0")
}


type Period = {
  from: Date | string | undefined;
  to: Date | string | undefined;
}

export function formatDataRange(period?: Period) {
  const defaultTo = new Date()
  const defautFrom = subDays(defaultTo, 30)

  if (!period?.from) {
    return `${format(defautFrom, "LLL dd")} - ${format(defaultTo, "LLL dd,y")}`;
  }
  if (period?.to) {
    return `${format(period.from, "LLL dd")} - ${format(period?.to, "LLL dd,y")}`;
  }

  return format(period.from, "LLL dd, y")
}