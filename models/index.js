const mongoose = require('mongoose');
const userSchema = require('./schemas/user');
const eventSchema = require('./schemas/event');
// const postSchema = require('./schemas/post');
// const productSchema = require('./schemas/product');
// const userSchema = require('./schemas/user');
// const commentSchema = require('./schemas/comment');

// exports.Post = mongoose.model('Post', postSchema);
// exports.Product = mongoose.model('Product', productSchema);
exports.UserModel = mongoose.model('User', userSchema);
exports.EventModel = mongoose.model('Event',eventSchema);
// exports.Comment = mongoose.model('Comment',commentSchema);

