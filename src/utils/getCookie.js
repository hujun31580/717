export default function getCookie(name){
    let cookieStr=document.cookie
    if(cookieStr.length==0)return;
    let arr;
    let res=null;
    if(cookieStr.indexOf(';')>-1) {
        arr=cookieStr.split(';')
        arr.forEach((item,i)=>{
          let arr1=item.split('=')
            if(arr1[0]==name){
              res=arr1[1]
            }
        })
    }else{
      let arr1=cookieStr.split('=')
      if(arr1[0]==name){
        res=arr1[1]
      }
    }
    return res;
}





