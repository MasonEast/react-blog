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
    date: {
        type: Date,
        default: +Date.now()
    }
})

const Blog = mongoose.model("blog", BlogSchema)


module.exports = {
    async add (title, author, content, tags) {
        let tagsArr = tags.split(',')
        return await Blog.create({
            title,
            author,
            content,
            tags: tagsArr
        })
    },

    async getBlogs () {
        let result = await Blog.find({})
        return result
    },
    async getBlog (id) {
        let result = await Blog.findOne({ _id: id })
        return result
    },
    async deleteBlog (id) {
        let result = await Blog.deleteOne({ _id: id })
        return result
    },

}
