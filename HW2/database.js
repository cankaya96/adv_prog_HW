class Course {
    constructor(name, time, date, room) {
        this.name = name
        this.time = time
        this.date = date
        this.room = room
    }

    toString () {
        return (this.name+' lesson at '+this.time+' '+this.date)
    }
}
class Student {
    constructor (id, name, gpa, courses) {
        this.id = id
        this.name = name
        this.gpa = gpa
        this.courses = courses
    }
    toString () {
        return (this.id+' '+this.name)
    }
}

class Database {
    constructor () {
        this.courses = new Map()
        this.students = new Map()
        this.readCourses()
        this.readStudents()
    }

    addCourses(txt) {
        let msg = 'Courses: ' + txt.length + ' chars, ';
        let a = txt.split('\n');
        msg += a.length + ' lines';
        console.log(msg)

        //create course object
        const courseList = a.map(item => {
            let word = item.split('\t')
            const course = new Course (word[0], word[1], word[2], word.slice(3))
            return course
        })

        //add to courses map
        for (var fromList in courseList) {
            if(courseList[fromList].code !== '' || undefined) {
                this.courses.set(courseList[fromList].code, courseList[fromList])
            }
        }
    }

    addStudents (txt) {
        let msg = 'Students: ' + txt.length + ' chars, ';
        let a = txt.split('\n')
        msg += a.length + ' lines'
        console.log(msg)

        //create student object
        const studentList = a.map(item => {
            let word = item.split('\t')
            const student = new Student (word[0], word[1], word[2])

            //find the courses in map which takes student
            for (var slc in word.slice(3)){
                student.courses.push(this.courses.get(word.slice(3)[slc]))
            }

            return student
        })

        //add to students map
        for (var fromList in studentList) {
            if(studentList[fromList].id !== '' || undefined) {
                this.students.set(studentList[fromList].id, studentList[fromList])
            }
        }
    }
	
	readCourses () {
        var url = "https://maeyler.github.io/JS/data/Courses.txt"
        fetch(url)
        .then(res => res.text()) 
        .then(res => [
            this.addCourses(res)
        ])
    }

    readStudents () {
        var url = "https://maeyler.github.io/JS/data/Students.txt"
        fetch(url)
        .then(res => res.text())
        .then(res => [
            this.addStudents(res)
        ])
    }
}