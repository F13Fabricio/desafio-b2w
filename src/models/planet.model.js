const { Schema, model } = require('mongoose');


const PlanetSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: [50, 'The maximum length is 50 characters'],
      required: true,
    },
    climate: {
      type: String,
      required: true,
    },
    terrain: {
      type: String,
      required: true,
    },
    times_spotted: {
      type: Number,
      min: [0, 'No negative numbers allowed'],
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Planet', PlanetSchema);