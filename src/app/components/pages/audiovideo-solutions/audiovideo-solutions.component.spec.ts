import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiovideoSolutionsComponent } from './audiovideo-solutions.component';

describe('AudiovideoSolutionsComponent', () => {
  let component: AudiovideoSolutionsComponent;
  let fixture: ComponentFixture<AudiovideoSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudiovideoSolutionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudiovideoSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
