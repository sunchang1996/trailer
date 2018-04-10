const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const  { Mixed, ObjectId } = Schema.Types;

const MovieSchema = new Schema({
  doubanId: {
    unique: true,
    required: true,
    type: String,
  },

  category: {
    type: ObjectId,
    ref: 'Category'   //建立一个指向关系
  },

  rate: Number,
  summary: String,
  video: String,
  poster: String,
  cover: String,

  rawTitle: String,
  movieType: [String],
  pubdate: Mixed, //发布时间
  year: Number,

  videoKey: String,
  posterKey: String,
  coverKey: String,

  tags: Array,

  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    } 
  }
})

MovieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }

  next();
}); // pre 在保存之前

mongoose.model('Movie', MovieSchema) // 传递两个参数 