import { Routes, } from '@angular/router';

// CORE
import { LoginComponent } from './core/login/login.component';
import { SignupComponent } from './core/signup/signup.component';

// FEATURES
import { ContactsListComponent } from './features/contacts/list/list.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacts', component: ContactsListComponent },
  // { path: 'contacts/new', component: ContactFormComponent },
  // { path: 'contacts/:id/edit', component: ContactFormComponent },
  // { path: 'groups', component: GroupsComponent },
  // { path: 'groups/new', component: GroupFormComponent },
  // { path: 'groups/:id/edit', component: GroupFormComponent },
  // { path: 'groups/:id', component: GroupDetailsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


/*
Página de Cadastro (/signup):
    Formulário para o usuário se cadastrar no sistema.

Página de Login (/login):
    Formulário para o usuário fazer login no sistema.

Página Principal de Contatos (/contacts):
    Lista de contatos cadastrados.
    Botão para adicionar novos contatos.

Página de Adicionar Contato (/contacts/new):
    Formulário para criar um novo contato.

Página de Editar Contato (/contacts/:id/edit):
    Formulário para editar as informações de um contato existente.

Página de Grupos (/groups):
    Lista de grupos de contatos.
    Botão para adicionar novos grupos.

Página de Adicionar Grupo (/groups/new):
    Formulário para criar um novo grupo.

Página de Editar Grupo (/groups/:id/edit):
    Formulário para editar um grupo existente.

Página de Detalhes do Grupo (/groups/:id):
    Exibe os contatos pertencentes a um grupo.
*/