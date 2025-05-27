const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.post("/", authenticate, authorize(['customer']), orderController.createOrder);

router.get("/", authenticate, authorize(['admin', 'client']), orderController.getAllOrders);
router.get("/:id", authenticate, authorize(['admin', 'client']), orderController.getOrderById);

router.put("/:id", authenticate, authorize(['admin']), orderController.updateOrderStatus);

router.delete("/:id", authenticate, authorize(['admin']), orderController.deleteOrder);


module.exports = router;