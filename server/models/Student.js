const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    second_last_name: {
        type: String,
        required: true
    },
    birth_date: {
        type: String,
        required: true
    },
    birth_place: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    curp: {
        type: String,
        required: true
    },
    email: { type: String },
    event: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    answers: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }]
});

schema.methods.generateCURP = function() {
    const first = this.last_name[0];
    const second = this.getFirstVocal(this.last_name.substring(1, this.last_name.length));
    const third = this.second_last_name[0];
    const fourth = this.name[0];
    const split_date = this.birth_date.split('/');
    const fifth = `${split_date[2]}${split_date[1]}${split_date[0]}`;
    const sixth = this.gender;
    const seventh = this.getStateCode();
    const eighth = this.getFirstInternalConsonant(this.last_name);
    const nineth = this.getFirstInternalConsonant(this.second_last_name);
    const tenth = this.getFirstInternalConsonant(this.name);
    return (first + second + third + fourth + fifth + sixth + seventh + eighth + nineth + tenth).toUpperCase();
};

schema.methods.getFirstVocal = function (word) {
    let vocal;
    for (let i = 0; i < word.length; i++) {
      if (word[i] === 'a' || word[i] === 'e' || word[i] === 'i' || word[i] === 'o' || word[i] === 'u') {
        vocal = word[i];
        break;
      }
    }
    return vocal;
}

schema.methods.getStateCode = function() {
    const states = {
        aguascalientes: 'AG',
        bajacalifornia: 'BC',
        bajacaliforniasur: 'BS',
        campeche: 'CC',
        chiapas: 'CS',
        chihuahua: 'CH',
        ciudaddemexico: 'DF',
        coahuila: 'CL',
        colima: 'CM',
        durango: 'DG',
        guanajuato: 'GT',
        guerrero: 'GR',
        hidalgo: 'HG',
        jalisco: 'JC',
        estadodemexico: 'MC',
        michoacan: 'MN',
        morelos: 'MS',
        nayarit: 'NT',
        nuevoleon: 'NL',
        oaxaca: 'OC',
        puebla: 'PL',
        queretaro: 'QO',
        quintanaroo: 'QR',
        sanluispotosi: 'SP',
        sinaloa: 'SL',
        sonora: 'SR',
        tabasco: 'TC',
        tamaulipas: 'TS',
        tlaxcala: 'TL',
        veracruz: 'VZ',
        yucatan: 'YN',
        zacatecas: 'ZS'
    }
    let temp = this.birth_place;
    let answer = states[temp.replace(/ /g, '').toLowerCase()];
    if (answer === undefined) return '00';
    return answer;
} 

schema.methods.getFirstInternalConsonant = function (word) {
    let consonant;
    for (let i = 1; i < word.length; i++) {
      if (word[i] !== 'a' && word[i] !== 'e' && word[i] !== 'i' && word[i] !== 'o' && word[i] !== 'u') {
        consonant = word[i];
        break;
      }
    }
    return consonant;
}

module.exports = mongoose.model('Student', schema);