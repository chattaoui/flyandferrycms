let Functions = {
  test_string: (string) => {
    const match = string.match(/"(.*?)"/);
    if (match && match.length > 1) {
      return match[1]; // Output: quantites
    } else {
      return false;
    }
  },
  mapValidationErrors: (error) => {
    return error.details.map((err) => {
      return { attribut: Functions.test_string(err.message), message: err.message };
    });
  },
};
module.exports = { valide_erreur: Functions.mapValidationErrors };
