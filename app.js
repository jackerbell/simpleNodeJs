const path = require('path');

const express = require('express');

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname,'views')); // 아래에서 ejs 옵션 사용선언 후 직접 적용할 대상 역시 동일하게 옵션
app.set('view engine','ejs'); // express에 대해 특정 옵션을 설정할 수 있는 메서드.. 여기선 ejs 사용 용도로 썼음..

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.use('/',defaultRoutes);
app.use('/',restaurantRoutes);


app.use((req,res) => { // 일일이 직접 오류페이지를 추가하지 않고 미들웨어로 생성해서 모든 페이지에 대해 처리함.
  res.status(404).render('404'); // 브라우저 상에서 오류 처리는 되지만, 지금 어떤 상태인지 파악할 수는 없기에 status메서드를 통해
});                           // 상태코드를 임의로 지정해줄 수 있음.        

app.use((error,req,res,next) => { 
  res.status(500).render('500');
});

app.listen(3000);