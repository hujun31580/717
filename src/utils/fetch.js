var $http = {};

/** 
 * 基于 fetch 封装的 GET请求 
 * @param url 
 * @param params {} 
 * @param headers 
 * @returns {Promise} 
 */
let hostname=''
console.log(process.env)
if(process.env=='development'){
    hostname='http://localhost:8000'
    console.log(hostname)
}
if(process.env=='production'){
    hostname='http://localhost:3000'
}
console.log(hostname)
$http.get = function (url, params, headers) {
    url=hostname+url
    if (params) {
        let paramsArray = [];
        //encodeURIComponent  
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({ status: response.status })
                }
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject({ status: -1 });
            })
    })
}


/** 
 * 基于 fetch 封装的 POST请求  FormData 表单数据 
 * @param url 
 * @param formData   
 * @param headers 
 * @returns {Promise} 
 */
$http.post = function (url, params) {
    url=hostname+url
      let formData = [];
      let str=''
        //encodeURIComponent  
        Object.keys(params).forEach(key => formData.push(key + '=' + params[key]))
       
            str += '&' + formData.join('&')
        
    return new Promise(function (resolve, reject) {
        console.log(url)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
            },
            body:str,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({ status: response.status })
                }
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject({ status: -1 });
            })
    })
}

export default $http;

// let formData = new FormData();  
// formData.append("id",1060);  

// $http.post(url,formData,headers).then((json) => {  
//     //处理 请求success  
//     if(json.code === 0 ){  
//             //我们假设业务定义code为0时，数据正常  
//         }else{  
//              //处理自定义异常  
//             this.doException(json);  
//         }  
//    },(json)=>{  
//      //TODO 处理请求fail  

// })  