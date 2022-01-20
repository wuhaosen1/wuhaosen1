class Depend{
  constructor(){
    this.reativeFn = []
  }
  collectDepend(reactiveFN){
    this.reativeFn.push(reactiveFN)
  }
  notify(){
    this.reativeFn.forEach(fn => {
      fn()
    })
  }
}

const targetdepend = new WeakMap()
function GetDepend(target,key){
  //根据target获取map对象
  let map = targetdepend.get(target)
  if(!map){
     map = new Map()
  }
  targetdepend.set(target,key)

  //根据map获取key
  let depend = map.get(key)
  if(!depend){
    depend = new Depend()
    map.set(key,depend)
  }
  return depend
}

//封装响应式函数
const depend = new Depend()
function watchFn(fn) {
  depend.collectDepend(fn)
}



obj1 = {
  name: "xixi",
  age: 18
}

obj2 = {
  name: "zizi",
  age: 17
}

const obj1proxy = new Proxy(obj1,{
  get: function(target,key,reciver ){
    return Reflect.get(target,key,reciver)
  },
  set: function(target,key,newvalue,reciver) {
    Reflect.set(target,key,newvalue,reciver)
    const depend = GetDepend(target,key)
    depend.notify()
  }
})
const obj2proxy = new Proxy(obj2,{
  get: function(target,key,reciver ){
    return Reflect.get(target,key,reciver)
  },
  set: function(target,key,newvalue,reciver) {
    Reflect.set(target,key,newvalue,reciver)
    const depend = GetDepend(target,key)
    depend.notify()
  }
})



watchFn(function(){
  console.log(obj1proxy.name)
})
watchFn(function(){
  console.log(obj2proxy.name)
})


obj1proxy.name = "haha"
obj2proxy.name = "lala"
console.log(obj1proxy.name)
console.log(obj2proxy.name)