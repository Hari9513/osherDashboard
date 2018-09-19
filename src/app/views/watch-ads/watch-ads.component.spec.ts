import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchAdsComponent } from './watch-ads.component';

describe('WatchAdsComponent', () => {
  let component: WatchAdsComponent;
  let fixture: ComponentFixture<WatchAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
