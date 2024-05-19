import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { EventCrudComponent } from "./event-crud/event-crud.component";
import { TypeEventCrudComponent } from "./type-event/type-event-crud.component";
import { CampusCrudComponent } from "./campus/campus-crud.component";
import { SchoolCrudComponent } from "./school/school-crud.component";
import {PlaceTypeComponent} from "./place-type/place-type.component";
import { DetailCampusPlaceComponent } from "./detail-campus-place/detail-campus-place.component";
import { QuestionCrudComponent } from "./frequent-question/frequent-question-crud.component";


const routes: Routes = [
    {
        path: 'events',
        component: EventCrudComponent,
    },
    {
        path: 'type-events',
        component: TypeEventCrudComponent,
    },
    {
        path: 'campus',
        component: CampusCrudComponent,
    },
    {
        path: 'school',
        component: SchoolCrudComponent,
    },
    {
      path: 'places-type',
      component: PlaceTypeComponent,
    },
    {
        path: 'frequent-question',
        component: QuestionCrudComponent,
      },
    {
        path: 'detail-campus-places',
        component: DetailCampusPlaceComponent,
      },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
