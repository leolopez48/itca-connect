import { Injectable } from '@angular/core';
import { CoreService } from '../../core/providers/core.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class CalendarService extends CoreService {
    baseUrl: string = environment.coreApi;

    super() { }

    async getEvents(initialDate: String, finalDate: String): Promise<any> {
        let httpParams = this.setParams({
            initialDate,
            finalDate
        });


        return await this.get('/eventBydates', httpParams);
    }
}