module.exports = (template, info) => {
  let output = template.replace(/{%PRODUCTNAMES%}/g, info.productName);
  output = output.replace(/{%IMAGE%}/g, info.image);
  output = output.replace(/{%FROM%}/g, info.from);
  output = output.replace(/{%NUTRIENT%}/g, info.nutrients);
  output = output.replace(/{%QUANTITY%}/g, info.quantity);
  output = output.replace(/{%PRICE%}/g, info.price);
  output = output.replace(/{%DESCRIPTION%}/g, info.description);
  output = output.replace(/{%ID%}/g, info.id);

  if (!info.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};

