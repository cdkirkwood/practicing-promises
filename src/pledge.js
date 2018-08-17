'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise(executor) {
  if (typeof executor !== 'function') throw new TypeError('executor is not a function')

  this._state = 'pending'

  const resolve = this._internalResolve.bind(this)
  const reject = this._internalReject.bind(this)
  executor(resolve, reject)
}

$Promise.prototype._internalResolve = function (data) {
  if (this._state === 'pending') {
    this._state = 'fulfilled'
    this._value = data
  }
}


$Promise.prototype._internalReject = function (err) {
  if (this._state === 'pending') {
    this._state = 'rejected'
    this._value = err
  }
}

$Promise.prototype.resolve = function (data) {
  this._internalResolve(data)
}