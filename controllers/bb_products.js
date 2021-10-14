const express = require('express');
const router = express.Router();
const { Product, BbProduct } = require("../models");

BbProduct.deleteMany({}, function (error, deletedBbProducts) {
  if (error) {
    return console.log(error);
  }
  BbProduct.insertMany([
                {
                    "name": "Pacifier",
                    "image": "pacifier.jpg",
                    "price": 10,
                    "description": "Baby pacifier. Not suitable for adults.",
                    "category":"Baby products"
                },
                {
                    "name": "Diapers",
                    "image": "diapers.jpg",
                    "price": 10,
                    "description": "Baby diapers. Not suitable for adults.",
                    "category": "Baby products"
                },
                {
                    "name": "Baby Monitor",
                    "image": "baby-monitor.jpg",
                    "price": 10,
                    "description": "Baby monitor.",
                    "category": "Baby products"
                },
                {
                    "name": "Baby Feeding Bottle",
                    "image": "baby-bottle.jpg",
                    "price": 10,
                    "description": "Baby feeding bottle.",
                    "category": "Baby products"
                },
                {
                    "name": "Baby Formula",
                    "image": "baby-formula.jpg",
                    "price": 10,
                    "description": "Baby feeding formula.",
                    "category": "Baby products"
                },
                {
                    "name": "Child safety locks",
                    "image": "child-safety-locks.jpg",
                    "price": 10,
                    "description": "Child safety locks.",
                    "category": "Baby products"
                },
                {
                    "name": "Teething toy",
                    "image": "baby-toy.jpg",
                    "price": 10,
                    "description": "Toddler teething toy.",
                    "category": "Baby products"
                },
                {
                    "name": "High-chair for babies",
                    "image": "baby-chair.jpg",
                    "price": 10,
                    "description": "3rd most expensive Jordan available today.",
                    "category": "Shoe"
                },
                {
                    "name": "Air Jordan 12 OVO",
                    "image": "Jordan-12-OVO.jpg",
                    "price": 100000,
                    "description": "2nd most expensive Jordan available today.",
                    "category": "Shoe"
                },
                {
                    "name": "Air Jordan 12 Flu Game",
                    "image": "Jordan-Flu.jpg",
                    "price": 104000,
                    "description": "Most expensive Jordan available today.",
                    "category": "Shoe"
    
                },
    ]);
});

/* == index route == */
router.get('/', async function (req, res) {
  try {
    const products = await BbProduct.find({});
  
    const context = {
      products,
    }
    
    res.render('products/index', context);

  } catch (error) {
    return console.log(error);
  }
});

router.get('/new', (req, res) => { 
  res.render('baby_products/new.ejs');
});

// This is the post request coming from my newForm
router.post('/', async (req, res) => {
  try {
    await BbProduct.create( req.body )

    return res.redirect('/products');
  } catch (error) {
    return console.log(error);
  }
});

/* == Show == */
router.get("/:id", async (req, res, next) => {
  try {
    const product = await BbProduct.findById(req.params.id);
    
    const context = {
      product,
    };

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
    const product = await BbProduct.findById(req.params.productId)
    return res.render('edit.ejs', { product });
    
  } catch (error) {
    return console.log(error)
  }

});

/* Update */
router.put('/:productId', (req, res) => {

  BbProduct.findByIdAndUpdate(
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
   BbProduct.findByIdAndDelete( req.params.productId, (error, deletedProduct) => {
        if (error) return console.log(error);
    
        console.log(deletedProduct);
        return res.redirect('/products');
    });
})


module.exports = {
  BbProduct,
  router,
}