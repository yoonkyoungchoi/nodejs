var testForder = './data';
var fs = require('fs')

fs.readdir(testForder,function(error, filelist){
    console.log(filelist); //목록을 배열로 출력함
})