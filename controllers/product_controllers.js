const express = require('express');
const router = express.Router();
const { Product } = require("../models");

Product.deleteMany({}, function (error, deletedBbProducts) {
  if (error) {
    return console.log(error);
  }
  Product.insertMany([
                {
                    "name": "Fishing Rod",
                    "image": "pacifier.jpg",
                    "price": 20,
                    "description": "This is a great fishing rod",
                    "category": "Adults"
                },
                {
                    "name": "Bait",
                    "image": "bait.jpg",
                    "price": 30,
                    "description": "Gotta tempt the fish",
                    "category": "Adults"
                },
                {
                    "name": "Boat Rental",
                    "image": "boat-rental.jpg",
                    "price": 50,
                    "description": "This is what you'll use to go out and catch the fish",
                    "category": "Adults"
                },
    ]);
});

/* == Producs Routes == */
/* == index route == */
router.get('/', async function (req, res) {
  try {
    const products = await Product.find({});
  
    const context = {
      products,
    }

    console.log(context)

    console.log(context)
    
    res.render('products/index', context);

  } catch (error) {
    return console.log(error);
  }
});

// This is the page to our form to create a new product! :)
router.get('/new', (req, res) => { 
  res.render('new.ejs');
});

// This is the post request coming from my newForm
router.post('/', async (req, res) => {
  try {
    await Product.create( req.body )

    return res.redirect('/products');
  } catch (error) {
    return console.log(error);
  }
});

/* == Show == */
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    const context = {
      product,
    };

    console.log(context)

    return res.render("products/show.ejs", context);

  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// edit route
router.get('/:productId/edit', async (req, res) => {
  try {  
    const product = await Product.findById(req.params.productId)
    return res.render('edit.ejs', { product });
    
  } catch (error) {
    return console.log(error)
  }

});

/* Update */
router.put('/:productId', (req, res) => {

  Product.findByIdAndUpdate(
      req.params.productId,
     {
       $set: req.body
     },
      {
        new: true
      },
      (error, updatedProduct) => {
          if (error) return console.log(error);
          
          return res.redirect(`/products/${updatedProduct.id}`);
      },
  );

});

/* delete */
router.delete('/:productId', (req, res) => {
   Product.findByIdAndDelete( req.params.productId, (error, deletedProduct) => {
        if (error) return console.log(error);
    
        console.log(deletedProduct);
        return res.redirect('/products');
    });
})

module.exports = router