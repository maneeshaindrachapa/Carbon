import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnersPage } from './owners';

@NgModule({
  declarations: [
    OwnersPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnersPage),
  ],
})
export class OwnersPageModule {}
