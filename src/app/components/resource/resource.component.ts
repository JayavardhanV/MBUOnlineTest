import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource/resource.service'

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  resouces: any[]

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.getAllResources()
  }

  getAllResources() {
    this.resourceService.getAllResources({}).subscribe(
      response => {
        this.resouces = response["data"];
      }
    )
  }


}
