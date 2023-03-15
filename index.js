// 'use strict'

// УРОК. Неявное связывание
// let value = 42;

// function something () {
//     return this.value
// }
// something(); // undefined  или TypeError при 'use strict'
// ________________________________

// let object = {
//     value: 42,
//     getValue: function () {return this.value},
// }
// console.log(object.getValue()) // 42
// ________________________________


// УРОК. Неявная потеря this 
// let method = object.getValue
// console.log(method());
// ________________________________

// УРОК. Явное связывание при помощи call/apply/bind
// let method = object.getValue
// console.log(method.call(object));
// ________________________________

// УРОК. Привязка контекста call/apply/bind
// let user = {
//     setLog(name, age) {
//         this.name = name
//         this.age = age
//     },
// }

// let newFunc = user.setLog
// 1. newFunc.call(user, 'Vasya', 23)
// 2. newFunc.apply(user, ['Vasya', 23])
// 3. newFunc.bind(user)('Vasya', 23)
// console.log(user);
// ________________________________

// ПРИМЕР С LearnJavaScript 
//   let user = {
//     firstName: "Вася",
//     setSecondName(sn) {this.secondName = sn},
//     sayHi() {
//       console.log((`Привет, ${this.firstName} ${this.secondName}!`));
//     }
//   };
//   let hi = user.sayHi.bind(user); // (*)
//   user.setSecondName.bind(user)('Иванов')
//   hi(); // Привет, Вася!
//   setTimeout(hi, 1000); // Привет, Вася!
// ________________________________

// УРОК. Кража метода
// let div = document.getElementsByTagName('div')
// let newDiv = Array.prototype.slice.call(div, 1, 5) // метод slice нельзя вызвать отдельно без Array.prototype, иначе .slice is not function
// console.log(div);
// console.log(newDiv);
// ________________________________

// ПРОБЛЕМА ПОТЕРИ КОНТЕКСТА
// Использование bind
// let object = {
//     value: 42,
//     method: function () {
//         let callback = function () {
//             console.log(this.value)
//             setTimeout(callback, 200)
//         }
//     }
// }
// object.method(); // undefined

// let object = {
//     value: 42,
//     method: function () {
//         let callback = function () { console.log(this.value) }
//             setTimeout(callback.bind(this), 200)
//     }
// };
// object.method(); // 42
// ________________________________

// ЛЕКСИЧЕСКОЕ ОКРУЖЕНИЕ self
// let obj = {
//     value: 2023,
//     method: function () {
//         let self = this
//         let callback = function () { console.log(self.value)}
//         setTimeout(callback, 200)
//     }
// }
// obj.method() // 2023 
// ________________________________

// ИСПОЛЬЗОВАНИЕ СТРЕЛОЧНОЙ ФУНКЦИИ
// let obj = {
//         value: 2023,
//         method: function () {
//             let callback = () => {console.log(this.value)}
//             setTimeout(callback, 200)
//         }
//     }
//     obj.method() // 2023 
// ________________________________

// КЛАСС ВСТРОЕННОГО ОБЪЕКТА
// const array = [];
// const date = new Date();
// const error = new Error();
// const obj = {};

// Object.prototype.toString.call(array) // '[object Array]'
// Object.prototype.toString.call(date)  // '[object Date]'
// Object.prototype.toString.call(error) // '[object Error]'
// Object.prototype.toString.call(obj)   // '[object Object]'
// ________________________________

// EXTENSIBLE Допустимо ли добавление новых свойств
// const obj = {
//     value: 2023
// }
// Object.preventExtensions(obj);
// Object.isExtensible(obj) // false
// obj.age = 23;  // ошибка в 'use ctrict' / без строгого режима игнорирует добавление
// console.log(obj);

// PROTOTYPE 
// Свойства-данные
// let obj = {};
// Object.defineProperty(obj, 'property', {
//     value: 2023, // свойство
//     writable: true,
//     enumerable: true,
//     configurable: true
// })
// console.log(obj) // { property: 2023}

// let obj = {};
// Object.defineProperty(obj, 'method', {
//     value: function () {}, // метод
//     writable: true,
//     enumerable: true,
//     configurable: true
// })
// console.log(obj) // { method: [Function: value]}

// let obj = {}

// Object.defineProperty(obj, 'value', { value: 2023, configurable: true})
// console.log(Object.getOwnPropertyDescriptor(obj, 'value'))
// Object.defineProperty(obj, 'value', { writable: true})
// console.log(Object.getOwnPropertyDescriptor(obj, 'value'))
// ________________________________

// СВОЙСТВА-АКСЕССОРЫ

// старый стандарт:
// let obj = {}
// Object.defineProperty(obj, 'property', {
//     get: function () { return this.value },
//     set: function (value) { this.value = value},
//     enumerable: true,
//     configurable: true,
// })
// obj.property = 2023 // вызоваем set и присваиваем value 2023
// obj.property // вызов get
// obj // { property: [Getter/Setter], value: 2023 }
// ________________________________

// новый стандарт:
// let obj = {
//     get property () {
//         return this.value
//     },
//     set property (value) {
//         this.value = value
//     }
// };
// obj.property = 2023; // value = 2023;
// obj.property; // 2023
// ________________________________

// УСТАНОВКА PROTOTYPE
// 1. Явно через __proto__
// let obj = {};
// let prototype = {value: 2023};
// obj.__proto__ = prototype;
// console.log(obj.value); // 2023

// 2. Явно через SetPrototypeOf
// let obj = {};
// let prototype = {value: 2023};
// Object.setPrototypeOf(obj, prototype);
// console.log(obj.value); // 2023

// 3. Явно через Object.create
// let prototype = { value: 2023};
// let obj = Object.create(prototype);
// console.log(obj.value); // 2023

// 4. Функция-конструктор и Prototype
// const proto = {value: 2023}
// function Class () {}
// Class.prototype = proto;

// let obj = new Class();
// obj.value // 2023

// ДИНАМИЧНОСТЬ prototype 
// function Class () {}
// Class.prototype = {}

// const obj = new Class ();
// Class.prototype.value = 42 // в прототип помещаем свойство value = 42 и оно передается в дочерний объект
// obj.value // 42
// obj.__proto__ === Class.prototype // false


// ПОТЕРЯ Prototype
// function Class () {}
// Class.prototype = {}

// const obj = new Class () // Свойство [[Prototype]] выставляется в момент вызова new
// obj.value // undefined
// Class.prototype = { value: 42} // Записываем в Class.prototype новый объект
// obj.value // undefined поскольку ссылка на объект создавалась на строке 226 в момент вызова new, а на 228 строке мы создали новый объект
// obj.__proto__ === Class.prototype // false

// ЗАТЕНЕНИЕ СВОЙСТВ prototype
// const proto = {value: 42}
// const obj = Object.create(proto)

// // obj.hasOwnProperty('value') // false. ищем свойство value внутри объекта obj не поднимаясь по прототипу
// // obj.value // 42. Не находя значения в obj поднимаемся по прототипу находим 42

// obj.value = 137 // Создаем новое свойство value в объекте obj
// obj.hasOwnProperty('value') // true
// obj.value // 137. Значение затеняется и выдает собственное свойство объекта obj
// obj.__proto__.value // 42

// СВОЙСТВО Constructor
// function Class () {}
// Class.prototype // {constructor: ƒ}
// const firstObject = new Class ()
// const secondObject = new firstObject.constructor

// ООП в JavsScript 
// !!! КНИГА !!! Закас/Javascript для профессиональных веб-разработчиков/Глава 6: Объектно-ориентированное программирование

// const promise = new Promise ((resolve) => { resolve(42)})
// promise.then((value) => {return value + 1})
// .then((value) => { 
//     console.log(value)
//     return value + 2
// })
// .then((value) => { console.log(value)})
// .then((value) => { console.log(value)})