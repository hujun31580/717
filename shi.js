var obj={
        name:"jsCoder",
        skill:["css3","html5","es6","react","angular"],
        say:function(){
          var _this=this
            for(var i=0,len=this.skill.length;i<len;i++){
             
                setTimeout(function(){
                  
                      console.log("No."+i+_this.name);
                      console.log(_this.skill[i]);
                      console.log("....");     
                      
                  })
         
                
            }
        }
    }
    obj.say();