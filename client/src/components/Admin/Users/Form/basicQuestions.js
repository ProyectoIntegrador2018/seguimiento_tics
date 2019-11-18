const basicQuestions = [
    {
        label: 'Nombre',
        type: 'text',
        name: 'name',
        placeHolder: 'Ingrese su(s) nombres.',
        renderType: 'input'
    },
    {
        label: 'Primer Apellido',
        type: 'text',
        name: 'firstLastName',
        placeHolder: 'Ingrese su primer apellido.',
        renderType: 'input'
    },
    {
        label: 'Segundo Apellido',
        type: 'text',
        name: 'secondLastName',
        placeHolder: 'Ingrese su segundo apellido.',
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
                _id: 'h'
            },
            {
                name: 'Femenino',
                _id: 'm'
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
                id: 'public'
            },
            {
                name: 'Privada',
                id: 'private'
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

module.exports = { basicQuestions };