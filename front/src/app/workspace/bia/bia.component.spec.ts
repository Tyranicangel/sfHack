/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BiaComponent } from './bia.component';

describe('BiaComponent', () => {
  let component: BiaComponent;
  let fixture: ComponentFixture<BiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
