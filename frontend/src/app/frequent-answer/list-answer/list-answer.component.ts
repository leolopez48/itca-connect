import { Component } from '@angular/core';
import { CoreService } from '../../core/providers/core.service';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-answer',
  standalone: true,
  imports: [AccordionModule, RouterModule],
  templateUrl: './list-answer.component.html',
  styleUrl: './list-answer.component.scss'
})
export class ListAnswerComponent {

  questions: any = []

  constructor(private coreService: CoreService) { }

  ngOnInit() {
    this.getFrequentAnswers()
  }

  getFrequentAnswers = async () => {
    try {
      let params = this.coreService.setParams({
        itemsPerPage: -1,
      })
      const response: any = await this.coreService.get('/frequentQuestion', params)

      this.questions = response.data
      console.log(this.questions)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
