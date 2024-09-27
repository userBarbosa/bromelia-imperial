import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-groups-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.less',
})
export class GroupsFormComponent implements OnInit {
  groupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      members: this.formBuilder.array([]),
      active: [true],
    });
  }

  get members() {
    return this.groupForm.get('members') as FormArray;
  }

  addMember() {
    this.members.push(
      this.formBuilder.group({
        name: ['', Validators.required],
      })
    );
  }

  removeMember(index: number) {
    this.members.removeAt(index);
  }

  onSubmit() {
    if (this.groupForm.valid) {
      console.log('Group Form submitted:', this.groupForm.value);
      // Here you would call the service to save the new group
      // For example: this.groupService.createGroup(this.groupForm.value).subscribe(...)

      // After saving, navigate back to the groups list
      this.router.navigate(['/groups']);
    }
  }

  onCancel() {
    this.router.navigate(['/groups']);
  }
}
