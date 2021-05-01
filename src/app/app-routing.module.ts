import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { AccountsAddComponent } from './pages/admin/components/admin-accounts/accounts-add/accounts-add.component';
import { AccountsListComponent } from './pages/admin/components/admin-accounts/accounts-list/accounts-list.component';
import { AccountsUpdateComponent } from './pages/admin/components/admin-accounts/accounts-update/accounts-update.component';
import { AdminAccountsComponent } from './pages/admin/components/admin-accounts/admin-accounts.component';
import { AdminContentComponent } from './pages/admin/components/admin-content/admin-content.component';
import { ContentAddComponent } from './pages/admin/components/admin-content/content-add/content-add.component';
import { ContentListComponent } from './pages/admin/components/admin-content/content-list/content-list.component';
import { ContentUpdateComponent } from './pages/admin/components/admin-content/content-update/content-update.component';
import { AdminHomeComponent } from './pages/admin/components/admin-home/admin-home.component';
import { AdminMerchandiseComponent } from './pages/admin/components/admin-merchandise/admin-merchandise.component';
import { MerchandiseAddComponent } from './pages/admin/components/admin-merchandise/merchandise-add/merchandise-add.component';
import { MerchandiseListComponent } from './pages/admin/components/admin-merchandise/merchandise-list/merchandise-list.component';
import { MerchandiseUpdateComponent } from './pages/admin/components/admin-merchandise/merchandise-update/merchandise-update.component';
import { AdminOthersComponent } from './pages/admin/components/admin-others/admin-others.component';
import { AdminTeamsComponent } from './pages/admin/components/admin-teams/admin-teams.component';
import { TeamsAddComponent } from './pages/admin/components/admin-teams/teams-add/teams-add.component';
import { TeamsListComponent } from './pages/admin/components/admin-teams/teams-list/teams-list.component';
import { TeamsUpdateComponent } from './pages/admin/components/admin-teams/teams-update/teams-update.component';
import { ApplyformComponent } from './pages/applyform/applyform.component';
import { ArticlePageComponent } from './pages/articlespage/article-page/article-page.component';
import { ArticlespageComponent } from './pages/articlespage/articlespage.component';
import { ForgotpassComponent } from './pages/forgotpass/forgotpass.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'apply',
    component: ApplyformComponent,
  },
  {
    path: 'articles',
    component: ArticlespageComponent,
  },
  {
    path: 'articles/:id',
    component: ArticlePageComponent,
  },
  {
    path: 'resetpassword',
    component: ForgotpassComponent,
  },

  //Admin Routes
  {
    path: 'authpanel',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'accounts',
        component: AdminAccountsComponent,
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: AccountsListComponent,
          },
          {
            path: 'add',
            component: AccountsAddComponent,
          },
          {
            path: 'update/:id',
            component: AccountsUpdateComponent,
          },
        ],
      },
      {
        path: 'content',
        component: AdminContentComponent,
        children: [
          {
            path: '',
            component: ContentListComponent,
          },
          {
            path: 'add',
            component: ContentAddComponent,
          },
          {
            path: 'update/:id',
            component: ContentUpdateComponent,
          },
        ],
      },
      {
        path: 'teams',
        component: AdminTeamsComponent,
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: TeamsListComponent,
          },
          {
            path: 'add',
            component: TeamsAddComponent,
          },
          {
            path: 'update/:id',
            component: TeamsUpdateComponent,
          },
        ],
      },
      {
        path: 'merchandise',
        component: AdminMerchandiseComponent,
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: MerchandiseListComponent,
          },
          {
            path: 'add',
            component: MerchandiseAddComponent,
          },
          {
            path: 'update/:id',
            component: MerchandiseUpdateComponent,
          },
        ],
      },
      {
        path: 'others',
        component: AdminOthersComponent,
        canActivateChild: [AuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
