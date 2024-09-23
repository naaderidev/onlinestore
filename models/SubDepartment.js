const mongoose = require("mongoose");
require("./Department");

const subDepartmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

const subDepartmentModel =
  mongoose.models?.SubDepartment ||
  mongoose.model("SubDepartment", subDepartmentSchema);

export default subDepartmentModel;
