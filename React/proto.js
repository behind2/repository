/**
 * @quote https://github.com/creeperyang/blog/issues/9
 * 对象的__proto__指向自己构造函数的prototype
 * 最后总结：先有Object.prototype（原型链顶端），Function.prototype继承Object.prototype而产生，
 * 最后，Function和Object和其它构造函数继承Function.prototype而产生。
 */