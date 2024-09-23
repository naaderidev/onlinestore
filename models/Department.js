const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const departmentModel =
  mongoose.models?.Department || mongoose.model("Department", departmentSchema);

export default departmentModel;
