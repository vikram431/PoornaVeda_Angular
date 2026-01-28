import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodlabelBackComponent } from './foodlabel-back.component';

describe('FoodlabelBackComponent', () => {
  let component: FoodlabelBackComponent;
  let fixture: ComponentFixture<FoodlabelBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodlabelBackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodlabelBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
