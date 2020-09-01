export default {
  format: (dateString, locale = "en-US") => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString(locale)
      .concat(" ")
      .concat(date.toLocaleTimeString(locale));
  },
};
