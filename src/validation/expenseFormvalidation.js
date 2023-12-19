
function validateNote(value) {
    let error;
    if (!value) {
      error = "Note cannot be empty";
    }
    return error;
  }

  function ValidateAmount(value) {
    let error;
    if (!value) {
      error = "Amount is Required";
    } else if (value < 0) {
      error = "Price cannot be negetive";
    } else if (!Number.isInteger(value)) {
      error = "Enter in number format";
    }
    return error;
  }


export  {validateNote, ValidateAmount}