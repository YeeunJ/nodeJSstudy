var express  = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/Tproject.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('success');
    }
});

// Index
router.get('/', function(req, res, next){
  const query = `SELECT * FROM board;`;
    db.serialize();
    db.all(query, (err, rows) => {
        res.render('posts/index', {data: rows});
        console.log(rows);
    });
});

router.get('/new', function (req, res, next) {
    res.render('posts/new');
});

router.post('/', function (req, res, next) {
    const {title, body} = req.body;
    const query = `insert into board(title, date, contents, fileLocation)
    values ("${title}", datetime('now','localtime'), "${body}", "./file/posts/test.txt");`;
    console.log(query);
    db.serialize();
    db.each(query, (err, row) => {
        if(err) return res.json(err);
        res.redirect('/posts');
        console.log(res);
    });
    res.redirect('/posts');
    //res.send({title, body});
});

// show
router.get('/:id', function(req, res){
  var id = req.params.id;
  const query = `SELECT * FROM board where id = ${id};`;
  console.log(query);
db.each(query, function(err, row){
    if(err) return res.json(err);
    res.render('posts/show', {data: row});
  });
});

// edit
router.get('/:id/edit', function(req, res){
  var id = req.params.id;
  const query = `SELECT * FROM board where id = ${id};`;
  console.log(query);
  db.each(query, function(err, data){
    if(err) return res.json(err);
    res.render('posts/edit', {data:data});
  });
});

// update
router.put('/:id', function(req, res){
  var id = req.params.id;
  const {title, body} = req.body;
  const query = `update board set title = "${title}", contents = "${body}", uDate = datetime('now','localtime') where id = ${id};`;
  console.log(query);
  db.serialize();
  db.each(query, (err, row) => {
      if(err) return res.json(err);
      console.log('/posts/'+id);
      res.redirect('/posts/'+id);
  });
  res.redirect('/posts/'+id);
});

// destroy
router.delete('/:id', function(req, res){
  var id = req.params.id;
  const query = `DELETE FROM board where id = ${id};`;
  db.each(query, function(err){
    if(err) return res.json(err);
    res.redirect('/posts');
  });
  res.redirect('/posts');
});
module.exports = router;
