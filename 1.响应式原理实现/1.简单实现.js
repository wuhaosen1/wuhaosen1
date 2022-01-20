let reactiveFN = []

function watchFN(fn) {
  reactiveFN.push(fn)
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
reactiveFN.forEach((fn) => {
  fn()
})