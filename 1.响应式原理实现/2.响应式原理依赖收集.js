class Depend {
  constructor(){
    this.reactivefn = []
  }
  collectReactivefn(reactiveFN) {
    this.reactivefn.push(reactiveFN)
  }
  notify() {
    this.reactivefn.forEach(reactivefn => {
      reactivefn()
    })
  }
}

const depend = new Depend()
function watchFN(reactivefn){
 depend.collectReactivefn(reactivefn)
}

let obj = {
  name: "zizi",
  age: 18
}

watchFN(function(){
  const newname = obj.name
  console.log(111)
  console.log(newname)
  console.log("name已修改")
})

obj.name = "xixi"
depend.notify()