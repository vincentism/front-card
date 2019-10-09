// this 
// es6的方法实现发布订阅
// 发布订阅与观察者的区别 https://www.cnblogs.com/viaiu/p/9939301.html
// 在Observer模式中，Observers知道Subject，同时Subject还保留了Observers的记录。然而，在发布者/订阅者中，发布者和订阅者不需要彼此了解。他们只是在消息队列或代理的帮助下进行通信。
// 在Publisher / Subscriber模式中，组件是松散耦合的，而不是Observer模式。
// 观察者模式主要以同步方式实现，即当某些事件发生时，Subject调用其所有观察者的适当方法。发布者/订阅者在大多情况下是异步方式（使用消息队列）。
// 观察者模式需要在单个应用程序地址空间中实现。另一方面，发布者/订阅者模式更像是跨应用程序模式。

//  简单发布订阅示例
var salesOffices = {}

salesOffices.clientList = []

salesOffices.listen = function (fn) {
    this.clientList.push(fn)
}

salesOffices.trigger = function () {
    for (var i = 0, fn; fn = this.clientList[i++];) {
        fn.apply(this, arguments)
    }
}

salesOffices.listen(function(arg1, arg2) {  
    console.log(arg1, arg2)
})

salesOffices.trigger(2000, 30)


// 特定事件发布订阅示例
var salesOffices = []

salesOffices.clientList = {}
salesOffices.listen = function(key, fn) {
    if (!this.clientList[key]) {
        this.clientList[key] = []
    }
    this.clientList[key].push(fn)
}

salesOffices.trigger = function () {
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key]

    if (!fns || fns.length === 0) {
        return false
    }
    for (var i = 0, fn; fn = fns[i++];) {
        fn.apply(this, arguments)
    }
}

salesOffices.listen('squareMeter88', function(price, squareMeter) {
    console.log(`价格${price}`);
})
  
salesOffices.listen('squareMeter110', function(price, squareMeter) {
    console.log(`价格${price}`)
    console.log(`squareMeter = ${squareMeter}`)
})

salesOffices.trigger('squareMeter88', 2000000);
salesOffices.trigger('squareMeter110', 3000000);


// 发布订阅的通用实现
// 添加了remove方法
var event = {
    events: [],
    listen: function(key, fn) {
        if (!this.events[key]) {
            this.events[key] = []
        }
        this.events[key].push(fn)
    },
    trigger: function() {
        var key = Array.prototype.shift.call(arguments),
        fns = this.events[key]
    
        if (!fns || fns.length === 0) {
            return false
        }

        for (var i = 0; i < fns.length; i++) {
            fns[i].apply(this, arguments)
        }
    },
    remove: function (key, fn) {
        if (!this.events[key]) {
            return false
        }
        if (!fn) {
            this.events[key] = []
        } else {
            for (var l = this.events[key].length - 1; l >= 0; l--) {
                var _fn = this.events[key][l]
                if (_fn === fn) {
                    this.events[key].splice(l, 1)
                }
            }
        }

    }
}

event.listen('event1', fn1 = function(){
    console.log(1)
})

event.listen('event1', function(){
    console.log(2)
})

event.listen('event2', function(arg1){
    console.log(arg1)
})

event.trigger('event1')

console.log('event.events', event.events)

event.remove('event1', fn1)

console.log('event.events', event.events)
