import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { ListAnswerComponent } from "./list-answer/list-answer.component";


const routes: Routes = [
    {
        path: 'answer',
        component: ListAnswerComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrequentRoutingModule { }