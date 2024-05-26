export interface IEvent {
    id?:number;
    name?: number;
    date_start?: Date;
    date_end?: Date;
    type_event_id?:string;
  }

  export interface ITypeEvent {
    id?:number;
    name?: string;
    color?:string;
    campus?:string;
  }


  export interface ICampus {
    id?:number;
    name?: number;
  }

  export interface IFrequentQuestion {
    id?:number;
    question?: string;
    answer?: string;
  }


  export interface IPlaceType {
    id?:number;
    name?: number;
    icon?:string;
  }

  export interface IDetailCampusPlace {
    id?:number;
    longitude?: string;
    latitude?:string;
    campus_id?:string;
    place_type_id?:string;
  }

  export interface ISchool {
    id?:number;
    name?: number;
    campus?:string;
  }

