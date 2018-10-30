"use strict";
const url = "https://maeyler.github.io/JS/data/";


class Student {
    constructor(id, name, gpa) {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
        this.courses = []
    }
    addCourses(...course) {
        for (let c of course) this.courses.push(c)
        return this
    }
    toString() {
        return "Student ID: " + this.id;
    }
}

class Course {
    constructor(name, time, date) {
        this.name = name
        this.time = time
        this.date = date
        this.rooms = []
    }
    addRooms(...room) {
        for (let r of room) this.rooms.push(r)
        return this
    }
    toString() {
        return "Coruse name: " + this.name
    }
}

class Database {

    constructor() {
        this.mapStudent = new Map();
        this.mapCourses = new Map();
    }
    // A random student
    getRandomStudent() {
        let i = Math.trunc(this.mapStudent.size * Math.random());
        return this.mapStudent.get(i);
    }
    // Number of students above a given GPA
    getAboveGPA(num = 0) {
        let student = new Set()
        for (let s of this.mapStudent.values())
            if (s.gpa > num) student.add(s);
        return student
    }
    // Courses taken by a given student
    getStudentCourse(gid) {
        return this.getStudent(gid).courses;
    }
    // Exam schedule for a given student
    examSchedule(gid) {
        let a = this.getStudent(gid);
        let cours = new Set();
        a.courses.forEach(course => {
            course.forEach(name => {
                for (let c of this.mapCourses.values())
                    if (c.name == name) cours.add(c);
            });
        });
        return cours
    }
    // Student list taking a given course
    getStudentByCourse(courseName) {
        let student = new Set()
        for (let s of this.mapStudent.values()) {
            s.courses.forEach(courses => {
                courses.forEach(name => {
                    if (courseName == name) {
                        student.add(s);
                    }
                });
            });
        }
        return student
    }
    // Course list for a given exam room
    roomCourse(examRoom) {
        let student = new Set()
        for (let c of this.mapCourses.values()) {
            c.rooms.forEach(rooms => {
                rooms.forEach(room => {
                    if (examRoom == room) {
                        student.add(c);
                    }
                });
            });
        }
        return student
    }
    // Total number of courses in a given room --> deleted
    roomCoursesNumber(examRoom) {
        return this.roomCourse(examRoom).size;
    }
    getUnderGPA() {
        let student = new Set()
        for (let s of this.mapStudent.values())
            if (s.gpa < num) student.add(s);
        return student
    }

    getStudent(gid) {
        for (let s of this.mapStudent.values())
            if (s.id == gid) return s;
        return 0;
    }
}
let db = new Database()

function parseCourse(line) {
    let b = line.split("\t");
    let name = b[0], time = b[1], date = b[2];
    let rooms = [];
    for (let i = 3; i < b.length; i++)
        rooms.push(b[i]);
    let c = new Course(name, time, date)
    c.addRooms(rooms);
    return c;
}

function parseStudent(line) {
    let b = line.split("\t");
    let id = b[0], name = b[1], gpa = b[2];
    let list = [];
    for (let i = 3; i < b.length; i++)
        list.push(b[i]);
    let s = new Student(id, name, gpa)
    s.addCourses(list);
    return s;
}
function addStudents(txt) {
    let msg = txt.length + " chars, ";
    let a = txt.split("\n");
    msg += a.length + " lines, ";
    for (let i = 0; a.length > i; i++) {
        db.mapStudent.set(i, parseStudent(a[i]));
    }
}
function addCourses(txt) {
    let msg = txt.length + " chars, ";
    let a = txt.split("\n");
    msg += a.length + " lines, ";
    for (let i = 0; a.length > i; i++) {
        db.mapCourses.set(i, parseCourse(a[i]));
    }
}
function readStudent(file) {
    let a = fetch(url + file)
        .then(r => r.text())
        .then(addStudents);
}
function readCourses(file) {
    let a = fetch(url + file)
        .then(r => r.text())
        .then(addCourses);
}
function readData() {
    readStudent("Students.txt");
    readCourses("Courses.txt");
}
readData();



