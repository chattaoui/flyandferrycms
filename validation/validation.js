const { valide_erreur } = require("../functions");
const validationOptions = require("../const");

function validateData(shema, data) {
  const { error } = shema.validate(data, validationOptions);

  if (error) {
    const errors = valide_erreur(error);
    return errors;
  }
}

module.exports = validateData ;
