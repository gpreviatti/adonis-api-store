'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Product = use('App/Models/Product');
const { validate } = use('Validator');

class ProductController {
	// list products
	async index ({ params }) {
    	if (params.id) {
      		return Product.find(params.id);
   	 	}
		return await Product.all();
	}

	// Create/Edit product
	async store ({ params, request }) {

		// validations
		const data = request.only(["name", "value", "amount"]);
		const validation = await validate(data, {
			name: "required",
			value: "required",
			amount: "required",
		});

		if (validation.fails()) {
			return validation.messages();
		}

		if (params.id) {
			let product = await Product.findOrFail(params.id)
			if (product) {
				await product.merge(data);
				await product.save();
				return { success: true }
			}
		} else {
			return await Product.create(data);
		}

	    return { success: false }
	}

	// remove product
	async destroy ({ params }) {
		let product = await Product.findOrFail(params.id);
		product.delete();
		return { success: true }
	}
}

module.exports = ProductController
