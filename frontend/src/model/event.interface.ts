export interface IEvent {
    id?:number;
    name?: number;
    date_start?: Date;
    date_end?: Date;
    type_event_id?:string;
  }

  export interface ITypeEvent {
    id?:number;
    name?: number;
    color?:string;
    campus?:string;
  }

  
  export interface ICampus {
    id?:number;
    name?: number;
  }

    
  export interface ISchool {
    id?:number;
    name?: number;
    campus?:string;
  }
  
  