import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlespageComponent } from './articlespage.component';

describe('ArticlespageComponent', () => {
  let component: ArticlespageComponent;
  let fixture: ComponentFixture<ArticlespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlespageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
