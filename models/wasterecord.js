const {mongoose,Schema} = require('mongoose');

const StudentRecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    
  },
  rollnumber: {
    type: String,
    required: true,
    trim: true
  },
  purchase:[
    {type:Schema.Types.ObjectId,
      ref:'booksRecord'
    }
  ]
  
});

const studentRecord = mongoose.model('studentRecord',StudentRecordSchema);

const booksRecordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    
  },
  year: {
    type: String,
    required: true,
    trim: true
  },
  
});

const booksRecord = mongoose.model('booksRecord',booksRecordSchema);

module.exports = {studentRecord,booksRecord};
