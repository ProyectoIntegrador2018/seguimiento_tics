const questions = [
    {
        label: 'Nombre',
        type: 'text',
        name: 'name',
        placeHolder: 'Ingrese su(s) nombres.',
        renderType: 'input'
    },
    {
        label: 'Apellidos',
        type: 'text',
        name: 'lastNames',
        placeHolder: 'Ingrese sus apellidos.',
        renderType: 'input'
    },
    {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeHolder: 'Ingrese su email.',
        renderType: 'input'
    },
    {
        label: 'Domicilio',
        type: 'address',
        name: 'address',
        placeHolder: 'Domicilio actual',
        renderType: 'input'
    },
    {
        label: 'Ciudad',
        type: 'text',
        name: 'city',
        placeHolder: 'Ciudad del domicilio',
        renderType: 'input'
    },
    {
        label: 'Estado',
        type: 'text',
        name: 'state',
        placeHolder: 'Estado del domicilio',
        renderType: 'input'
    },
    {
        label: 'Código Postal',
        type: 'text',
        name: 'pc',
        placeHolder: 'Código postal del domicilio',
        renderType: 'input'
    },
    {
        label: 'País',
        type: 'text',
        name: 'country',
        placeHolder: 'País del domicilio',
        renderType: 'input'
    },
    {
        label: 'Teléfono celular',
        type: 'number',
        name: 'mobileNumber',
        placeHolder: 'Su número de teléfono celular',
        renderType: 'phone'
    },
    {
        label: 'Fecha de nacimiento',
        type: 'date',
        name: 'birthday',
        renderType: 'date'
    },
    {
        label: 'Edad',
        type: 'number',
        name: 'age',
        placeHolder: 'Su edad actual',
        renderType: 'input'
    },
    {
        label: 'Sexo',
        name: 'sex',
        id: 'sex',
        renderType: 'select',
        options: [
            {
                name: 'Masculino',
                value: 'male'
            },
            {
                name: 'Femenino',
                value: 'female'
            }
        ]
    },
    {
        label: 'Nombre de la escuela',
        type: 'text',
        name: 'schoolName',
        placeHolder: 'Ingrese el nombre de la escuela',
        renderType: 'input'
    },
    {
        label: 'Tipo de escuela',
        name: 'schoolType',
        id: 'schoolType',
        renderType: 'select',
        options: [
            {
                name: 'Publica',
                value: 'public'
            },
            {
                name: 'Privada',
                value: 'private'
            }
        ]
    },
    {
        label: 'Grado escolar',
        type: 'text',
        name: 'schoolGrade',
        placeHolder: 'Ingrese su grado escolar',
        renderType: 'input'
    },
    {
        label: 'Nombre del tutor',
        type: 'text',
        name: 'tutorName',
        placeHolder: 'Nombre de su tutor',
        renderType: 'input'
    },
    {
        label: 'Teléfono del tutor',
        type: 'number',
        name: 'tutorPhone',
        placeHolder: 'Número de teléfono del tutor',
        renderType: 'phone'
    },
    {
        label: 'Email del tutor',
        type: 'email',
        name: 'tutorMail',
        placeHolder: 'Email de su tutor',
        renderType: 'input'
    },
    {
        label: '¿Has tomado alguna clase de programación, desarrollo de videojuegos o apps antes?',
        name: 'hasTakenClass',
        id: 'hasTakenClass',
        renderType: 'select',
        options: [
            {
                name: 'No',
                value: 'no'
            },
            {
                name: 'Sí',
                value: 'si'
            }
        ]
    },
    {
        label: 'Empresa',
        type: 'text',
        name: 'company',
        placeHolder: 'Nombre de la empresa',
        renderType: 'input'
    },
    {
        label: '¿Participaste en alguna edición anterior de ApportaTeen?',
        name: 'participatedApportaTeen',
        id: 'participatedApportaTeen',
        renderType: 'select',
        options: [
            {
                name: 'No',
                value: 'no'
            },
            {
                name: 'Sí',
                value: 'si'
            }
        ]
    },
    {
        label: '¿En tu escuela has tomado cursos del programa Diseño Escalable de Juegos: Chic@s Code?',
        name: 'hasTakenChicosCode',
        id: 'hasTakenChicosCode',
        renderType: 'select',
        options: [
            {
                name: 'No',
                value: 'no'
            },
            {
                name: 'Sí',
                value: 'si'
            }
        ]
    },
    {
        label: '¿Requieres beca?',
        name: 'requiresScholarship',
        id: 'requiresScholarship',
        renderType: 'select',
        options: [
            {
                name: 'No',
                value: 'no'
            },
            {
                name: 'Sí',
                value: 'si'
            }
        ]
    },
    {
        label: '¿Cómo te enteraste del evento?',
        type: 'text',
        name: 'howFoundOut',
        placeHolder: 'Redes Sociales, amigos, etc',
        renderType: 'input'
    }
]

const eventQuestions = [
    {
        id: 'evento1',
        name: 'Evento 1',
        questions: [
            {
                text: 'Pregunta 1',
                id: 1
            },
            {
                text: 'Pregunta 2',
                id: 2
            }
        ]
    },
    {
        id: 'evento2',
        name: 'Evento 2',
        questions: [
            {
                text: 'Pregunta 3',
                id: 3
            },
            {
                text: 'Pregunta 4',
                id: 4
            }
        ]
    },
    {
        id: 'evento3',
        name: 'Evento 3',
        questions: [
            {
                text: 'Pregunta 5',
                id: 5
            },
            {
                text: 'Pregunta 6',
                id: 6
            }
        ]
    }
]

module.exports = { questions, eventQuestions };