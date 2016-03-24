var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Resource = new keystone.List('Resource', {
	map: { name: 'productName' },
	autokey: { path: 'slug', from: 'productName', unique: true }
});

Resource.add({
	productName: { type: String},
  productDetail1: {type: String},
  productDetail2: {type: String},
  url: {type: String},
  imgageUrl: {type: String},
});

Resource.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Resource.defaultColumns = 'productName, state|20%, author|20%, publishedDate|20%';
Resource.register();
