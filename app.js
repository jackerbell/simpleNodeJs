const fs = require('fs'); // Data 폴더에 만든 json 파일에 저장하기 위해 사용
const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname,'views')); // 아래에서 ejs 옵션 사용선언 후 직접 적용할 대상 역시 동일하게 옵션
app.set('view engine','ejs'); // express에 대해 특정 옵션을 설정할 수 있는 메서드.. 여기선 ejs 사용 용도로 썼음..

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));


app.get('/',(req,res)=>{
  // const htmlFilePath = path.join(__dirname,'views','index.html');
  // res.sendFile(htmlFilePath);
  res.render('index'); // ejs를 뷰엔진으로 사용하면 이 코드 하나로 뷰를 띄울 수 있다. 
});

app.get('/restaurants',(req,res)=>{
  // const htmlFilePath = path.join(__dirname,'views','restaurants.html');
  // res.sendFile(htmlFilePath);
  const filePath = path.join(__dirname,'Data','restaurants.json');

  const fileData = fs.readFileSync(filePath); // 이 상태는 그냥 텍스트 형태로 빈 배열안에 넣어질 뿐..
  const storedRestaurants = JSON.parse(fileData);
  res.render('restaurants',
  {
    numberOfRestaurants: storedRestaurants.length, 
    restaurants: storedRestaurants,
  });
});

app.get('/recommend',(req,res)=>{
  // const htmlFilePath = path.join(__dirname,'views','recommend.html');
  // res.sendFile(htmlFilePath);
  res.render('recommend');
});

app.post('/recommend',(req,res)=>{
  const restaurantName = req.body; // input name 속성을 통해 입력한 값을 가져올 수 있음 {객체 타입}
  const filePath = path.join(__dirname,'Data','restaurants.json');

  const fileData = fs.readFileSync(filePath); // 이 상태는 그냥 텍스트 형태로 빈 배열안에 넣어질 뿐..
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurantName);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect('/confirm'); // 페이지에서 요청 처리 후 경고문이 뜨는 패턴 대신 다른 페이지로 전환하는 방식 채택
});

app.get('/confirm',(req,res)=>{
  // const htmlFilePath = path.join(__dirname,'views','confirm.html');
  // res.sendFile(htmlFilePath);
  res.render('confirm');
});

app.get('/about',(req,res)=>{
  // const htmlFilePath = path.join(__dirname,'views','about.html');
  // res.sendFile(htmlFilePath);
  res.render('about');
});


app.listen(3000);