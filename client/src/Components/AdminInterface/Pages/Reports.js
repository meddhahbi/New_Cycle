
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Reports(){


    const [reports, setReports] = useState([]);
    const [reportDetail, setReportDetail] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/reportUser/all')
        //   .then(response => setUsers(response.data))
        .then((response)=>{
            setReports(response.data);
            console.log(response.data);
            console.log("reportDetail");
            console.log(reportDetail);
        })
        .catch(error => console.log(error));
    }, []);




      const handleShowDeatails=(id)=>{

        axios.get(`http://localhost:3001/reportUserDetail/all/${id}`)
        .then((response)=>{
            setReportDetail(response.data);
            console.log(response.data)
            console.log('test')
           // console.log(reportDetail.reason)
            
        }) .catch(error => console.log(error));
        


      }




return <div>

<div>
    
      <section id='wej' class="blog-section section-b-space">
        <div class="container-fluid-lg">
          <table class="styled-table">
            <thead>
              <tr>
                <th>User Reported</th>
                <th>Action</th>
              
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report._id}>
                  <td>{report.reported.username}</td>
                  <td><button onClick={()=>handleShowDeatails(report._id)} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    Details
</button>


                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Report Details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        
                         {reportDetail.map((reportD)=>(
                            <div key={reportD._id}>
                                <p>Reason : {reportD.reason}</p>
                                <p>Reporter : {reportD.reporter.username}</p>
                            </div>
                        ))} 


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div></td>
                
                </tr>
              ))}
             
            </tbody>
          </table>
        </div>
      </section>
    </div>
  






</div>





}