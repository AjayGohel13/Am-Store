import {
  CheckCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
export const statuses = [
  {
    value: "Paid",
    label: "Paid",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
]


export const priorities = [
  {
    value:"Ajay Gohel",
    label:"Ajay Gohel",
  }
]
export const payment_status = [
  {
    label: "Completed",
    value: true,
    icon: CheckCircledIcon,
  },
  {
    label: "Processing",
    value: false,
    icon: StopwatchIcon,
  },
]