import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {Gs} from "../../../models/gs";
import {GsServiceService} from "../../../services/gs-service.service";
import {UserService} from "../../../services/UserService.service";
import {Usuario} from "../../../models/usuario";
import { Filesystem, Directory } from '@capacitor/filesystem';

import { Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import {Imagegs} from "../../../models/imagegs";
import {global} from "../../../services/global";

const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}
@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  @Input() datos;
  public title:String='';
  public accion:String='nuevo';
  public guardias:Gs;
  public usuario:Usuario;
  public username:String='';
  public usuarios:any;
  public base64: string='';
  public idcompany=localStorage.getItem('IDCOMPANY');
  public imgaen:Imagegs
  public url:String='';
  images: LocalFile[] = [];

  constructor(
    private modalCtrl:ModalController,
    private gsService:GsServiceService,
    private userService:UserService,
    private alertController:AlertController,
    private plt: Platform,
  ) {
    //this.url=global.url;

    this.guardias=new Gs(0,this.idcompany!,'','','','',0);
    this.usuario=new Usuario('','','','',this.idcompany!,'','','','TODOS','');
    this.imgaen=new Imagegs('','');
  }

  ngOnInit() {
    this.usuario.IDCOMPANYUSER!=this.idcompany;
    this.getuserbycompany();

    if(this.datos=='nuevo'){
      this.title='Crear nuevo guardia';
      this.accion='nuevo';
    }else{
      this.title='Editar guardia';
      this.accion='editar';
      //this.consultarguardia();
      this.guardias.id=this.datos.id;
      this.guardias.idcompany=this.datos.idcompany;
      this.guardias.NAME=this.datos.NAME;
      this.guardias.LASTNAME=this.datos.LASTNAME;
      this.guardias.TELEFONO=this.datos.TELEFONO;
      this.guardias.TAGNFC=this.datos.TAGNFC;
      this.usuario.IDCOMPANYUSER=this.datos.idcompany;


      this.guardias.USERID=this.datos.user.ID;
      this.username=this.datos.user.USERNAME;
      this.url='https://api.seguridadsegser.com/api/gs/getimagen/'+this.guardias.USERID.toString();
      console.log(this.url)


    }

  }

  getuserbycompany(){
    this.userService.getuserbycompany(this.usuario).subscribe(
      response=>{
        this.usuarios=response.data;
        console.log(response)
      },error => {

      }
    );
  }

  usuarioChange($event){

  }
  async eliminar(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar guardia',
      message:'Esta seguro de eliminar el guardia ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.gsService.delete(this.guardias).subscribe(
              response=>{
                if(response.code=='200'){
                  this.modalCtrl.dismiss();
                }

              },error => {

              }
            )
          }
        }
      ]
    });

    return await alert.present();
  }

  async crear(){

    console.log(this.guardias);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Guardar guardia',
      message:'Esta seguro de guardar el guardia ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Guardar',
          handler: () => {
            this.imgaen.userid=this.guardias.USERID.toString();
            this.imgaen.imagen=this.base64;

            this.gsService.enviarfoto(this.imgaen).subscribe(
              response=>{
                  console.log(response);
              },error => {

              }
            )

            this.gsService.register(this.guardias).subscribe(
              response=>{
                if(response.code=='200'){
                  this.modalCtrl.dismiss();
                }

              },error => {

              }
            )
          }
        }
      ]
    });

    return await alert.present();



  }
  async editar(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Actualizar guardia',
      message:'Esta seguro de actualizar el guardia ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Actualizar',
          handler: () => {
            this.imgaen.userid=this.guardias.USERID.toString();
            this.imgaen.imagen=this.base64;

            this.gsService.enviarfoto(this.imgaen).subscribe(
              response=>{
                console.log(response);
              },error => {

              }
            )
            this.gsService.update(this.guardias).subscribe(
              response=>{
                if(response.code=='200'){
                  this.modalCtrl.dismiss();
                }

              },error => {

              }
            )
          }
        }
      ]
    });

    return await alert.present();
  }

  salir(){
    this.modalCtrl.dismiss();
  }
  fecha(event:any){


    console.log(event.detail.value);

  }


  async camara(){
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      width:600,
      height:800,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera // Camera, Photos or Prompt!
    });

    if (image) {
      this.saveImage(image);
    }else{
      console.log('aksdkjsa');
    }
  }

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    console.log('base 64 data'+base64Data);
    const fileName =this.username+'.jpg';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
    });
    this.base64=base64Data.toString() ;


    this.loadFiles();
  }
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
  async loadFiles() {
    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    }).then(result => {
        console.log(result);
        if(result.files.length>=1){
          this.loadFileData(result.files);
        }
      },
      async (err) => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: Directory.Data,
        });
      }
    ).then(_ => {
    });

  }
  async loadFileData(fileNames: any) {
    const filePath = `${IMAGE_DIR}/${fileNames[0]?.name}`
    console.log(filePath);
    const fileExists = await Filesystem.stat({
      path: filePath,
      directory: Directory.Data,
    });
    if (fileExists) {
      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });
      this.images.push({
        name: fileNames[0],
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    } else {
      console.log('no se encontro con el archivo')
    }


  }

}
