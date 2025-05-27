const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");
const router = express.Router();

//Create Order - Client only
router.post("/", authenticate, authorize(['client']), orderController.createOrder);

//Read Orders - Both Admin and Client
router.get("/", authenticate, authorize(['admin', 'client']), orderController.getAllOrders);
router.get("/:id", authenticate, authorize(['admin', 'client']), orderController.getOrderById);

//Update Order Status (Accept/Reject) - Admin only
router.put("/:id", authenticate, authorize(['admin']), orderController.updateOrderStatus);

//Delete Order - (Optional if needed)
router.delete("/:id", authenticate, authorize(['admin']), orderController.deleteOrder);


module.exports = router;