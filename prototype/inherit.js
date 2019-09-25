
// new PrimaryStudent() ----> PrimaryStudent.prototype ----> Student.prototype ----> Object.prototype ----> null

function Student() {}

function PrimaryStudent(props) {
	Student.call(this, props)
	this.grade = props.grade || 1
}

function F() {}

F.prototype = Student.prototype;

PrimaryStudent.prototype = new F()

console.log(PrimaryStudent.prototype.constructor)

// 为何要修正构造函数
PrimaryStudent.prototype.constructor = PrimaryStudent

console.log(PrimaryStudent.prototype.constructor)

PrimaryStudent.prototype.say = function() {
	console.log(this.grade)
}

const st = new PrimaryStudent({
	name: 'xiaoming',
	grade: 100
})

st.say()

console.log(st.__proto__ === PrimaryStudent.prototype)
console.log(st.__proto__.__proto__ === Student.prototype)

console.log(st instanceof PrimaryStudent)
console.log(st instanceof Student)


// 继承方法
function inherit(child, parent) {
	var F = function () {}
	F.prototype = Student.prototype
	child.prototype = new F()
	child.prototype.constructor = child
}
