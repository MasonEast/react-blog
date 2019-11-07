const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tagsShema = new Schema({
    tag: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
})

const Tags = mongoose.model('tags', tagsShema)

module.exports = {
    async add (tags) {
        let tagsArr = tags.split('，')
        tagsArr.forEach(async item => {
            let result = await Tags.findOne({ tag: item })
            if (result) {
                console.log(result, item)

                Tags.updateOne({ tag: item }, { $inc: { number: 1 } }, { multi: false }, (err, data) => {
                    if (err) console.log(err)
                    console.log(data)
                })
            } else {
                Tags.create({
                    tag: item,
                    number: 1
                })
            }
        })
    },
    async getTags () {
        let result = await Tags.find({})
        return result
    },
    async getTag (id) {
        let result = await Tags.findOne({ _id: id })
        return result
    },
    async deleteTag (tags) {
        let tagsArr = tags.split('，')
        tagsArr.forEach(async item => {
            let result = await Tags.findOne({ tag: item })

            if (result) {
                if (result.number > 1) {
                    Tags.updateOne({ tag: item }, { $inc: { number: -1 } }, { multi: false }, (err, data) => {
                        if (err) console.log(err)
                        console.log(data)
                    })
                } else {
                    console.log('this.deleteTag')
                    Tags.deleteOne({ tag: item }, (err, data) => {
                        if (err) console.log(err)
                        console.log(data)
                    })
                }
            }
        })
    },
}