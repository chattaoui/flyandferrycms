const mongoose = require("mongoose");

const DestinationPrincipaleSchema = new mongoose.Schema({
    nomVille: {
    type: String,
  },
  imageVille: {
    type: String,
  },

  nomPays: {
    type: String,
  },

  imagePays: {
    type: String,
  },
});

const DestinationPrincipale_Collection = mongoose.model("__DestinationPrincipale_Collection", DestinationPrincipaleSchema);

module.exports = DestinationPrincipale_Collection;