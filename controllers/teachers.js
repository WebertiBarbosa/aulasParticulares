const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')
const { escolaridade } = require('../utils')

exports.index = function(req, res){
    return res.render('teachers/index', {teachers: data.teachers})
}

// show
exports.show = function(req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        escolaridade: escolaridade(foundTeacher.escolaridade),
        services: foundTeacher.services.split(','),
        created_at: new Intl.DateTimeFormat("pt-br").format(foundTeacher.created_at),      

    }

    return res.render("teachers/show", { teacher})
}

// create
exports.create = function(req, res){
    return res.render('teachers/create')
}

// post
exports.post = function(req, res){

    const keys = Object.keys(req.body)

    for(key of keys){
        if (req.body[key] == ""){
            return res.send('Por favor, preencha todos os campos!')
        }
    }

    let { avatar_url, birth, escolaridade, type,  name, services } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    

    // [{...}]
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        escolaridade,
        type,
        services,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) { 
            return res.send('write file error!') 
        
        }
        return res.redirect('teachers')

    })

    // return res.send(req.body)
}

// edit
exports.edit = function(req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    
    return res.render('teachers/edit', { teacher })
}

// put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundTeacher) {
        if (id == teacher.id) {
            index = foundTeacher
            return true
        }
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write error!')

        return res.redirect(`/teachers/${id}`)
    })
}

// delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTeacher = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!") 

        return res.redirect('/teachers')


    })

}