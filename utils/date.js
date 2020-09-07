export default {
  format: (dateString, locale = "en-US") => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString(locale)
      .concat(" ")
      .concat(date.toLocaleTimeString(locale));
  },
  isValid: (dateString) => {
    // Validates date formats like:
    // 2020/01/01
    // 2020-08-27T11:34:27.032Z
    // 1994-11-05T08:15:30+05:00
    // 1994-11-05T13:15:30Z
    const dateRegex = /(^\d{2,4}[\.|\/|-]\d{1,2}[\.|\\/|-]\d{1,2})(?:(\s|T)((\d{2}:\d{2}:\d{2}(\.\d{3})?Z)|(\d{2}:\d{2}:\d{2}(-|\+)\d{2}:\d{2})))?$/; // eslint-disable-line no-useless-escape
    return dateRegex.test(dateString);
  },
};
