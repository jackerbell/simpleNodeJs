const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'..','Data','restaurants.json'); // 현재 디렉토리 보다 상위 레벨로 이동하기 위해 두 번째 항목을 추가함.

const getStoredRestaurants = () => {
  const fileData = fs.readFileSync(filePath); // 이 상태는 그냥 텍스트 형태로 빈 배열안에 넣어질 뿐..
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants; // 외부에서도 이 함수를 호출할 수 있어야하므로 함수 자신 반환.. 
}

const storedRestaurants = (storableRestaurants) => {
  fs.writeFileSync(filePath,JSON.stringify(storableRestaurants));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants, // 파일을 require을 통해 불러오려면 아래에 정의
  storedRestaurants: storedRestaurants
}                                            // (요청한 파일에서 사용할 변수명):(파일 내부에 정의된 함수)  
