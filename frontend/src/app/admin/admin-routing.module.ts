import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { EventCrudComponent } from "./event-crud/event-crud.component";
import { TypeEventCrudComponent } from "./type-event/type-event-crud.component";
import { CampusCrudComponent } from "./campus/campus-crud.component";
import { SchoolCrudComponent } from "./school/school-crud.component";


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
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }