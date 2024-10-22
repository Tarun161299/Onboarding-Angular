export const HTMLTemplatesForPdf = {
  OnBoardingRequest: `
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
            OnBoarding Request</th>
          </thead>
          <tbody>
              <tr>
                  <th>Agency</th>
                  <td>#Agency#</td>
              </tr>
              <tr>
                  <th>Ministry</th>
                  <td>#Ministry#</td>
                  </tr>
                  <tr>
                  <th [hidden]="ministryshow">Organization</th>
                  <td [hidden]="ministryshow">#Organization#</td>
                  </tr>
                  <tr>
                  <th>Academic Session</th>
                  <td>#AcademicSession#</td>
                  </tr>
                  <tr>
                  <th>
                  Complete Mailing Address</th>
                  <td>#address#</td>
                  </tr>
                  <tr>
                  <th>State</th>
                  <td>#State#
                  </td>
                  <tr>
                  <th>District</th>
                  <td>#District#</td>
                  </tr>
                  <tr>
                  <th>Pin Code</th>
                  <td>#PinCode#</td>
                  </tr>
                  <tr>
                  <th>HOD Name</th>
                  <td>#HODName#</td>
                  </tr>
                  <tr>
                  <th>HOD Designation</th>
                  <td>#HODDesignation#</td>
                  </tr>
                  <tr>
                  <th>HOD Mobile</th>
                  <td>#HODMobile#</td>
                  </tr>
                  <tr>
                  <th>HOD Email</th>
                  <td>#HODEmail#</td>
                  </tr>
                  <tr>
                  <th>Coordinator Name</th>
                  <td>#Coordinatorname#</td>
                  </tr>
                  <tr>
                  <th>Coordinator Designation</th>
                  <td>#CoordinatorDesignation#</td>
                  </tr>
                  <tr>
                  <th>Coordinator Mobile</th>
                  <td>#CoordinatorMobile#</td>
                  </tr>
                  <tr>
                  <th>Coordinator Email</th>
                  <td>#CoordinatorEmail#</td>
                  </tr>
                  <tr>
                  <th>Services</th>
                  <td>#Services#</td>
                  </tr>
          </tbody>
        </table>`
}