// console.log(1);

// setTimeout(()=>{
//     console.log(2);   
//     new Promise((resolve,reject)=>{
//     console.log(3);
//     resolve()
// }).then(res=>{
//     console.log(4); 
// })
// })

// new Promise((resolve,reject)=>{
//     resolve()
// }).then(res=>{
//     console.log(5); 
// }).then(res=>{
//     console.log(6);

// })

// new Promise((resolve,reject)=>{
//     console.log(7);
//     resolve()
// }).then(res=>{
//     console.log(8); 
// }).then(res=>{
//     console.log(9);

// })

// setTimeout(()=>{
//     console.log(10);   
//     new Promise((resolve,reject)=>{
//     console.log(11);
//     resolve()
// }).then(res=>{
//     console.log(12); 
// })
// })

// console.log(13);
// 1 7 13 5 8 [6] [9] 2 3 [4] [10] 11 12 


//settimeout 模拟实现 setinterval(带取消)
// function mySetInterval(fn,time){
//   let timer;
//   function interval(){
//     fn();
//     timer = setTimeout(interval,time)
//   }
//   interval();
//   return {
//     cancle:()=>{
//       clearTimeout(timer);
//     }
//   }
// }
// let fn = mySetInterval(function(){
//   console.log(1);
// },1000);

// setTimeout(() => {
//   fn.cancle();
// }, 2000);


//setInterval实现setTimeout
// function mySetTimeout(fn,time){
//   let timer;
//   timer = setInterval(()=>{
//     fn();
//     clearInterval(timer);
//   },time);

// }
// let fn = mySetTimeout(function(){
//   console.log(1);
// },2000);


// 发布订阅模式
// class Emitter{
//   constructor(){
//     this.event = {}
//   }
//   on(type,callback){
//     if(!this.event[type]){
//       this.event[type] = [callback];
//     }
//     else{
//       this.event[type].push(callback)
//     }

//   }
//   off(type,callback){
//     if(!this.event[type]){
//       return
//     }
//     this.event[type] = this.event[type].filter((item)=>{
//       return item !== callback;
//     })
//   }
//   emit(type,...rest){
//     this.event[type] && this.event[type].forEach((fn)=>{
//       fn.apply(this,rest);
//     })
//   }
// }

// let event = new Emitter();
// function handle(value){
//   console.log(value);
// }
// event.on('click',handle)
// event.emit('click',123123);
// event.off('click',handle);
// event.emit('click',123123);

//数组去重
// function uniqueArr(arr){
//   return Array.from(new Set(arr));
// }
// console.log(uniqueArr([1,2,3,1,5]))

//数组扁平化
// function flatter(arr) {
//   if (!arr.length) return;
//   return arr.reduce((pre, cur) =>
//     Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur], []
//   )
// }
// console.log(flatter([1, [2, [3, 4, [5]]], 6, 7]));

// function flatter(arr){
//   if(!arr.length) return;
//   console.log(arr.some((item)=>Array.isArray(item)))
//   while(arr.some((item)=>Array.isArray(item))){
//     // console.log(item);
//     console.log(arr);
//     arr = [].concat(...arr);
//   }
//   return arr;
// }
// console.log(flatter([1,[2,[3,[4],[5]]],[6]]))

//寄生组合继承
// function Parent(name){
//   this.name = name;
//   this.say = ()=>{
//     console.log(this.name);
//   }
// }
// Parent.prototype.play = function(){
//   console.log(222);
// }

// function Children(name){
//   Parent.call(this);
//   this.name = name;
// }

// Children.prototype = Parent.prototype;

// let c = new Children('lisi');
// c.say();
// c.play();

//做一个每个多少秒输出的函数
// class fn {
//   constructor() {
//     this.eventList = [];
//   }
//   add(time, value) {
//     let event = () => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           console.log(value);
//           resolve();
//         }, time);
//       })
//     }
//     this.eventList.push(event);
//   }
//   run() {
//     if(!this.eventList.length){
//       return;
//     }
//     this.eventList.shift()().then(()=>{
//       this.run();
//     });
//   }
// }
// let fn1 = new fn();
// fn1.add(1000, '1');
// fn1.add(1000, '2');
// fn1.add(1000, '3');
// fn1.add(1000, '4');
// fn1.add(1000, '5');
// fn1.add(1000, '6');
// fn1.run();

//手写new操作符
// function myNew(fn, ...args) {
//   let obj = Object.create(fn.prototype);
//   let res = fn.call(obj, ...args);
//   if (res && (typeof res === "object" || typeof res === "function")) {
//     return res;
//   }
//   return obj;
// }
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
//   this.play = ()=>{
//     console.log(this.name)
//   }
// }
// Person.prototype.say = function() {
//   console.log(this.age);
// };
// let p1 = myNew(Person, "lihua", 18);
// console.log(p1.name);
// console.log(p1);
// p1.say();
// p1.play();

//手写apply call bind

// ****************


//深拷贝 考虑symbole情况

// function isObject(val) {
//   return typeof val === "object" && val !== null;
// }

// function deepClone(obj, hash = new WeakMap()) {
//   if (!isObject(obj)) return obj;
//   if (hash.has(obj)) {
//     return hash.get(obj);
//   }
//   let target = Array.isArray(obj) ? [] : {};
//   hash.set(obj, target);
//   Reflect.ownKeys(obj).forEach((item) => {
//     if (isObject(obj[item])) {
//       target[item] = deepClone(obj[item], hash);
//     } else {
//       target[item] = obj[item];
//     }
//   });

//   return target;
// }

// var obj1 = {
//   a: 1,
//   b: { a: 2 }
// };
// var obj2 = deepClone(obj1);
// console.log(obj1);

// function isObject(obj) {

//   return typeof obj == 'object' && obj != null;
// }

// function cloneFunction(func) {
//   const bodyReg = /(?<={)(.|\n)+(?=})/m;
//   const paramReg = /(?<=\().+(?=\)\s+{)/;
//   const funcString = func.toString();
//   if (func.prototype) {
//     console.log('普通函数');
//     const param = paramReg.exec(funcString);
//     const body = bodyReg.exec(funcString);
//     if (body) {
//       console.log('匹配到函数体：', body[0]);
//       if (param) {
//         const paramArr = param[0].split(',');
//         console.log('匹配到参数：', paramArr);
//         return new Function(...paramArr, body[0]);
//       } else {
//         return new Function(body[0]);
//       }
//     } else {
//       return null;
//     }
//   } else {
//     return eval(funcString);
//   }
// }

// function deepClone(obj) {
//   console.log(Reflect.ownKeys(obj));
//   let target = {};
//   Reflect.ownKeys(obj).map(item => {
//     if (isObject(obj[item])) {


//       target[item] = deepClone(obj[item]);

//     }
//     else {
//       if (obj[item] instanceof Function) {
//         target[item] = cloneFunction(obj[item]);
//       }
//       else {
//         target[item] = obj[item]
//       }
//     }
//   })
//   return target;
// }

// let obj = {
//   a: 1,
//   b: {
//     c: 2,
//     d: {
//       e: 3,
//       f: function (name) {
//         console.log(this.e);
//       },
//       g: (age)=>{
//         console.log(this.e);
//       }
//     }
//   }
// }
// let obj2 = deepClone(obj);
// console.log(obj2);

// obj2.b.d.f();
// obj2.b.d.g();

// let fn3 = new Function('name','{console.log(1)}')
// fn3();


//手写instanceof 操作符

// function myInstanceof(left, right) {
//   if (!left) {
//     return false;
//   }

//   if (left.__proto__ == right.prototype) {
//     return true;
//   }

// }

// function fn1() {

// }
// let fn2 = new fn1();
// console.log(myInstanceof(fn2, fn1));


//函数柯里化
// function currying(fn, ...args) {
//   const length = fn.length;
//   let allArgs = [...args];
//   const res = (...newArgs) => {
//     allArgs = [...allArgs, ...newArgs];
//     if (allArgs.length === length) {
//       return fn(...allArgs);
//     } else {
//       return res;
//     }
//   };
//   return res;
// }

// // 用法如下：
// const add = function(a,b,c,d){
//   return a + b + c;
// }
// const a = currying(add, 1);
// a(2,3)
// console.log(a(4))


//排序
// function sort(arr){
//   for(let i = 0; i < arr.length;i++){
//     for(let j = 0;j < arr.length;j++){
//       if(arr[j] > arr[j + 1]){
//         [arr[j],arr[j+1]] = [arr[j + 1],arr[j]]
//       }
//     }
//   }
//   return arr;
// }

// function sort(arr){
//   //先遍历一遍
//   for(let i = 1; i < arr.length;i++){
//     let j = i;
//     let target = arr[i];
//     //然后从后往前比较是否小于当前i的值
//     while(j > 0 && arr[j - 1] > target){
//       arr[j] = arr[j - 1];
//       j--;
//     }
//     arr[j] = target;
//   }
// }


//快速排序
// function sort(arr){
//   if(arr.length<2){
//     return arr;
//   }
//   let index = arr[arr.length - 1];
//   let left = arr.filter((item,i)=>{
//     return item <= index && i != arr.length - 1;
//   })
//   let right = arr.filter(item=>{
//     return item > index;
//   })
//   return [...left,index,...right];
// }

//懒惰的男人
// 输出
//等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper

// class _lazyMan {
//   constructor(name) {
//     this.tasks = [];
//     let task = () => {
//       console.log(`hello ${name}`);
//       this.next();
//     }
//     this.tasks.push(task);
//   }
//   eat(value) {
//     let task = () => {
//       console.log(`eat ${value}`);
//       this.next();
//     }
//     this.tasks.push(task);
//     return this;
//   }
//   sleepFirst(time) {
//     let task = () => {
//       setTimeout(() => {
//         console.log(`sleep ${time}`);
//         this.next();
//       }, time * 1000);
//     }
//     this.tasks.push(task);
//     return this;
//   }
//   next(){
//     let run = this.tasks.pop();
//     console.log(run);
//     run && run();
//   }
// }

// function lazyMan(name){
//   return new _lazyMan(name);
// }

// let man = lazyMan('Hank').eat('supper').sleepFirst(5);
// man.next();


//防抖节流
// function fn(value) {
//   console.log(value);
// }
// console.log(1);

// function fangdou(fn,time){
//   let timer;
//   return function(){
//     const args = arguments;
//     if(timer){
//       clearTimeout(timer);
//     }
//     timer = setTimeout(()=>{
//       fn.apply(this,args);
//     },time)
//   }
// }


//节流
// function debounce(fn, delay) {
//   //默认300毫秒
//   let time = new Date().getTime();
//   let timer;
//   return function () {
//     let now = new Date().getTime();
//     let args = arguments;
//     if (now - time > delay) {
//       time = now;
//       timer = setTimeout(()=>{
//         fn.apply(this,args);
//       })
//     }
//     else{
//       clearTimeout(timer);
//     }
//   };
// }

// let jieliu = debounce(fn, 5000);
// setInterval(function () {
//   jieliu('xixihaha');
// }, 100)

// 最小间隔
// let val1;
// let val2;
// let newArr = arr.sort((n1, n2) => {
//   [val1, val2] = [(Math.abs(n1 - n2) < val1 || !val1), true] && [(Math.abs(n1 - n2)), 1];
//   return n1 - n2
// })




//手写promise
// class Mypromise {
//   constructor(fn) {
//     // 表示状态
//     this.state = "pending";
//     // 表示then注册的成功函数
//     this.successFun = [];
//     // 表示then注册的失败函数
//     this.failFun = [];

//     let resolve = (val) => {
//       // 保持状态改变不可变（resolve和reject只准触发一种）
//       if (this.state !== "pending") return;

//       // 成功触发时机  改变状态 同时执行在then注册的回调事件
//       this.state = "success";
//       // 为了保证then事件先注册（主要是考虑在promise里面写同步代码） promise规范 这里为模拟异步
//       setTimeout(() => {
//         // 执行当前事件里面所有的注册函数
//         this.successFun.forEach((item) => item.call(this, val));
//       });
//     };

//     let reject = (err) => {
//       if (this.state !== "pending") return;
//       // 失败触发时机  改变状态 同时执行在then注册的回调事件
//       this.state = "fail";
//       // 为了保证then事件先注册（主要是考虑在promise里面写同步代码） promise规范 这里模拟异步
//       setTimeout(() => {
//         this.failFun.forEach((item) => item.call(this, err));
//       });
//     };
//     // 调用函数
//     try {
//       fn(resolve, reject);
//     } catch (error) {
//       reject(error);
//     }
//   }

//   // 实例方法 then

//   then(resolveCallback, rejectCallback) {
//     // 判断回调是否是函数
//     resolveCallback =
//       typeof resolveCallback !== "function" ? (v) => v : resolveCallback;
//     rejectCallback =
//       typeof rejectCallback !== "function"
//         ? (err) => {
//           throw err;
//         }
//         : rejectCallback;
//     // 为了保持链式调用  继续返回promise
//     return new Mypromise((resolve, reject) => {
//       // 将回调注册到successFun事件集合里面去
//       this.successFun.push((val) => {
//         try {
//           //    执行回调函数
//           let x = resolveCallback(val);
//           //（最难的一点）
//           // 如果回调函数结果是普通值 那么就resolve出去给下一个then链式调用  如果是一个promise对象（代表又是一个异步） 那么调用x的then方法 将resolve和reject传进去 等到x内部的异步 执行完毕的时候（状态完成）就会自动执行传入的resolve 这样就控制了链式调用的顺序
//           x instanceof Mypromise ? x.then(resolve, reject) : resolve(x);
//         } catch (error) {
//           reject(error);
//         }
//       });

//       this.failFun.push((val) => {
//         try {
//           //    执行回调函数
//           let x = rejectCallback(val);
//           x instanceof Mypromise ? x.then(resolve, reject) : reject(x);
//         } catch (error) {
//           reject(error);
//         }
//       });
//     });
//   }
// }

//******************* */

//硬币最小找零问题

// let value = 18557;
// const moneyArr = [10, 5, 2, 1];
// let obj = {

// }
// function findMondy() {
//   let i = 0;
//   while (value != 0){
//     obj[moneyArr[i]] = parseInt(value / moneyArr[i]);
//     value = value - parseInt(value / moneyArr[i]) * moneyArr[i];
//     i++;
//   }
//   console.log(obj);
// }
// findMondy();

//add方法
// add(1)(2)(3)()=6 add(1,2,3)(4)()=10

// ****************

//将dom 转json
// function dom2Json(domtree) {
//   let obj = {};
//   obj.name = domtree.tagName;
//   obj.attrs = [];
//   Array.from(domtree.attributes).forEach(attr => {
//     obj.attrs.push({
//       [attr.name]:[attr.value] 
//     });
//   })
//   obj.children = [];
//   domtree.childNodes.forEach((child) => {
//     child.tagName && obj.children.push(dom2Json(child));
//   });
//   return obj;
// }
// console.log(dom2Json(document.querySelector('.body-list')))

//实现一个object.is();
// function ObjectIs(obj1, obj2) {
//   if (obj1 === obj2) {
//     return obj1 !== 0 || 1 / obj1 === 1 / obj2;
//   }
//   return obj1 !== obj1 && obj2 != obj2;
// }

//手写ajax
// function myAjax() {
//   return new Promise(function (resolve, reject) {
//     let request = new XMLHttpRequest();
//     request.open('GET', '/getList', false);
//     request.setRequestHeader('x-ldap-user', 'zsm');
//     request.onreadystatechange((state) => {
//       console.log(state);
//       resolve();
//     })
//     request.send(); 
//   })
// }


// 2.0 2.0 2.0
//深拷贝
function deepCopy(obj) {
    if (obj.prototype) {
      var result = isArray(obj) ? [] : {};
      for (let i in obj) {
        result[i] = obj[i];
      }
    }
    else {
      var result = obj;
    }
    return result
  }
  let tag = Symbol('alei');
  let oo1 = {
    name: 1,
    child: [{
      name: 2
    }],
    [tag]: '123'
  }
  let oo = deepCopy(oo1);
  console.log(oo);
  console.log(oo[tag])
  console.log(oo1[tag])
  
  
  
  
  
  