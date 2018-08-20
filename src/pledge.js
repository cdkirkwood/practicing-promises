'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise(executor) {
  if (typeof executor !== 'function') throw new TypeError('executor is not a function')

  this._state = 'pending'
  this._handlerGroups = []

  const resolve = this._internalResolve.bind(this)
  const reject = this._internalReject.bind(this)
  executor(resolve, reject)
}

$Promise.prototype._internalResolve = function (data) {
  if (this._state === 'pending') {
    this._state = 'fulfilled'
    this._value = data
    this.callHandlers()
  }
}

$Promise.prototype._internalReject = function (err) {
  if (this._state === 'pending') {
    this._state = 'rejected'
    this._value = err
    this.callHandlers()
  }
}

$Promise.prototype.then = function (successCb, errorCb) {
  const handlerObj = {}
  if (typeof successCb === 'function') handlerObj.successCb = successCb
  if (typeof successCb !== 'function') handlerObj.successCb = false
  if (typeof errorCb === 'function') handlerObj.errorCb = errorCb
  if (typeof errorCb !== 'function') handlerObj.errorCb = false
  this._handlerGroups.push(handlerObj)
  if (this._state === 'fulfilled' || this._state === 'rejected') {
    this.callHandlers()
  }
}

$Promise.prototype.callHandlers = function() {
  while (this._handlerGroups.length) {
    const firstHandler = this._handlerGroups[0]
    if (firstHandler.successCb && this._state === 'fulfilled') {
      firstHandler.successCb(this._value)
    }
    if (firstHandler.errorCb && this._state === 'rejected') {
      firstHandler.errorCb(this._value)
    }
    this._handlerGroups.shift()
  }
}

$Promise.prototype.catch = function(callback) {
  return this.then(null, callback)
}