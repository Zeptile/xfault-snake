import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XfaultSnakeComponent } from './xfault-snake.component';

describe('XfaultSnakeComponent', () => {
  let component: XfaultSnakeComponent;
  let fixture: ComponentFixture<XfaultSnakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XfaultSnakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XfaultSnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
