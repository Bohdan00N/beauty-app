const formatDate = (date, locale = "en-US") =>
    new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  
  export default formatDate;