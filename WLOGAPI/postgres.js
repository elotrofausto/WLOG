/*
 *    POSTGRES
 *    Postgres DB management 
 * 
 *    Plannet21 Communications 2019
 */

const { Pool, Client } = require('pg')
const config = require('config');
const logger = require('./winston');

//We'll use pooling for better performance
const pool = new Pool({
  user: config.get("POSTGRES_USER"),
  host: config.get("POSTGRES_HOST"),
  database: config.get("POSTGRES_DB"),
  password: config.get("POSTGRES_PW"),
  port: config.get("POSTGRES_PORT")
})

function connect(){
  pool.connect()
  .then(()=>{
      logger.info("Successfully connected to Postgres DB")
  })
  .catch((err)=>{
      logger.error("An error ocurred while connecting with Postgres DB")
  })
}

function createPost(title, text, result){
  //Insert example with a prepared statement
    let slug = title.split(" ").join("-");
    slug = slug.toLowerCase();
    const query = {
      name: 'create-Post',
      text: 'INSERT INTO public.blog_post("title", "slug", "text", "author_id", "date_created", "date_modified", "status") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [title, slug, text, 1, new Date(), new Date(), 1],
      rowMode: 'array',
    }

    //Promise
    pool
      .query(query)
      .then(res => {
        logger.info("Postgres: Post created - " + slug);
        result.status(200).json(res);
      })
      .catch(e => {
        logger.error(e.stack);
        result.status(200).json(e.stack);
    })
}

function updatePost(title, text, slug, result){
  //Insert example with a prepared statement
    const query = {
      name: 'update-Post',
      text: 'UPDATE public.blog_post SET "title"=$1, "text"=$2, "date_modified"=$3 WHERE slug=$4',
      values: [title, text, new Date(), slug],
      rowMode: 'array',
    }

    //Promise
    pool
      .query(query)
      .then(res => {
        logger.info("Postgres: Post updated - " + slug);
        result.status(200).json(res);
      })
      .catch(e => {
        logger.error(e.stack);
        result.status(200).json(e.stack);
    })
}

function deletePost(slug, result){
  //Insert example with a prepared statement
    const query = {
      name: 'delete-Post',
      text: 'DELETE FROM public.blog_post WHERE slug=$1',
      values: [slug],
      rowMode: 'array',
    }

    //Promise
    pool
      .query(query)
      .then(res => {
        logger.info("Postgres: Post deleted - " + slug);
        result.status(200).json(res);
      })
      .catch(e => {
        logger.error(e.stack);
        result.status(200).json(e.stack);
    })
}

function getPost(slug, result){
  //Insert example with a prepared statement
    const query = {
      name: 'get-Post',
      text: 'SELECT * FROM public.blog_post WHERE slug=$1',
      values: [slug],
      rowMode: 'array',
    }

    //Promise
    pool
      .query(query)
      .then(res => {
        logger.info("Postgres: Post fetched - " + slug);
        result.status(200).json(res);
      })
      .catch(e => {
        logger.error(e.stack);
        result.status(200).json(e.stack);
    })
}

function getPosts(result){
  //Insert example with a prepared statement
    const query = {
      name: 'get-Posts',
      text: 'SELECT * FROM public.blog_post',
      rowMode: 'array',
    }

    //Promise
    pool
      .query(query)
      .then(res => {
        logger.info("Postgres: All Posts fetched");
        result.status(200).json(res);
      })
      .catch(e => {
        logger.error(e.stack)
        result.status(200).json(e.stack);
    })
}

  module.exports.createPost = createPost;
  module.exports.updatePost = updatePost;
  module.exports.deletePost = deletePost;
  module.exports.getPosts = getPosts;
  module.exports.getPost = getPost;
  module.exports.connect = connect;

