const Cart = require('../Models/cart');
exports.addItemToCart = (req, res) => {
    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error })
            if (cart) {
                const product = req.body.cartItems.product;
                const isItemAdded = cart.CartItems.find(c => c.product === product);
                let condition, update;

                if (isItemAdded) {
                    condition = { user: req.user._id, "cartItems.product": product };
                    update = {
                        "$set": {
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: isItemAdded.quantity + req.body.cartItems.quantity
                            }
                        }
                    }


                } else {
                    condition = { user: req.user._id };
                    update = {
                        "$push": { cartItems: req.body.cartItems }
                    };
                }

                Cart.findOneAndUpdate(condition, update)
                    .exec((error, _cart) => {
                        if (error) return res.status(400).json({ error });
                        if (_cart) {
                            return res.status(201).json({ _cart });
                        }

                    });


            } else {
                cart = new Cart({
                    user: req.user._id,
                    cartItems: req.body.cartItems
                });
                cart.save((error, cart) => {
                    if (error) return res.status(400).json({ error })
                    if (cart) {
                        return res.status(201).json({ cart })
                    }

                });
            }
        })



}