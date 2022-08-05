module.exports = (app) => {
  const User = require("./user/user.routes");
  const Product = require("./product/product.routes");
  const productCatagory = require("./product/productCategories");
  const productSubCategory = require("./product/subCategories")
  const productSearch = require("./search/searchProduct.routes")
  const addCart = require("./product/addCart.routes");
  const notification = require("./notification/notification.routes");
  const Banner = require("./banner/banner.routes");
  const orderDetails =require("./d_orderDetails/orderDetails.routes");
  const employeeList = require("./d_empleeList/employeeList.routes");
  const bankDetails = require("./d_bankDetails/bankDetails.routes")
  const Marchand = require("./d_addMarchand/addMarchand.routes");
  const distributorDashboard = require("./d_dashboard/dashboard.routes")
  
  app.use("/api/user", User);
  app.use("/api/product", Product);
  app.use("/api/product/category", productCatagory);
  app.use("/api/product/subcategory", productSubCategory);
  app.use("/api/search", productSearch)
  app.use("/api/product", addCart);
  app.use("/api/notification", notification);
  app.use("/api/banner", Banner);
  app.use("/api/oderdetails", orderDetails);
  app.use("/api/employeeList", employeeList);
  app.use("/api/bankDetails", bankDetails);
  app.use("/api/marchand", Marchand);
  app.use("/api/distributor/dashboard", distributorDashboard)
};