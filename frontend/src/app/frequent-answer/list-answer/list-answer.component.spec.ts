import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnswerComponent } from './list-answer.component';

describe('ListAnswerComponent', () => {
  let component: ListAnswerComponent;
  let fixture: ComponentFixture<ListAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAnswerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
