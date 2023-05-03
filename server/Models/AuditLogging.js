// const mongoose = require('mongoose');

// const auditLogSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   timestamp: { type: Date, default: Date.now },
//   action: String,
//   details: String
// });

// const AuditLog = mongoose.model('AuditLog', auditLogSchema);




// getLogs = () =>{
//     AuditLog.find({}).populate('userId', 'username email')
//     .exec((err, logs) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log(logs);
//       }
//     });
// }



// module.exports = {
//     AuditLog,
//     getLogs,

// };