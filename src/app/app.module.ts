import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptorProvider } from 'src/app/shared/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppComponent } from './app.component';
import { GetGoodsService } from './services/get-goods.service';
import { GoodsTableComponent } from './components/goods-table/goods-table.component';
import { GoodsTableContainerComponent } from './components/goods-table-container/goods-table-container.component';


@NgModule({
  declarations: [
    AppComponent,
    GoodsTableComponent,
    GoodsTableContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpErrorInterceptorProvider,
    GetGoodsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
