import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {MatMenuModule} from '@angular/material/menu';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import {MatCardModule} from '@angular/material/card';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import { EventCrudComponent } from './event-crud/event-crud.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEditComponent } from './event-crud/event-edit/event-edit.component';
import { EventCrudService } from './providers/event-crud.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TypeEventCrudComponent } from './type-event/type-event-crud.component';
import { TypeEventEditComponent } from './type-event/type-event-edit/type-event-edit.component';
import { ToastService } from '../core/providers/toast.service';
import { ToastsContainer } from '../core/providers/toasts-container.component';
import { CampusCrudComponent } from './campus/campus-crud.component';
import { CampusEditComponent } from './campus/campus-edit/campus-edit.component';
import { SchoolCrudComponent } from './school/school-crud.component';
import { SchoolEditComponent } from './school/school-edit/school-edit.component';
import { PlaceTypeEditComponent} from "./place-type/place-type-edit/place-type-edit.component";
import { DetailCampusPlaceComponent } from './detail-campus-place/detail-campus-place.component';
import { DetailCampusPlaceEditComponent } from './detail-campus-place/detail-campus-place-edit/detail-campus-place-edit.component';


@NgModule({
  declarations: [
    EventCrudComponent,
    EventEditComponent,
    TypeEventCrudComponent,
    TypeEventEditComponent,
    CampusCrudComponent,
    CampusEditComponent,
    SchoolCrudComponent,
    SchoolEditComponent,
    PlaceTypeEditComponent,
    DetailCampusPlaceComponent,
    DetailCampusPlaceEditComponent
],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    ToastModule,
    CardModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    TabViewModule,
    TableModule,
    ButtonModule,
    InputNumberModule,
    ProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ConfirmDialogModule,
    ToastsContainer,
  ],
  providers: [
    NgbActiveModal,
    MessageService,
    DatePipe,
    HttpClient,
    EventCrudService,
    ConfirmationService,
  ]
})
export class AdminModule { }
