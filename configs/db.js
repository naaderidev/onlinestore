const mongoose = require("mongoose");
// import productModel from "@/models/Product";

// async function createIndexes() {  
//   try {  
//     await productModel.createIndexes(); // Create indexes defined in the schema  
//     console.log('Indexes created successfully');  
//   } catch (error) {  
//     console.error('Error creating indexes:', error);  
//   }  
// } 

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect(process.env.MONGO_URL);
      // await createIndexes(); // Call the index creation function after connecting 
      console.log("Connect to DB successfully");
    }
  } catch (err) {
    console.log("connection to DB failed =>", err);
  }
};

export default connectToDB;
