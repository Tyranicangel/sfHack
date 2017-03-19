/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DrstrategyComponent } from './drstrategy.component';

describe('DrstrategyComponent', () => {
  let component: DrstrategyComponent;
  let fixture: ComponentFixture<DrstrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrstrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrstrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
