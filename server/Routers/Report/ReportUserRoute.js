const express = require("express");

const {ReportUser} = require("../../Models/Report/reportUser")
const {User} = require("../../Models/User")
const { protect, protectAdmin } = require("../../middleware/authmiddleware");
const router = express.Router();
router.route("/all").get(protectAdmin, async (req, res)=> {
    try {
        let reportUser = await ReportUser.find()
            .populate("reports", "reason reporter")
            // .populate({path:"reports.reporter", select:"username"})
            .populate("reported", "username email")
        reportUser = await User.populate(reportUser, {
            path:"reports.reporter",
            select:"username email"
        })
        console.log("reportUser")
        res.status(200).send(reportUser)
    } catch (e) {
        res.status(400);
        throw new Error(e.message);
    }
})
router.route("/").post(protect, async (req, res) => {
    const {userId} = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    let isReportUser = await ReportUser.findOne({
        reported: userId
    })
        .populate("reported", "username email")
        .populate("reports", "reporter")
    isReportUser = await User.populate(isReportUser, {
        path:"reports.reporter",
        select:"username email"
    })
    // console.log(reports)
    // for(let report of isReportUser){


    //     if(report.reporter._id === req.user._id){
    //         console.log("exists")
    //         res.status(400).send("can't be reported again")
    //     }
    // }
    if (isReportUser) {
        console.log(isReportUser)
        if(isReportUser.reports){
            for(let rep of isReportUser.reports){
                console.log(rep.reporter._id)
                console.log(req.user._id)
                if(rep.reporter._id.toString() === req.user._id.toString()){

                    console.log("you already reported this client")
                    res.status(200).send({error:"already reported"})
                    return 0
                }
            }
        }
        res.send(isReportUser);
    }

    else {
        let reportData={
            reported:userId
        }

        try {
            const createdReport = await ReportUser.create(reportData);
            const FullReport = await ReportUser.findOne({ _id: createdReport._id }).populate(
                "reported",
                "-password -subscription -isBlocked -isActive -activationCode"
            );
            res.status(200).json(FullReport);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})
module.exports = router;
