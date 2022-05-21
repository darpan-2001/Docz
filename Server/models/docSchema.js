import mongoose from "mongoose";

const docSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
})

export default mongoose.model('Document', docSchema)