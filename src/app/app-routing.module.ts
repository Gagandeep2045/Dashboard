
import {Routes} from '@angular/router'
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { FunctionalityComponent } from './functionality/functionality.component';
import { RegisterJobComponent } from './register-job/register-job.component';
const routes:Routes=[

{path:'login' , component:LoginComponent},
{path:"functionality/:childComponent/:team/:status", component:FunctionalityComponent},
{path:"functionality/:childComponent", component:FunctionalityComponent},
{path:"register",component:RegisterJobComponent}

]


@NgModule(
{
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
}
)
export class AppRoutingModule
{}