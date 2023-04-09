const express = require("express");
const {User} = require("../../Models/User")
const {ReportUser} = require("../../Models/Report/reportUser")
const {Report_User_Detail} = require("../../Models/Report/reportUserDetails")
const { protect, protectAdmin } = require("../../middleware/authmiddleware");
const router = express.Router();
router.route("/all").get(protectAdmin, async (req, res)=> {
    const {reportId} = req.body;

    if (!reportId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    try {
        ReportUserDetail.find({report:reportId}).then((reports)=>{
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

    if (!reportId) {
        console.log("reportId body not sent with request");
        return res.sendStatus(400);
    }

    if (!reason) {
        console.log("reason body not sent with request");
        return res.sendStatus(400);
    }
    try {
        console.log(report)
        let createdReportDetail = Report_User_Detail.create(report)
            // .populate("report")
            // .populate("reporter", "-password -subscription -isBlocked -isActive -activationCode")
            .then(async (createdReportDetail)=>{
                let reportDetail = await Report_User_Detail.findOne({_id:createdReportDetail._id})
                    .populate("reporter", "username email")
                    .populate("report")
                reportDetail = await User.populate(reportDetail,{
                    path:"report.reported",
                    select:"username email"
                })
                let reportUser = ReportUser.findOne({_id:reportId}).then(
                    async (report)=>{
                        report.reports.push(reportDetail._id);
                        console.log(report)

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
