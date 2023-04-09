const mongoose = require('mongoose');
const reportUserDetailSchema = new mongoose.Schema({
        report: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReportUser",
        },
        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        reason: {
            type:String,
            enum:["bullying or harassment", "posting inappropriate things", "fake account"]
        },
    },

    { timestamps: true })
const Report_User_Detail = mongoose.model("Report_User_Detail", reportUserDetailSchema);
module.exports = {Report_User_Detail};
