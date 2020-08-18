module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 ||
            month == 0 &&
            today.getDate() <= birthDate.getDate()) {
                age = age - 1
        }
        return age
    },

    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }


    },

    escolaridade: function graduation(escolaridade) {
        if (escolaridade == 'Ensino Médio Completo') {
            escolaridade = 'medio'
        }
        if (escolaridade == 'Ensino Superior Completo') {
            escolaridade = 'superior'
        }
        return escolaridade
    },

    schoolYear: function grade(schoolYear) {
        if (schoolYear == "5º SF") {
            schoolYear = '5º Ano do Ensino Fundamental'
        }

        if (schoolYear == "6º SF") {
            schoolYear = '6º Ano do Ensino Fundamental'
        }

        if (schoolYear == "7º SF") {
            schoolYear = '7º Ano do Ensino Fundamental'
        }   

        if (schoolYear == "8º SF") {
            schoolYear = '8º Ano do Ensino Fundamental'
        }

        if (schoolYear == "9º SF") {
            schoolYear = '9º Ano do Ensino Fundamental'
        }

        if (schoolYear == "1º EM") {
            schoolYear = '1º Ano do Ensino Médio'
        }

        if (schoolYear == "2º EM") {
            schoolYear = '2º Ano do Ensino Médio'
        }

        if (schoolYear == "3º EM") {
            schoolYear = '3º Ano do Ensino Médio'
        }

        return schoolYear

    }


    
}