import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-victims',
  templateUrl: './add-victims.page.html',
  styleUrls: ['./add-victims.page.scss'],
})
export class AddVictimsPage implements OnInit {
  victims: any;
  victimName: any;
  // victimGroup: any;

  constructor(private crudService: CrudService, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.crudService.getVictims().subscribe(data => {

      this.victims = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          VictimName: (e.payload.doc.data() as any).VictimName,
          // VictimGroup: (e.payload.doc.data() as any).VictimGroup,
        };
      });
      console.log(this.victims);

    });
  }

  create(): void {
    const command: any = {};
    command.VictimName = this.victimName;
    command.VictimPoints = 0;
    // command.VictimGroup = this.victimGroup;
    console.log(command);
    this.crudService.createVictim(command).then(resp => {
      this.victimName = '';
      // this.victimGroup = '';
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

}
