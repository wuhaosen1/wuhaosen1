class Depend {
  constructor(){
    this.reactivefn = []
  }
  collectReactivefn(reactiveFN){
    this.reactivefn.push(reactiveFN)
  }
  notify(){
    this.reactivefn.forEach((reactiveFN) => {
      reactiveFN()
    })
  }
}

const depend = new Depend()
function watchFN(reactiveFN) {
  depend.collectReactivefn(reactiveFN)
}

obj = {
 name:"zizi",
 age:18
}

const objproxy = new Proxy(obj,{
  set: function(target,key,newvalue,reactiver){
    Reflect.set(target,key,newvalue,reactiver)
    depend.notify()
  },
  get: function(target,key,reactiver){
    return Reflect.get(target,key,reactiver)
  }
})


watchFN(function(){
  console.log("自动收集完成开始一下步~")
})
watchFN(function(){
  console.log("自动收集完成开始一下步~")
})

objproxy.name = "xixi"
objproxy.age = 13
console.log(objproxy.age)