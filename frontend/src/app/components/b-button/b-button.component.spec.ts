import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BButtonComponent } from './b-button.component';

describe('BButtonComponent', () => {
  let component: BButtonComponent;
  let fixture: ComponentFixture<BButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
