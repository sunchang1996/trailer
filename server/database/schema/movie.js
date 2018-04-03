const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Mixed = Schema.Types.Mixed;

const MovieSchema = new Schema({
  movieId: {
    unique: true,
    type: String,
    required: true,
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

MovieSchema.pre('save', next => {
  if (this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }

  next();
}); // pre 在保存之前

mongoose.model('Movie', Schema) // 传递两个参数 