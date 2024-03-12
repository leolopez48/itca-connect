import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { EventComponent } from "./event/event.component";


const routes: Routes = [
    {
        path: '',
        component: EventComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalendarRoutingModule { }