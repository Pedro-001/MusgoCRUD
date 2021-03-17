const express = require('express');
const router = express.Router();
const ProductsService =  require('../../services/products')

const {} = require('../../utils/schemas/products');

const productService = new ProductsService();


router.get('/', async function(req,res,next){
    try {
//        throw new Error ('this is a error from api')
        const { tags} = req.query;
        const products = await productService.getProducts({ tags })
        res.status(200).json({
            data:products,
            message: 'products listed'
        });
    } catch (error) {
        next(error)
    }
})

router.get('/:productId',  async  function(req,res,next){
    const {productId} = req.params;
   try {
       const product =  await productService.getProduct({ productId })
       res.status(200).json({
           data:product,
           message: 'products retrieved'
       });
   } catch (error) {
        next(error)

   }
});


router.post('/', async function(req,res,next){
    const { body: product } = req;
    try {
        const createdProduct =  await  productService.createProduct({ product })
        res.status(201).json({
            data: createdProduct,
            message: 'products listed'
        });
    } catch (error) {
        next(error)

    }
});

router.put('/:productId', async function(req,res,next){
    try {
        const { productId } = req.params;
        const { body: product} = req;
        const updateproduct =   await  productService.updateProduct({ productId, product });
        res.status(201).json({
            data:updateproduct,
            message: 'products updated'
        });
    } catch (error) {
        next(error)
       
    }
});

router.delete('/:productId', async function(req,res,next){
    const { productId}  = req.params;
   try {
       const product =  await productService.deleteProduct({ productId });
       res.status(200).json({
           data:product,
           message: 'products deleted'
       });
   } catch (error) {
    next(error)
       
   }
});

module.exports = router;