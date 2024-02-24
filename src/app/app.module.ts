import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToolbarComponent } from './Components/toolbar/toolbar.component'
import { LayoutModule } from '@angular/cdk/layout'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { LoginComponent } from './Components/login/login.component'
import { RegisterComponent } from './Components/register/register.component'
import { NgMaterialModule } from './Modules/ng-material/ng-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HomeComponent } from './Components/home/home.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ProfileComponent } from './Components/profile/profile.component';
import { ConfirmPasswordValidatorDirective } from './Directives/confirm-password-validator.directive';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { OldPasswordValidatorDirective } from './Directives/old-password-validator.directive';
import { OldConfirmValidatorDirective } from './Directives/old-confirm-validator.directive';
import { ZoomHoverDirective } from './Directives/zoom-hover.directive'
import { BasicAuthHttpInterceptor } from './Services/basic-auth-http.interceptor';
import { CardComponent } from './Components/card/card.component';
import { RegisterPageComponent } from './Components/register-page/register-page.component';
import { CartComponent } from './Components/cart/cart.component';
import { AddressFormComponent } from './Components/address-form/address-form.component';
import { FilterPipe } from './Shared/filter.pipe';
import { OrderComponent } from './Components/order/order.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { LocationComponent } from './Components/location/location.component';
import { DialogComponent } from './Components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ConfirmPasswordValidatorDirective,
    PageNotFoundComponent,
    OldPasswordValidatorDirective,
    OldConfirmValidatorDirective,
    ZoomHoverDirective,
    CardComponent,
    RegisterPageComponent,
    CartComponent,
    AddressFormComponent,
    FilterPipe,
    OrderComponent,
    AddProductComponent,
    ProductListComponent,
    UserListComponent,
    LocationComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {  
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthHttpInterceptor, multi:true 
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
