import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { ModalController } from '@ionic/angular';
import { AddVictimsPage } from '../add-victims/add-victims.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  victims: any;
  // groups: any;

  constructor(
    private crudService: CrudService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.crudService.getVictims().subscribe(data => {

      this.victims = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          VictimName: (e.payload.doc.data() as any).VictimName,
          // VictimGroup: (e.payload.doc.data() as any).VictimGroup,
          VictimPoints: (e.payload.doc.data() as any).VictimPoints,
        };
      }).sort((a, b) => (a.VictimPoints > b.VictimPoints) ? -1 : 1);
      console.log(this.victims);
      // this.groups = this.victims.map(v => v.groups);
    });
  }

  RemoveRecord(victimId) {
    this.crudService.deleteVictim(victimId);
  }

  async addVictim() {
    const modal = await this.modalController.create({
      component: AddVictimsPage
    });
    return await modal.present();
  }

  addPoints(itemId) {
    const data = this.victims.find(v => v.id === itemId);
    if (data.VictimPoints % 10 === 0) {
      data.VictimPoints = data.VictimPoints + 5;
    } else {
      data.VictimPoints = data.VictimPoints ? data.VictimPoints + 1 : 1;
    }
    this.crudService.editVictim(itemId, data);
  }
}
