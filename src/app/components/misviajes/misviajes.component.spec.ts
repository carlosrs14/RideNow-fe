import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisviajesComponent } from './misviajes.component';

describe('MisviajesComponent', () => {
  let component: MisviajesComponent;
  let fixture: ComponentFixture<MisviajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisviajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisviajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
