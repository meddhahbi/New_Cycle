const mongoose = require('mongoose');
const reportUserSchema = new mongoose.Schema({
        reports: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Report_User_Detail",
        }],
        // reason: {
        //     type:String,
        //     enum:["bullying or harassment", "posting inappropriate things", "fake account"]
        // },
        reported: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    })
const ReportUser = mongoose.model("ReportUser", reportUserSchema);
module.exports = {ReportUser};
