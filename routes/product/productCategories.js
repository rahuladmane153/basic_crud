const router = require("express").Router();
const commonController = require("../../controller/commonController");
// const catagoryController = require("../../controllers/products/productCatagory");
const log = require("../../helper/logger");
const response = require("../../helper/response");
const mongoose = require("mongoose");
const ProductCatagories = mongoose.model("ProductCatagories");

router.post("/add", (req, res) => {
  log.debug("/api/product/category");
  commonController
    .add(ProductCatagories, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.get("/getall", (req, res) => {
  log.debug("/api/product/category");
  commonController
    .getAll(ProductCatagories)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});


router.get("/by/:id", (req, res) => {
  log.debug("/api/category/byId");
  commonController
    .getOne(ProductCatagories, { _id: req.params.id })
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

// router.get("/all/catagorydata", (req, res) => {
//   log.debug("/api/");
//   catagoryController
//     .getcatData()
//     .then((userData) => {
//       response.successResponse(res, 200, userData);
//     })
//     .catch((error) => {
//       log.error(error);
//       response.errorResponse(res, 500);
//     });
// });

router.put("/:id", (req, res) => {
  log.debug("/api/update/:id");
  commonController
    .updateBy(ProductCatagories, req.params.id, req.body)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

router.delete("/:id", (req, res) => {
  log.debug("/api/prodct/category/delete");
  commonController
    .delete(ProductCatagories, req.params.id)
    .then((userData) => {
      response.successResponse(res, 200, userData);
    })
    .catch((error) => {
      log.error(error);
      response.errorResponse(res, 500);
    });
});

module.exports = router;