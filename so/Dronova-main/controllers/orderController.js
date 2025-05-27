const Order = require("../models/Order");
const Joi = require('joi');
console.log("Loading orderController.js"); 

const orderSchema = Joi.object({
    serviceType: Joi.string().valid("agriculture", "security", "industry", "customise").required(),
    location: Joi.string().required(),
    scheduledDate: Joi.date().required(),
    assignedDrone: Joi.string().optional(),
    description: Joi.string().required(),
    duration: Joi.string().required()
});

const createOrder = async (req, res) => {
    try {
        console.log('Received order request:', req.body);
        console.log('User from request:', req.user);
        console.log('User role:', req.user?.role);
        console.log('Auth header:', req.headers.authorization);

        if (!req.user) {
            console.log('No user found in request');
            return res.status(401).json({ message: "User not authenticated" });
        }

        if (req.user.role !== 'customer') {
            console.log('Role check failed. User role:', req.user.role);
            return res.status(403).json({ message: "Access forbidden: Only customers can submit orders" });
        }

        const { error } = orderSchema.validate(req.body);
        if (error) {
            console.log('Validation error:', error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        }

        const { serviceType, location, scheduledDate, assignedDrone, description, duration } = req.body;
        
        const newOrder = new Order({ 
            userId: req.user._id, 
            serviceType, 
            location,
            scheduledDate,
            assignedDrone,
            description,
            duration,
            status: 'pending' 
        });

        console.log('Creating new order:', newOrder);
        await newOrder.save();
        
        res.status(201).json({ 
            message: "Order created successfully", 
            order: newOrder 
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ 
            message: "Failed to create order", 
            error: error.message 
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        let orders;
        if (req.user.role === 'admin') {
            orders = await Order.find().populate('userId', 'name email');
        } else if (req.user.role === 'client') {
            orders = await Order.find({ userId: req.user._id }).populate('userId', 'name email');
        } else {
            return res.status(403).json({ message: "Access forbidden" });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (req.user.role !== 'admin' && order.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access forbidden" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access forbidden: Admins only" });
        }

        const { error } = orderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

        res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Failed to update order", error: error.message });
    }
};

const mongoose = require("mongoose");


const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID de commande invalide" });
        }

        if (!status) {
            return res.status(400).json({ message: "Statut non fourni" });
        }

        const validStatuses = ['pending', 'accepted', 'rejected', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Statut invalide" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        res.status(200).json({
            message: "Statut de la commande mis à jour avec succès",
            order: updatedOrder
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut de la commande:", error);
        res.status(500).json({
            message: "Erreur lors de la mise à jour du statut de la commande",
            error: error.message
        });
    }
};

module.exports = {  };



const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (req.user.role === 'client') {
            if (order.userId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Access forbidden: Not your order" });
            }
            if (order.status !== 'pending') {
                return res.status(403).json({ message: "Cannot delete order after approval or rejection" });
            }
        } else if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access forbidden" });
        }

        await order.deleteOne();
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete order", error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    updateOrderStatus,
    deleteOrder
};


const sendNotification = require('../utils/sendNotification');

exports.createOrder = async (req, res) => {
  try {
    const order = await new Order(req.body).save();
    
    await sendNotification({
      message: 'طلب جديد من زبون بحاجة للمراجعة.',
      forAdmin: true
    });
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Failed to create order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

exports.updateOrderStatus = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      order.status = req.body.status;
      await order.save();
      
      if (req.body.status === 'accepted') {
        await sendNotification({
          userId: order.userId,
          message: 'تم قبول طلبك. سيتم التواصل معك لتحديد موعد.',
        });
      }
      
      res.json(order);
    } catch (error) {
      console.error('Failed to update order:', error);
      res.status(500).json({ message: 'Failed to update order' });
    }
  };
