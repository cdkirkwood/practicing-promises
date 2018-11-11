'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise(executor) {
  this._state = 'pending'
  //this._value = null
  this._handlerGroups = []
  const resolve = this._internalResolve.bind(this)
  const reject = this._internalReject.bind(this)
  executor(resolve, reject)
}

$Promise.prototype._internalResolve = function (data) {
  if (this._state === 'pending') {
    this._state = 'fulfilled'
    this._value = data
    this._invokeHandlers()
  }
}

$Promise.prototype._internalReject = function (reason) {
  if (this._state === 'pending') {
    this._state = 'rejected'
    this._value = reason
    this._invokeHandlers()
  }
}

$Promise.prototype.then = function (successCb, errorCb) {
  this._handlerGroups.push({successCb, errorCb})
  if (this._state === 'fulfilled' || this._state === 'rejected') this._invokeHandlers()
}

$Promise.prototype._invokeHandlers = function() {
  while (this._handlerGroups.length) {
    const curHandler = this._handlerGroups.shift()
    if (this._state === 'fulfilled') {
      curHandler.successCb(this._value)
    }
    if (this._state === 'rejected') {
      curHandler.errorCb(this._value)
    }
  }
}

$Promise.prototype.catch = function(errorCb) {
  this.then(null, errorCb)
}

const testPromise = new $Promise(() => {})

testPromise.then((num) => num + 5)

testPromise._internalResolve((6))

/*
class $Promise {
  constructor(executor) {
    this._state = 'pending'
    //this._value = null
    const resolve = this._internalResolve.bind(this)
    const reject = this._internalReject.bind(this)
    executor(resolve, reject)
  }

  _internalResolve(data) {
    if (this._state === 'pending') {
      this._state = 'fulfilled'
      this._value = data
    }
  }

  _internalReject(reason) {
    if (this._state === 'pending') {
      this._state = 'rejected'
      this._value = reason
    }
  }

}
*/
