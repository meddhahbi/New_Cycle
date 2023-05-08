const express = require("express");
const {User} = require("../../Models/User")
const {ReportUser} = require("../../Models/Report/reportUser")
const {Report_User_Detail} = require("../../Models/Report/reportUserDetails")
const { protect, protectAdmin } = require("../../middleware/authmiddleware");
const router = express.Router();
router.route("/all/:reportId").get( async (req, res)=> {
    const {reportId} = req.params;

    if (!reportId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    try {
        Report_User_Detail.find({report:reportId}).populate("reporter").then((reports)=>{
            res.status(200).send(reports);
        })

    } catch (e) {
        res.status(400);
        throw new Error(e.message);
    }
})
router.route("/").post(protect, async (req, res)=> {
    const {reportId, reason} = req.body;
    const report = {
        report: reportId,
        reporter: req.user._id,
        reason: reason,
    }
    // console.log("reported")

    if (!reportId) {
        console.log("reportId body not sent with request");
        return res.sendStatus(400);
    }

    if (!reason) {
        console.log("reason body not sent with request");
        return res.sendStatus(400);
    }
    try {
        console.log("report")
        let createdReportDetail = Report_User_Detail.create(report)
            // .populate("report")
            // .populate("reporter", "-password -subscription -isBlocked -isActive -activationCode")
            .then(async (createdReportDetail)=>{
                console.log("reported");
                let reportDetail = await Report_User_Detail.findOne({_id:createdReportDetail._id})
                    .populate("reporter", "username email")
                    .populate("report")
                reportDetail = await User.populate(reportDetail,{
                    path:"report.reported",
                    select:"_id username email"
                })
                let reportUser = ReportUser.findOne({_id:reportId}).then(
                    async (report)=>{
                        console.log(reportDetail._id)
                        console.log(report)
                        if (report.reports)
                        report.reports.push(reportDetail._id);
                        else{
                            report.reports = []
                            report.reports.push(reportDetail._id);
                            console.log("report")
                            console.log(report.reports)
                        }

                        // ReportUser.findByIdAndUpdate(reportId,{reports:[reports]});
                        await report.save()
                    }
                )
                // report.setUpdate({reports:report.reports.append(reportDetail)})
                // reportDetail = reportDetail.populate("report")
            // console.log(reportDetail)

            res.status(200).send(reportDetail);
        })
        // let reportDetail = await Report_User_Detail.findOne({_id:createdReportDetail._id})
        //     .populate("reporter", "-password -subscription -isBlocked -isActive -activationCode")
        //     .populate("report")
        // let report = ReportUser.findOne({_id:reportId})
        // // report.setUpdate({reports:report.reports.append(reportDetail)})
        // ReportUser.findByIdAndUpdate(reportId,{reports:[reportDetail]});

        // res.status(200).send(reportDetail);
    } catch (e) {
        res.status(400);
        throw new Error(e.message);
    }
})

module.exports = router;
