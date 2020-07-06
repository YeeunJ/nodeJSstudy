var express = require('express'); // 설치한 express module을 불러와서 변수에 담기!!
var app = express(); //express를 실행, app object 초기화!!


app.set('view engine', 'ejs'); //ejs setting!!
app.use(express.static(__dirname + '/public'));

app.get('/login', function(req,res){ // '/login'위치에 get 요청을 받으면
  res.render('login', {name:req.query.nameQuery}); //쿼리 내용 받
});

app.get('/login/:nameParam', function(req,res){ // '/login/:nameParam'위치에 get 요청을 받으면
  res.render('login', {name:req.params.nameParam}); //parameter 내용 받기
});

app.get('/', function(req, res) { // '/' 위치에 'get'요청을 받는 경우,
  res.send('<h1>Hello World!!</h1>'); // 메세지를 보내는 것입니다!!
});


var port = 3000; // 포트 번호!!
app.listen(port, function(){ // 3000번 포트에 node.js 서버 연결!!
  console.log('주소!!-> http://localhost:'+port); //http://localhost:3000 으로 접속할 수 있습니다~:)
});
