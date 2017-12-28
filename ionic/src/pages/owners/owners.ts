import { Component } from '@angular/core';
import { IonicPage,AlertController} from 'ionic-angular';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { elementDef } from '@angular/core/src/view/element';
 
declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-owners',
  templateUrl: 'owners.html',
})
export class OwnersPage {
  username:string;
  shop_id:number;
  addProductDetails = { productname: '',price:'',details:'',picture:''};
  createSuccess = false;

  lastImage: string = null;
  loading: Loading;
 

  imageData;
  imageUrl;
  imageURI;
  hideImage=true;
  imageFileName:any;

  constructor(private nav: NavController, private auth: AuthService,private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.getShopDetails();
  }

  private addProduct(){
    this.auth.addProduct(this.addProductDetails,this.shop_id).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Product Added");
      } else {
        this.showPopup("Error", "Problem Adding Product");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
      return true;
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  getShopDetails(){
    this.auth.getShopDetails().subscribe(res => {
      this.username=res.ownername;
      this.shop_id=Number(res.shop_id);
      this.auth.setShop(this.shop_id);
      console.log(res.ownername);
    },
    error => {
      console.log(error);
    });
  }

  showProducts(){
    this.nav.push('ProductsPage');
  }

  logout(){
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }
  orders(){
    this.nav.push('OrdersPage');
  }



  public presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            //this.getPhoto();
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath)=>{
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath =>{
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            console.log(correctPath);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      }else{
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        console.log(correctPath);
        this.imageUrl=correctPath;
        this.hideImage=true;
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    },((err) => {
      this.presentToast('Error while selecting image.');
    }));
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  } 
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    },error => {
      console.log(error);
      this.presentToast('Error while storing file.');
    });
  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = "http://localhost/carbon/api/upload.php";
    console.log("CCSCcs");
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
    console.log(targetPath);
    // File name only
    var filename = this.lastImage;
  
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };
  
    const fileTransfer: TransferObject = this.transfer.create();
  
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
  
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    },err => {
      alert(err);
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }

 


  getPhoto(){
    let options:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.FILE_URI,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit:false,
      encodingType:this.camera.EncodingType.PNG,
      correctOrientation:true,
      targetHeight:512,
      targetWidth:512
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.imageData=imageData;
      this.imageURI=imageData;
      this.imageUrl="data:image/png;base64,"+imageData;
      this.hideImage=false;
    });
  }

  uploadPhoto() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer:TransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.imageUrl.substr(this.imageUrl.lastIndexOf('/')+1),
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {'X-CSRF-Token': localStorage.getItem('u:token'),
                'headerParam':'headerValue',
      }
    }
    let image=this.filePath.resolveNativePath(this.imageUrl);

    if(image===this.imageUrl){
      alert(true);
    }

    fileTransfer.upload(this.imageUrl, encodeURI('http://192.168.8.101/carbon/api/upload.php'), options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      //this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      alert("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      alert(err);
    });
  }

}
