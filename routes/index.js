/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

var stripe = require('stripe')(
  process.env.STRIPE_SK
);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
// app.get('/protected', middleware.requireUser, routes.views.protected);
exports = module.exports = function(app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/projects/:category?', routes.views.projects);
	app.get('/projects/post/:post', routes.views.post);
	app.get('/resources', routes.views.resources);
  app.all('/contact', routes.views.contact);

  app.get('/pay', function(req, res) {
    stripe.charges.create({
      amount: req.query.amount,
      currency: 'usd',
      source: req.query.tok,
      description: 'Charge for ' + req.query.project + ' - ' + req.query.email,
    }, function(err, charge) {
      if (err) {
        console.log(err, charge);
        res.send('error');
        return;
      }
      saveDonation(req.query.amount, req.query.project, res);
    });
  });

  function saveDonation(amount, project, res) {
    var project = /[^/]*$/.exec(project)[0];
    var q = keystone.list('Post').model.findOne({
      state: 'published',
      slug: project
    });

    q.exec(function(err, result) {
      if (err) {
        res.send('error');
      }
      result.set({numDonors: result.numDonors + 1,
                  amountRaised: result.amountRaised + amount / 100.0});
      result._req_user = 'user';
      result.save(function(err) {
        if (err) {
          res.send('error');
        }
        res.send('ok');
      });
    });
  }
};
