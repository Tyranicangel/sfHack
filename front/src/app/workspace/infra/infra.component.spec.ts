/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InfraComponent } from './infra.component';

describe('InfraComponent', () => {
  let component: InfraComponent;
  let fixture: ComponentFixture<InfraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
