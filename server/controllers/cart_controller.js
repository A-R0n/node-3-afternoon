// swag is an array of swag objects
const swag = require('../models/swag');

module.exports = {
    add: ( req, res, next ) => {
        const { id } = req.query;
        let { cart } = req.session.user;
    
        const index = cart.findIndex( swag => swag.id == id );
    
        if ( index === -1 ) {
          const selectedSwag = swag.find( swag => swag.id == id );
    
          cart.push( selectedSwag );
          req.session.user.total += selectedSwag.price;
        }
    
        res.status(200).send( req.session.user );
      },

    delete: (req, res, next) => {
        const {id} = req.query;
        const { cart } = req.session.user;

        const swagGear = swag.find( swag => swag.id == id);

        if(swagGear) {
            const ind = cart.findIndex(swag => swag.id == id);
            cart.splice(ind, 1);
            req.session.user.total -= swagGear.price;
        }
        res.status(200).send(req.session.user);
    },

    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;

        res.status(200).send(req.session.user)
    }
}