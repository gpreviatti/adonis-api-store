'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { version: "4.0.0"  }
})

Route.group(() => {
	Route.get(':id?', 'ProductController.index');
	Route.post(':id?', 'ProductController.store');
	Route.delete(':id', 'ProductController.destroy');
}).prefix('product')
