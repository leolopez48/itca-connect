import { Injectable } from '@angular/core';
import { CoreService } from '../../core/providers/core.service';

@Injectable()
export class CalendarService extends CoreService {
    baseUrl = '/core/event'

    super() { }

    async getEvents(initialDate: String, finalDate: String): Promise<any> {
        this.baseUrl = '/core'

        let httpParams = this.setParams({
            initialDate,
            finalDate
        });


        return await this.get('/eventBydates', httpParams);
    }
}