/*
 *    routes.js
 *    Handles API routes
 * 
 *    Alberto Fausto
 */

//Handle routes and requests -----------------------------------------------

'use strict';

var auth = require('http-auth');
const postgres = require('./postgres')

//Authentication (avoid unwanted calls to the API)
var basic = auth.basic({
    realm: "Users",
    file: "./users/users.htpasswd"
});


//*********************************Functions***********************************/
/******************************************************************************/

module.exports = function(express, app){

    var router = express.Router();

    //Gets Callback info given a callback id and seq
    async function createPost(req, res){
        await postgres.createPost(req.body.title, req.body.text, res);
    }

    //Gets Callback info given a callback id and seq
    async function updatePost(req, res){
        await postgres.updatePost(req.body.title, req.body.text, req.body.slug, res);
    }

    //Gets Callback info given a callback id and seq
    async function getPosts(req, res){
        await postgres.getPosts(res);
    }

    //Gets Callback info given a callback id and seq
    async function getPost(req, res){
        await postgres.getPost(req.body.slug, res);
    }

    //Gets Callback info given a callback id and seq
    async function deletePost(req, res){
        await postgres.deletePost(req.body.slug, res);
    }

    //API Routes -------------------------------------------------

    //Get Outcomes
    router.route('/wlog/post/create')
        .post(createPost)

    router.route('/wlog/post/update')
        .post(updatePost)

    router.route('/wlog/post/getall')
        .get(getPosts)

    router.route('/wlog/post/get')
        .post(getPost)

    router.route('/wlog/post/delete')
        .post(deletePost)

    app.use('/', auth.connect(basic), router);

}
