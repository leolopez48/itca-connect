import { Injectable } from '@angular/core';
import { CoreService } from '../../core/providers/core.service';

@Injectable()
export class CalendarService extends CoreService {
    baseUrl = 'http://192.168.1.253:9090/api'

    super() { }

    async getEvents(initialDate: String, finalDate: String): Promise<any> {
        let httpParams = this.setParams({
            initialDate,
            finalDate
        });


        return await this.get('/eventBydates', httpParams);
    }
}