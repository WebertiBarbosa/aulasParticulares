const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')
const { escolaridade } = require('./utils')


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
        birth: date(foundTeacher.birth)
    }

    
    return res.render('teachers/edit', { teacher })
}