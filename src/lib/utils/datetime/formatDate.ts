import { format } from "date-fns";

// Date format constructed from the rules of the date formatting library.
const DATE_FORMAT_FOR_DISPLAY = "E, dd MMMM yyyy, h:mmaaaaa'm'";

/**
 * Formats an ISO date to a displayble format on the UI
 *
 * @param epochString  epoch value of datetime, e.g. "1651562107328"
 * @param dateFormat  Optional Date format string
 *
 * @returns Formatted date string, ready to be displayed on UI, e.g. "14 April 2020, 3:45 PM"
 */
export const formatDate = (
  epochString: string | null | undefined,
  dateFormat?: string
) => {
  if (!epochString) {
    return "";
  } else {
    try {
      const date = new Date(Number(epochString));
      if (!date) {
        return "";
      }
      if (!dateFormat) {
        return format(date, DATE_FORMAT_FOR_DISPLAY);
      } else {
        return format(date, dateFormat);
      }
    } catch (error) {
      return "";
    }
  }
};
