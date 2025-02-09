import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionRequestSuccessfulComponent } from './collection-request-successful.component';

describe('CollectionRequestSuccessfulComponent', () => {
  let component: CollectionRequestSuccessfulComponent;
  let fixture: ComponentFixture<CollectionRequestSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionRequestSuccessfulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionRequestSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
