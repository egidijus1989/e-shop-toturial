const displayCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-LT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
  return formatter.format(num);
};

export default displayCurrency;
