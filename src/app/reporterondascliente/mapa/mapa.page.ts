import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import mapboxgl  from 'mapbox-gl';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  @Input() datos;
  constructor(
    private modalController:ModalController,
  ) { }

  ngOnInit() {

    
    const lat=this.datos['LAT'];
    const long=this.datos['LONG']
    

mapboxgl.accessToken='pk.eyJ1IjoiY2FsYmFuYyIsImEiOiJjbHNtczVmbXcwbXp1MmxzY2FveTdqbGhmIn0.cJ7Iuo19UYU7BiDAqR7FpQ';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
      center: [long,lat], // starting position [lng, lat]
      zoom: 15 // starting zoom
    });
    map.on('load', function () {
      map.resize();
    });

    const marker=new mapboxgl.Marker({draggable:false}).setLngLat([long,lat]).addTo(map)

    
  }

  salir(){
    this.modalController.dismiss();
  } 

}
