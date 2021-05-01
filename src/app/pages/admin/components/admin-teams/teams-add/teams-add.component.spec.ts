import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsAddComponent } from './teams-add.component';

describe('TeamsAddComponent', () => {
  let component: TeamsAddComponent;
  let fixture: ComponentFixture<TeamsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
