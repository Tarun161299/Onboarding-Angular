import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationCertificateComponent } from './utilization-certificate.component';

describe('UtilizationCertificateComponent', () => {
  let component: UtilizationCertificateComponent;
  let fixture: ComponentFixture<UtilizationCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilizationCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilizationCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
