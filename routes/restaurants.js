const express = require('express');
const uuid = require('uuid');

const resData = require('../util/restaurant-data');

const router = express.Router();


router.get('/restaurants',(req,res)=>{
  let order = req.query.order;
  let nextOrder = 'desc'

  if(order!=='asc'&&order!=='desc'){
    order='asc';
  }

  if(order === 'desc'){
    nextOrder='asc';
  }

  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.sort((resA,resB)=>{
    return (order === 'asc' && resA.name > resB.name) || (order === 'desc' && resB.name > resA.name) ?  1  : -1;
  });

  res.render('restaurants',
  {
    numberOfRestaurants: storedRestaurants.length, 
    restaurants: storedRestaurants,
    nextOrder: nextOrder
  });
});

router.get('/restaurants/:id',(req,res)=>{ // 등록된 데이터의 개수가 몇 개인지 예측이 불가하므로 동적으로 url을 생성해야함
  const restaurantId =  req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants){
    if(restaurant.id === restaurantId){ // url에 등록된 restaurantId와 일치하는 항목..
      return res.render('restaurant-details',{restaurant : restaurant}); // 매칭이 되는 id를 발견할 경우 그 즉시 종료
    } 

    res.render('404'); // 이 과정이 없을 경우 페이지가 시간초과할 때까지 로딩되고 무슨 일이 일어나는지 알지못함..
  }
});

router.get('/recommend',(req,res)=>{
  // const htmlFilePath = path.join(__dirname,'views','recommend.html');
  // res.sendFile(htmlFilePath);
  res.render('recommend');
});

router.post('/recommend',(req,res)=>{
  const restaurant = req.body; // input name 속성을 통해 입력한 값을 가져올 수 있음 {객체 타입}
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);
  
  resData.storedRestaurants(restaurants);

  res.redirect('/confirm'); // 페이지에서 요청 처리 후 경고문이 뜨는 패턴 대신 다른 페이지로 전환하는 방식 채택
});

router.get('/confirm',(req,res)=>{
  // const htmlFilePath = path.join(__dirname,'views','confirm.html');
  // res.sendFile(htmlFilePath);
  res.render('confirm');
});

module.exports = router;