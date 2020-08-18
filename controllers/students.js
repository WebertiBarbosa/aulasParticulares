const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')
const { schoolYear } = require('../utils')

exports.index = function(req, res){
    return res.render('students/index', {students: data.students})
}



// show
exports.show = function(req, res) {
    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        schoolYear: schoolYear(foundStudent.schoolYear),

    }

    return res.render("students/show", { student})
}

// create
exports.create = function(req, res){
    return res.render('students/create')
}

// post
exports.post = function(req, res){

    const keys = Object.keys(req.body)

    for(key of keys){
        if (req.body[key] == ""){
            return res.send('Por favor, preencha todos os campos!')
        }
    }

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()

    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if (lastStudent) {
        id = lastStudent.id + 1
    }

    // [{...}]
    data.students.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) { 
            return res.send('write file error!') 
        
        }
        return res.redirect('students')

    })

    // return res.send(req.body)
}

// edit

exports.edit = function(req, res) {
    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    
    return res.render('students/edit', { student })
}

// put

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundStudent) {
        if (id == student.id) {
            index = foundStudent
            return true
        }
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write error!')

        return res.redirect(`/students/${id}`)
    })
}

// delete

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredStudent = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudent

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!") 

        return res.redirect('/students')


    })

}