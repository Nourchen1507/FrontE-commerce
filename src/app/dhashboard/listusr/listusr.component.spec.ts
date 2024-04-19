import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListusrComponent } from './listusr.component';

describe('ListusrComponent', () => {
  let component: ListusrComponent;
  let fixture: ComponentFixture<ListusrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListusrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListusrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
