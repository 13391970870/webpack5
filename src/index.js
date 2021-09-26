console.log(9)
//settimeout 实现 setinterval
// function mySetInterval(fn1,time){
//   let timer;
//   function fn(){
//     timer = setTimeout(()=>{
//       fn1();
//       fn();
//     },time)
//   }
//   fn();
//   return {
//     cancel: (()=>{
//       clearTimeout(timer);
//     })
//   }
// }
// mySetInterval(function(){
//   console.log(1);
// },5000)

//setinterval 实现 settimeout
// function mySetTimeout(fn,time){
//   let fn1 = setInterval(()=>{
//     fn();
//     clearTimeout(fn1);
//   },time);
// }

// mySetTimeout(function(){
//  console.log(1); 
// },5000);

//实现一个compose方法🐷
// 用法如下:

// function fn1(x) {
//   return x + 1;
// }
// function fn2(x) {
//   return x + 2;
// }
// function fn3(x) {
//   return x + 3;
// }
// function fn4(x) {
//   return x + 4;
// }
// const a = compose(fn1, fn2, fn3, fn4);
// console.log(a(1)); // 1+4+3+2+1=11

// function compose(...fn){
//   return fn.reduce(function(total,num){
//     return (function(...args){
//       console.log(total);
//       return total(num(...args));
//     })
//   })
// }

//发布订阅模式（注意：发布订阅是一对多的关系）
// class Emitter {
//   constructor() {
//     this.event = {};
//   }
//   on(name, fn) {
//     if (!this.event[name]) {
//       this.event[name] = [fn];
//     }
//     else {
//       this.event[name].push(fn);
//     }
//   }
//   off(name, fn) {
//     if (!this.event[name]) {
//       return;
//     }
//     this.event[name] = this.event[name].filter(item => item != fn);
//   }
//   emit(name, ...rest) {
//     this.event[name] && this.event[name].forEach((fn) => {
//       fn.apply(this, rest);
//     })
//   }
//   once(name, fn) {
//     //嵌套一层函数目的，方便执行完成off掉
//     let fn1 = function (...rest) {
//       fn(rest);
//       this.off(name, fn1);
//     }
//     this.on(name, fn1);
//   }
// }

// let emitter = new Emitter();
// emitter.on('eat', function (value) {
//   console.log(`eat${value}`)
// });
// emitter.emit('eat', '火腿')
// emitter.once('run', function (value) {
//   console.log(`run${value}`);
// })

// emitter.emit('run', 'hah')
// emitter.emit('run', 'heh')

//数组扁平化
// let arr = [1, [2, [3, [4, 5], 6], 7], 8];
// function flatter(arr) {
//   if (!arr.length) return;
//   return arr.reduce(
//     (total, num) =>
//       Array.isArray(num) ? [...total, ...flatter(num)] : [...total, num], []
//   )
// }

// function flatter(arr){
//   while(arr.some(item=>Array.isArray(item))){
//     console.log(arr);
//     arr = [].concat(...arr);
//   }
//   return arr;
// }

// console.log(flatter(arr));


//实现寄生式继承
// function Parent() {
//   this.age = 20;
//   this.say = function () {
//     console.log(this.name);
//   }
// }
// Parent.prototype.play = function () {
//   console.log(this.age);
// }

// function Children() {
//   this.name = 'child';
//   Parent.call(this);
// }
// Children.prototype = Object.create(Parent.prototype);
// Children.prototype.constructor = Children;

// console.log(Children.prototype.constructor === Children)
// let child = new Children();

// console.log(child);
// child.say();
// child.play();

// 实现异步并行promise🐷
// class Scheduler{
//   constructor(limit){
//     this.queue = [];
//     this.maxCount = limit;
//     this.runCounts = 0;
//   }
//   add(time,order){
//     const promiseCreator = ()=>{
//       return new Promise((resolve,reject) =>{
//         setTimeout(()=>{
//           console.log(order);
//           resolve();
//         },time)
//       })
//     }
//     this.queue.push(promiseCreator);
//   }
//   taskStart(){
//     for(let i = 0;i < this.maxCount;i++){
//       this.request();
//     }
//   }
//   request(){
//     if(!this.queue || !this.queue.length || this.runCounts >= this.maxCount){
//       return;
//     }
//     this.runCounts++;
//     this.queue
//     .shift()()
//     .then(()=>{
//       this.runCounts--;
//       this.request();
//     })
//   }
// }
// const scheduler = new Scheduler(3);
// const addTask = (time,order) =>{
//   scheduler.add(time,order);
// }
// addTask(1000,"1");
// addTask(500,"2");
// addTask(300,"3");
// addTask(400,"4");
// scheduler.taskStart();

//实现new🐷
// function myNew(fn, ...args) {
//   let obj = Object.create(fn.prototype);
//   let res = fn.call(obj, ...args);
//   if (res && (typeof res === 'object' || typeof res == 'function')) {
//     return res;
//   }
//   return obj;
// }

// function Parent() {
//   this.name = 'parent';
// }

// let new1 = myNew(Parent);
// console.log(new1);

//手写call
// function myCall(content, ...args) {
//   if (!content) {
//     content = window;
//   }
//   let fn = Symbol();
//   content[fn] = this;
//   return content[fn](args);
// }
// //手写apply
// function myApply(context, args) {
//   if (!context || context === null) {
//     context = window;
//   }
//   let fn = Symbol();
//   context[fn] = this;
//   return context[fn](...args);
// }

// Function.prototype.myCall = myCall;


// Function.prototype.myBind = function (context, ...args) {
//   let sy = Symbol();
//   context[sy] = this;
//   let _this = this;
//   let result = function (...newArgs) {
//     context[sy](...[...args, ...newArgs]);
//   }

//   //是否要继续继承他的原型
//   result.prototype = Object.create(this.prototype);
//   return result
// }
//作为普通函数调用
// let obj1 = {
//   user: 'zsm'
// }
// function fn1(){
//   console.log(this.user);
// }
// let fn2 = fn1.myBind(obj1,123);
// fn2();

//深拷贝
function deepClone(object){

}



