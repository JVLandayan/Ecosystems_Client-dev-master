import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMerchandiseComponent } from './admin-merchandise.component';

describe('AdminMerchandiseComponent', () => {
  let component: AdminMerchandiseComponent;
  let fixture: ComponentFixture<AdminMerchandiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMerchandiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMerchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
