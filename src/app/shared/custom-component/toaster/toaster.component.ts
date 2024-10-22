import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {
  Lobibox: any;
  constructor() { }

  ngOnInit(): void {
  }
 
  round_success_noti(){
    alert("jgghh");
    this.Lobibox.notify('success',{
      pausedelayOnHover: true,
      size: 'mini',
      rounded: true,
      icon: 'bx bx-check-circle',
      delayindicator: false, 
      continueDelayOnInactiveTab: false,
      Position: 'top right',
      msg: 'Lorem ipsum dolor sit amet hears farmer indemnity inherent.'
    })
  };

}
