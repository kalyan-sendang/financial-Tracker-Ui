function validateName(value) {
  let error;
  if (!value) {
    error = "Category name is Required";
  }
  return error;
}

function validateAmount(value) {
  let error;
  if (!value) {
    error = "Amount is Required";
  } else if (value <= 0) {
    error = "Amount cannot be negetive or zero";
  } else if (!Number.isInteger(value)) {
    error = "Enter in number format";
  }
  return error;
}

export { validateName, validateAmount };
