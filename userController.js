const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Review = require('../models/Review');

// Obtenir tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
    }
};

// Obtenir les détails d'un produit
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du produit' });
    }
};

// Ajouter un produit au panier
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cartItem = await Cart.findOneAndUpdate(
            { userId, productId },
            { quantity },
            { upsert: true, new: true }
        );
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout au panier' });
    }
};

// Créer une nouvelle commande
exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de la commande' });
    }
};

// Obtenir l'historique des commandes
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
    }
};

// Ajouter un avis sur un produit
exports.addReview = async (req, res) => {
    try {
        const review = new Review({ productId: req.params.id, ...req.body });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de l\'ajout de l\'avis' });
    }
};

// Obtenir les avis d'un produit
exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.id });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des avis' });
    }
};

// Inscription d'un nouvel utilisateur
exports.registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de l\'inscription' });
    }
};

// Connexion d'un utilisateur
exports.loginUser = async (req, res) => {
    // Logique de connexion (vérification des identifiants)
};

// Obtenir les informations du compte utilisateur
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
    }
};