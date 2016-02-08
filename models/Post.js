var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	imageUrl: {type: String},
  teacherName: {type: String},
  teacherLocation: {type: String},
  coverBrief: {type: String},
  amount: { type: Number },
  amountRaised: { type: Number},
  numDonors: { type: Number },
  content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
  keyPoint1: {
    brief: { type: String},
    extended: {type: Types.Html, wysiwyg: true, height: 150}
  },
  keyPoint2: {
    brief: { type: String},
    extended: {type: Types.Html, wysiwyg: true, height: 150}
  },
  keyPoint3: {
    brief: { type: String},
    extended: {type: Types.Html, wysiwyg: true, height: 150}
  },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
