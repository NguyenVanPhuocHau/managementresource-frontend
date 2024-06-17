import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUnitComponent } from './modal-unit.component';

describe('ModalUnitComponent', () => {
  let component: ModalUnitComponent;
  let fixture: ComponentFixture<ModalUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
