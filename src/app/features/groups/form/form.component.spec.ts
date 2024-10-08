import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsFormComponent } from './form.component';

describe('GroupsFormComponent', () => {
  let component: GroupsFormComponent;
  let fixture: ComponentFixture<GroupsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
