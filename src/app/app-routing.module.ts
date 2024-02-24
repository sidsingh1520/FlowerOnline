import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AddProductComponent } from './Components/add-product/add-product.component'
import { AddressFormComponent } from './Components/address-form/address-form.component'
import { CartComponent } from './Components/cart/cart.component'
import { HomeComponent } from './Components/home/home.component'
import { LocationComponent } from './Components/location/location.component'
import { LoginComponent } from './Components/login/login.component'
import { OrderComponent } from './Components/order/order.component'
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component'
import { ProductListComponent } from './Components/product-list/product-list.component'
import { ProfileComponent } from './Components/profile/profile.component'
import { RegisterPageComponent } from './Components/register-page/register-page.component'
import { RegisterComponent } from './Components/register/register.component'
import { UserListComponent } from './Components/user-list/user-list.component'
import { AdminGuard } from './Guard/admin.guard'
import { AuthGuard } from './Guard/auth.guard'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path:'register', component:RegisterPageComponent},
  {path:'accounts/cart',component:CartComponent},
  {path:'admin/userlist',canActivate:[AdminGuard],component:UserListComponent},
  {path:'location',component:LocationComponent},
  {path:'admin/addproduct',canActivate:[AdminGuard],component:AddProductComponent},
  {path:'accounts/order',component:OrderComponent},
  {path:'admin/productlist',canActivate:[AdminGuard],component:ProductListComponent},
  {path:'address',component:AddressFormComponent},
  { path: 'accounts/login', component: LoginComponent },
  { path: 'accounts/profile',canActivate:[AuthGuard], component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
