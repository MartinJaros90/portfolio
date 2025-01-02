import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioShowcaseComponent } from './portfolio-showcase.component';

describe('PortfolioShowcaseComponent', () => {
  let component: PortfolioShowcaseComponent;
  let fixture: ComponentFixture<PortfolioShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioShowcaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
