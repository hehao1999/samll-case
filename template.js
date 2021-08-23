/** 实现简易模块引擎函数
 * 1、定义模板结构
 * 2、预调用模板引擎
 * 3、封装template函数
 * 4、导入并使用自定义模板引擎
*/

const data = {
    name: 'He',
    age: 22,
    gender: 'man'
}


/**
 * 简易模块引擎函数
 * @param {string} id
 * @param {dictionary} data
 * @return {string} 
 */
function template(id, data) {
    const pattern = /{{\w*}}/;
    let str = document.getElementById(id).innerHTML;
    let pattResult = null;

    while (pattResult = pattern.exec(str)) {
        str = str.replace(pattResult[0], data[pattResult[0].replace(/{/g, '').replace(/}/g, '')]);
    }
    return str;
}


const htmlStr = template('tpl-user', data);
console.log(document.getElementById('tpl-user'))
document.getElementById('user-box').innerHTML = htmlStr;

//TODO: 实现模块引擎标准语法