import { ToastService } from './../../../shared/services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Contact } from '../../../shared/models/Contact';
import { GroupsService } from '../../../shared/services/api/groups/groups.service';
import { ContactsService } from '../../../shared/services/api/contacts/contacts.service';

@Component({
  selector: 'app-contacts-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.less',
})
export class ContactsFormComponent implements OnInit {
  contactForm!: FormGroup;
  pageTitle: string = 'Novo contato';
  possibleGroups: Array<{ id: string; name: string }> = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private groupsService: GroupsService,
    private contactsService: ContactsService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadUserGroups();
    this.checkAndLoadContactData();
  }

  initializeForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: [''],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]{10,13}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      groupId: ['', Validators.required],
    });
  }

  checkAndLoadContactData() {
    const contactId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!contactId) {
      return;
    }

    this.contactsService.getContact(contactId).subscribe({
      next: (response) => {
        this.pageTitle = 'Atualizar contato';
        this.contactForm.patchValue({
          email: response?.data?.email ?? '',
          groupId: response?.data?.groupId ?? '',
          id: response?.data?.id ?? '',
          name: response?.data?.name ?? '',
          phone: response?.data?.phone ?? '',
          address: response?.data?.address ?? '',
        });
      },
      error: (response) => {
        this.toastService.showToast(
          'error',
          'Oh no! Something went wrong',
          this.toastService.getErrorMessage(response)
        );
      },
    });
  }

  get email() {
    return this.contactForm.get('email');
  }
  get groupId() {
    return this.contactForm.get('groupId');
  }
  get id() {
    return this.contactForm.get('id');
  }
  get name() {
    return this.contactForm.get('name');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get address() {
    return this.contactForm.get('address');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contactData = this.contactForm.value;
      console.log('contactForm:', contactData);

      // Você pode adicionar lógica para criação ou atualização aqui, dependendo do estado do formulário
    }
  }

  onCancel() {
    this.router.navigate(['/groups']);
  }

  loadUserGroups(): void {
    this.groupsService.getUserGroups().subscribe({
      next: (response) => {
        if (response?.data?.length) {
          this.possibleGroups = response?.data?.map((group) => {
            return { id: group.id, name: group.name };
          });
        }
      },
      error: (response) => {
        this.toastService.showToast(
          'error',
          'Oh no! Something went wrong',
          this.toastService.getErrorMessage(response)
        );
      },
    });
  }
}
