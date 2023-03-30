const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
  res.render('index'); // ejs를 뷰엔진으로 사용하면 이 코드 하나로 뷰를 띄울 수 있다. 
});

router.get('/about',(req,res)=>{
  // const htmlFilePath = path.join(__dirname,'views','about.html');
  // res.sendFile(htmlFilePath);
  res.render('about');
});

module.exports = router;

