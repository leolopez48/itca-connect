import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Map, Overlay, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import 'ol/ol.css';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import * as Proj from 'ol/proj';
import {
  defaults as defaultControls,
  Control
} from 'ol/control';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { DetailCampusPlaceService } from '../admin/providers/detail-campus-place.service';
import { ToastService } from '../core/providers/toast.service';
import { IDetailCampusPlace } from '../../model/event.interface';

export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';

export const DEFAULT_LAT = 13.674310551398067;
export const DEFAULT_LON = -89.27880308940054;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;
  @Input() zoom: number = 18;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;

  @Output() movestart = new EventEmitter<any>();
  @Output() moveend = new EventEmitter<any>();
  places: any = [];
  public target: string = 'map-' + Math.random().toString(36).substring(2);
  map: Map;

  private mapEl: HTMLElement;
  displayModal: boolean = false;
  modalContent: any;

  constructor(private elementRef: ElementRef, private detailCampusService: DetailCampusPlaceService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.mapEl = this.elementRef.nativeElement.querySelector('#' + this.target);

  }

  ngAfterViewInit(): void {
    console.log(this.lat);
    this.setSize();

    console.log(this.target)

    this.map = new Map({
      target: this.target,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: Proj.fromLonLat([this.lon, this.lat]),
        zoom: this.zoom
      }),
      controls: defaultControls({ attribution: false, zoom: false }).extend([])

    });
    this.getDetailCampusPlaces();


    this.map.on("moveend", (e) => {
      this.moveend.emit(e);
    });
    this.map.on("movestart", (e) => {
      this.movestart.emit(e);
    });
    this.map.on('click', (event) => {
      this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
        const clickedFeature = feature as Feature;
        if (clickedFeature && clickedFeature.get('data')) {
          this.modalContent = clickedFeature.get('data');
          this.displayModal = true;
        }
      });
    });
  }

  getDetailCampusPlaces() {
    this.detailCampusService.Index().subscribe({
      next: (res) => {
        console.log(res);
        this.places = res.data;
        this.places.forEach((dat: { latitude: number; longitude: number; }) => {
          this.addMarker(dat.longitude, dat.latitude, dat)
        });
      },
      error: (err) => {
        console.log(err);
        this.toastService.show(
          err,
          {
            classname: 'bg-danger text-light te',
            delay: 3000,
            header: '¡Ha ocurrido un error!'
          });
      },
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.map) {
      this.map.setView(new View({
        center: Proj.fromLonLat([this.lon, this.lat]),
        zoom: this.zoom
      }));
    }
  }

  private setSize() {
    if (this.mapEl) {
      const styles = this.mapEl.style;
      styles.height = coerceCssPixelValue(this.height) || DEFAULT_HEIGHT;
      styles.width = coerceCssPixelValue(this.width) || DEFAULT_WIDTH;
    }
  }

  public setMarker(vector: any) {
    this.map.addLayer(vector);
  }

  public setControl(control: Control) {
    this.map.addControl(control);
  }

  addMarker(lat: number, lon: number, data: any) {
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([lon, lat])),
      data: data
    });

    const iconStyle = new Style({
      image: new Icon({
        src: 'assets/marcador.png', // Aquí usa el URL del icono de PrimeNG
        anchor: [0.5, 1],
        color: '#ff0000' // Cambia el color si es necesario
      })
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature]
    });

    const markerLayer = new VectorLayer({
      source: vectorSource
    });

    this.map.addLayer(markerLayer);

  }
}


const cssUnitsPattern = /([A-Za-z%]+)$/;

function coerceCssPixelValue(value: any): string {
  if (value == null) {
    return '';
  }

  return cssUnitsPattern.test(value) ? value : `${value}px`;
}


