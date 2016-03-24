var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'resources';
	locals.data = {
		resources: [],
	};

	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Resource').paginate({
				page: req.query.page || 1,
				perPage: 100,
				maxPages: 10
			});
		
		q.exec(function(err, results) {
			locals.data.resources = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('resources');
};
