import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperiorStoryComponent } from './superior-story.component';

describe('SuperiorStoryComponent', () => {
  let component: SuperiorStoryComponent;
  let fixture: ComponentFixture<SuperiorStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperiorStoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperiorStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
