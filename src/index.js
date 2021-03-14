/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let number in array) {
        fn(array[number], number, array);
    }

}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var newArray = [];
    for (let number in array) {
        newArray.push(fn(array[number], number, array));

        //newArray.push(array[number] * array[number]);
    }
    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */



function reduce(array, fn, initial) {

    var total;

    if (initial == undefined) {
        total = array[0];

        for (var i = 1; i < array.length; i++) {
            total = fn(total, array[i], i, array);

        }
    } else {
        total = initial;
        for (var i = 0; i < array.length; i++) {
            total = fn(total, array[i], i, array);


        }

    }
    return total;


}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let upperArray = [];
    for (var key in obj) {
        upperArray.push(key.toUpperCase());
    }
    return upperArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let newArray = [];
    from < 0 ? from = array.length + from : from = from;
    to < 0 ? to = array.length + to : to = to;
    from < 0 ? from = 0 : from = from;
    to > array.length - 1 ? to = array.length : to = to;

    for (var i = from; i < to; i++) {
        newArray.push(array[i]);
    }
    return newArray;
}



/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        get(target, propKey) {
            return target[propKey] * target[propKey];
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};