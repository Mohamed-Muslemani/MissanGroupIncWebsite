import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Project} from '../../Shared/Modules/project';
import {mockProjectData} from '../../Shared/Data/mockProject.data';
import {NgIf} from '@angular/common';
import {FooterComponent} from '../footer/footer.component';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-project-detail',
  imports: [
    RouterLink,
    NgIf,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './project-detail.component.html',
  standalone: true,
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
  project: any;
  projectList: Project[] = mockProjectData
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.project = this.projectList.find(p => p.id === id);
  }

}
