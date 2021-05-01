import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOthersComponent } from './admin-others.component';

describe('AdminOthersComponent', () => {
  let component: AdminOthersComponent;
  let fixture: ComponentFixture<AdminOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOthersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
