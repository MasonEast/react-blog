const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: +Date.now()
    }
})

const Blog = mongoose.model("blog", BlogSchema)


module.exports = {
    async add (title, author, content, tags, status) {
        let tagsArr = tags.split('，')
        let statusc = Number(status)
        return await Blog.create({
            title,
            author,
            content,
            status: statusc,
            tags: tagsArr
        })
    },

    async getBlogs () {
        let result = await Blog.find({}).sort({ _id: -1 })
        return result
    },
    async getBlogById (id) {
        let result = await Blog.findOne({ _id: id })
        return result
    },
    async getBlogByTag (tag) {
        // let result = await Blog.where('blog').elemMatch({ tags: tag })
        let result = await Blog.find({ tags: { $all: tag } })

        return result
    },
    async deleteBlog (id) {
        let result = await Blog.deleteOne({ _id: id }, (err, data) => {
            if (err) console.log(err)
            console.log(data)
        })
        return result
    },

}
