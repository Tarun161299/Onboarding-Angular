  downloadPDFDemo(){

    let content2 = `
    <style>


    .bordertable tr,.bordertable td, .bordertable th {
        border-bottom:
            1px solid #ccc;
border-left: 1px solid #ccc;
border-right:1px solid #ccc;
border-collapse: collpase;


    }
</style>
    <table class="table table-sm table-borderless w-100">
    <tr>
      <td class="w-25">
        <img src="assets/images/logo-img.png" style="height:40px;" />
      </td>
      <td class="w-50 text-center">
        <h5>
          e-Counselling Division
        </h5>
      </td>
      <td class="w-25">
        <img src="assets/images/niclogo.png" style="height:40px;" />
      </td>
    </tr>
  </table>
    <table  class="bordertable breaklongword">
    <thead>


      <th colspan="2" class="bg-secondary text-center bg-opacity-25">
          OnBoarding Details</th>
              </thead>
                  <tbody >

                    <tr class="border-bottom">
                        <th class="w-25">Agency</th>
                        <td class="w-25">#dfdfdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff#</td>
                    </tr>
                    <tr>
                        <th class="w-25">Services</th>
                        <td class="w-25">#Services#</td>
                        </tr>
                        <tr>
                        <th [hidden]="stateshow" class="w-25">State</th>
                        <td [hidden]="stateshow" class="w-25">#State#</td>
                        </tr>
                        <tr>
                        <th [hidden]="ministryshow">Ministry</th>
                        <td [hidden]="ministryshow">#MinistryName#</td>
                        </tr>
                        <tr>
                        <th>Name of Organization</th>
                        <td>#Organization#</td>
                        </tr>
                        <tr>
                        <th>Website</th>
                        <td>#website#</td>
                        </tr>
                        <tr>
                        <th>First time Affiliation with e-Counselling</th>
                        <td>#FirstTimeAffiliation#
                        </td>
                        <tr>

                        <th>Previous Agency deployed For Examination(if any)</th>
                        <td>#previousAgencyExamination#</td>
                        </tr>
                        <tr>
                        <th>Brief Description on existing Examination</th>
                        <td>#descriptionExam#</td>
                        </tr>
                        <tr>

                        <th>Previous Agency deployed For Counselling(if any)</th>
                        <td>#previousAgencyCounselling#</td>
                        </tr>
                        <tr>
                        <th>Brief Description on existing Counselling</th>
                        <td>#descriptionCounselling#</td>
                        </tr>
                        <tr>

                        <th>Expected no of Applicants in Examination</th>
                        <td>#expectedApplicantsexam#</td>
                        </tr>
                        <tr>
                        <th>Examination List</th>
                        <td>#ExaminationList#</td>
                        </tr>
                        <tr>


                        <th>Tentative Schedule Start of Examination</th>
                        <td>#tentstartExamin#</td>
                        </tr>
                        <tr>
                        <th>Tentative Schedule End of Examination</th>
                        <td>#tentendexam#</td>
                        </tr>
                        <tr>


                        <th>Expected no of Applicants in Counselling</th>
                        <td>#ExpectAppCouns#</td>
                        </tr>
                        <tr>
                        <th>Expected no of Seat in Counselling</th>
                        <td>#ExpectSeatCouns#</td>
                        </tr>
                        <tr>


                        <th>Stream List in Counselling</th>
                        <td>#streamlistcouns#</td>
                        </tr>
                        <tr>
                        <th>Expected Round in Counselling</th>
                        <td>#expectRoundcouns#</td>
                        </tr>
                        <tr>

                        <th>Expected Spot Round in Counselling</th>
                        <td>#expecSpotRoundCouns#</td>
                        </tr>
                        <tr>
                        <th>Expected Participating Institute in Counselling</th>
                        <td>#expectPartInstitute#</td>
                            </tr>
                            <tr>


                        <th>Tentative Schedule Start of Counselling</th>
                        <td>#tentScheduleStartcouns#</td>
                        </tr>
                        <tr>
                        <th>Tentative Schedule End of Counselling</th>
                        <td>#tentendCouns#</td>
                        </tr>

                        <tr>
                        <!-- <th>Dissimilarity Of Schedule</th>
                        <td colspan="3">{{ counsDissimilarityOfSchedule }}</td>
                        <th>Current Status</th>
                        <td colspan="3">{{ currentStatus }}</td> -->
                        <th [hidden]="Counselling">Dissimilarity Of Schedule Counselling</th>
                        <td [hidden]="Counselling" >#DissScheduleCouns#</td>
                        </tr>
                        <tr>
                        <!-- <th>Dissimilarity Of Schedule</th>
                        <td colspan="3">{{ counsDissimilarityOfSchedule }}</td>
                        <th>Current Status</th>

                        <td colspan="3">{{ currentStatus }}</td> -->
                        <th >Dissimilarity Of Schedule Examination</th>
                        <td >#ExamDissimilarityOfSchedule#</td>
                        </tr>
                        <tr>
                </tbody>
            </table>

        <table class="bordertable breaklongword w-100">
                <thead>
                  <tr>
                    <th colspan="5">User Department Contact Detail</th>
                  </tr>
                  <tr class="bg-secondary text-white bg-gradient">
                      <th>Role</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Mobile No.</th>
                      <th>Email Id</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Coordinator</td>
                        <td>#coname#</td>
                        <td>#codesignation#</td>
                        <td>#comobile#</td>
                        <td>#coemail#</td>
                    </tr>
                    <tr>
                        <td>Deputy Coordinator</td>
                        <td>#DepConame#</td>
                        <td>#DepCodesignation#</td>
                        <td>#DepComobile#</td>
                        <td>#DepCoemail#</td>
                    </tr>
                    <tr>
                        <td>Program Manager Unit</td>
                        <td>#progname#</td>
                        <td >#progdesignation#</td>
                        <td >#progmobile#</td>
                        <td >#progemail#</td>
                    </tr>
                </tbody>
            </table>

            <table class="bordertable w-100 breaklongword">
                <thead>
                <tr>
                    <th colspan="5">User Department MoU Signatory Details</th>
                  </tr>
                    <tr class="bg-secondary text-white bg-gradient">
                        <th>Role</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Mobile No.</th>
                        <th>Email Id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nodal Officer</td>
                        <td>#nodalname#</td>
                        <td>#nodaldesignation#</td>
                        <td>#nodalmobile#</td>
                        <td>#nodalemail#</td>
                    </tr>
                    <tr>
                        <td >Authorized Signatory</td>
                        <td>#Authorname#</td>
                        <td> #Authordesignation#</td>
                        <td>#Authormobile#</td>
                        <td>#Authoremail#</td>
                    </tr>
                </tbody>
            </table>

            <table class="bordertable w-100 breaklongword">
                <thead>
                <tr>
                    <th colspan="5">User Department Technical Team Details</th>
                  </tr>
                    <tr class="bg-secondary text-white bg-gradient">
                        <th>Role</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Mobile No.</th>
                        <th>Email Id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>System Admin</td>
                        <td>#systemname#</td>
                        <td>#systemdesignation#</td>
                        <td>#systemmobile#</td>
                        <td> #systememail#</td>
                    </tr>
                    <tr>
                        <td>Database Admin</td>
                        <td> #databasename#</td>
                        <td> #databasedesignation#</td>
                        <td>#databasemobile#</td>
                        <td> #databaseemail#</td>
                    </tr>
                    <tr>
                        <td>Web Info. Manager</td>
                        <td> #webname#</td>
                        <td> #webdesignation#</td>
                        <td>#webmobile#</td>
                        <td>#webemail#</td>
                    </tr>
                </tbody>
            </table>`;
            let content = `
            <style>


            .bordertable tr,.bordertable td, .bordertable th {
                border-bottom:
                    1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right:1px solid #ccc;
        border-collapse: collpase;


            }
        </style>
        <table class="table table-sm table-borderless w-100">
            <tr>
              <td class="w-25">
                <img src="assets/images/logo-img.png" style="height:40px;" />
              </td>
              <td class="w-50 text-center">
                <h5>
                  e-Counselling Division
                </h5>
              </td>
              <td class="w-25">
                <img src="assets/images/niclogo.png" style="height:40px;" />
              </td>
            </tr>
          </table>
            <table class="bordertable w-100 breaklongword">
            <thead>
              <th colspan="2" class="bg-secondary text-center bg-opacity-25">
                  OnBoarding Details</th>
                      </thead>
                          <tbody>
                            <tr>
                                <th class="w-25">Agency</th>
                                <td class="w-25">#Agency#</td>
                            </tr>
                            <tr>
                                <th class="w-25">Services</th>
                                <td class="w-25">#Services#</td>
                                </tr>
                                <tr>
                                <th [hidden]="stateshow" class="w-25">State</th>
                                <td [hidden]="stateshow" class="w-25">#State#</td>
                                </tr>
                                <tr>
                                <th [hidden]="ministryshow">Ministry</th>
                                <td [hidden]="ministryshow">#MinistryName#</td>
                                </tr>
                                <tr>
                                <th>Name of Organization</th>
                                <td>#Organization#</td>
                                </tr>
                                <tr>
                                <th>Website</th>
                                <td>#website#</td>
                                </tr>
                                <tr>
                                <th>First time Affiliation with e-Counselling</th>
                                <td>#FirstTimeAffiliation#
                                </td>
                                <tr>

                                <th>Previous Agency deployed For Examination(if any)</th>
                                <td>#previousAgencyExamination#</td>
                                </tr>
                                <tr>
                                <th>Brief Description on existing Examination</th>
                                <td>#descriptionExam#</td>
                                </tr>
                                <tr>

                                <th>Previous Agency deployed For Counselling(if any)</th>
                                <td>#previousAgencyCounselling#</td>
                                </tr>
                                <tr>
                                <th>Brief Description on existing Counselling</th>
                                <td>#descriptionCounselling#</td>
                                </tr>
                                <tr>

                                <th>Expected no of Applicants in Examination</th>
                                <td>#expectedApplicantsexam#</td>
                                </tr>
                                <tr>
                                <th>Examination List</th>
                                <td>#ExaminationList#</td>
                                </tr>
                                <tr>


                                <th>Tentative Schedule Start of Examination</th>
                                <td>#tentstartExamin#</td>
                                </tr>
                                <tr>
                                <th>Tentative Schedule End of Examination</th>
                                <td>#tentendexam#</td>
                                </tr>
                                <tr>


                                <th>Expected no of Applicants in Counselling</th>
                                <td>#ExpectAppCouns#</td>
                                </tr>
                                <tr>
                                <th>Expected no of Seat in Counselling</th>
                                <td>#ExpectSeatCouns#</td>
                                </tr>
                                <tr>


                                <th>Stream List in Counselling</th>
                                <td>#streamlistcouns#</td>
                                </tr>
                                <tr>
                                <th>Expected Round in Counselling</th>
                                <td>#expectRoundcouns#</td>
                                </tr>
                                <tr>

                                <th>Expected Spot Round in Counselling</th>
                                <td>#expecSpotRoundCouns#</td>
                                </tr>
                                <tr>
                                <th>Expected Participating Institute in Counselling</th>
                                <td>#expectPartInstitute#</td>
                                    </tr>
                                    <tr>


                                <th>Tentative Schedule Start of Counselling</th>
                                <td>#tentScheduleStartcouns#</td>
                                </tr>
                                <tr>
                                <th>Tentative Schedule End of Counselling</th>
                                <td>#tentendCouns#</td>
                                </tr>

                                <tr>
                                <!-- <th>Dissimilarity Of Schedule</th>
                                <td colspan="3">{{ counsDissimilarityOfSchedule }}</td>
                                <th>Current Status</th>
                                <td colspan="3">{{ currentStatus }}</td> -->
                                <th [hidden]="Counselling">Dissimilarity Of Schedule Counselling</th>
                                <td [hidden]="Counselling" >#DissScheduleCouns#</td>
                                </tr>
                                <tr>
                                <!-- <th>Dissimilarity Of Schedule</th>
                                <td colspan="3">{{ counsDissimilarityOfSchedule }}</td>
                                <th>Current Status</th>

                                <td colspan="3">{{ currentStatus }}</td> -->
                                <th >Dissimilarity Of Schedule Examination</th>
                                <td >#ExamDissimilarityOfSchedule#</td>
                                </tr>
                                <tr>
                        </tbody>
                    </table>

                <table  class="bordertable w-100 breaklongword">
                        <thead>
                          <tr>
                            <th colspan="5">User Department Contact Detail</th>
                          </tr>
                          <tr class="bg-secondary text-white bg-gradient">
                              <th>Role</th>
                              <th>Name</th>
                              <th>Designation</th>
                              <th>Mobile No.</th>
                              <th>Email Id</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Coordinator</td>
                                <td>#coname#</td>
                                <td>#codesignation#</td>
                                <td>#comobile#</td>
                                <td>#coemail#</td>
                            </tr>
                            <tr>
                                <td>Deputy Coordinator</td>
                                <td>#DepConame#</td>
                                <td>#DepCodesignation#</td>
                                <td>#DepComobile#</td>
                                <td>#DepCoemail#</td>
                            </tr>
                            <tr>
                                <td>Program Manager Unit</td>
                                <td>#progname#</td>
                                <td >#progdesignation#</td>
                                <td >#progmobile#</td>
                                <td >#progemail#</td>
                            </tr>
                        </tbody>
                    </table>

                    <table  class="bordertable w-100 breaklongword">
                        <thead>
                        <tr>
                            <th colspan="5">User Department MoU Signatory Details</th>
                          </tr>
                            <tr class="bg-secondary text-white bg-gradient">
                                <th>Role</th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Mobile No.</th>
                                <th>Email Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nodal Officer</td>
                                <td>#nodalname#</td>
                                <td>#nodaldesignation#</td>
                                <td>#nodalmobile#</td>
                                <td>#nodalemail#</td>
                            </tr>
                            <tr>
                                <td >Authorized Signatory</td>
                                <td>#Authorname#</td>
                                <td> #Authordesignation#</td>
                                <td>#Authormobile#</td>
                                <td>#Authoremail#</td>
                            </tr>
                        </tbody>
                    </table>

                    <table  class="bordertable w-100 breaklongword">
                        <thead>
                        <tr>
                            <th colspan="5">User Department Technical Team Details</th>
                          </tr>
                            <tr class="bg-secondary text-white bg-gradient">
                                <th>Role</th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Mobile No.</th>
                                <th>Email Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>System Admin</td>
                                <td>#systemname#</td>
                                <td>#systemdesignation#</td>
                                <td>#systemmobile#</td>
                                <td> #systememail#</td>
                            </tr>
                            <tr>
                                <td>Database Admin</td>
                                <td> #databasename#</td>
                                <td> #databasedesignation#</td>
                                <td>#databasemobile#</td>
                                <td> #databaseemail#</td>
                            </tr>
                            <tr>
                                <td>Web Info. Manager</td>
                                <td> #webname#</td>
                                <td> #webdesignation#</td>
                                <td>#webmobile#</td>
                                <td>#webemail#</td>
                            </tr>
                        </tbody>
                    </table>`;
            const opt = {
              margin: 10,
              filename: 'pdf_Name.pdf',
              autoPaging: 'text',
              image: { type: 'jpeg', quality: 1 },
              html2canvas: { scale: 4 },
              jsPDF: {
                unit: 'mm',
                format: 'A3',
                pageWidth: '210',
                pageHeight: '297',
                orientation: 'portrait',
                setFontSize: '8',
              },
              
              pagebreak: { mode: 'avoid-all' },
            };

            const doc = new jspdf.jsPDF();
            var temp: string;
            html2pdf()
              .set(opt)
              .from(content)
              .output()
              .then((data) => {
                temp = btoa(data);
                this.createPdfdata = temp;})

                  const src = `data:text/pdf;base64,${"JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjc5OTk5OTk5OTk5OTcyNyA4NDEuODg5OTk5OTk5OTk5OTg2NF0KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggMTE4Cj4+CnN0cmVhbQoxNC40MDE4MDAwMDAwMDAwMDE1IHcKMCBHCnEKMjM1NjUuODY3OTc5OTIyMzM5MTQ1NiAwIDAgMjM1NjUuODY3OTc5OTIyMzQyNzgzNSA3MjAuIC0yMzQ0My45Nzc5Nzk5MjIzNDMzNjU2IGNtCi9JMCBEbwpRCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKNSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago2IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKNyAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1PYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjggMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZE9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKOSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0NvdXJpZXIKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTAgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTEgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLU9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTIgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyLUJvbGRPYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjEzIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtUm9tYW4KL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKMTQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9UaW1lcy1Cb2xkCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtSXRhbGljCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4K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…"}`;
                  const link = document.createElement("a")
                  link.href = src
                  link.download = "demoDownload.pdf"
                  link.click()

                  link.remove()
  }
