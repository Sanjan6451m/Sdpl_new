import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdmComponent } from './mdm.component';

describe('MdmComponent', () => {
  let component: MdmComponent;
  let fixture: ComponentFixture<MdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
