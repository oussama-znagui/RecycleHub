import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { CollectorPageComponent } from './pages/collector-page/collector-page.component';

export const routes: Routes = [
    {path: "" , component: HomeComponent },
    {path: "dashboard" , component: DashboardComponent, canActivate: [AuthGuard]},
    {path: "col", component: CollectorPageComponent}
];
