const mongoose = require('mongoose')
const {DateTime} = require('luxon')

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
})

// This can be useful for simplifying data access and manipulation in your application without actually storing the computed field in the database.

AuthorSchema.virtual('name').get(function(){

    let fullName = ''
    if(this.first_name && this.family_name){
        fullName = `${this.family_name}, ${this.first_name}`
    }

    return fullName
})


AuthorSchema.virtual('url').get(function(){
    return `/catalog/author/${this.id}`
})

AuthorSchema.virtual('due_back_formatted').get(function () {
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Author', AuthorSchema)

