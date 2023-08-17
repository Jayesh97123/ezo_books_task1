import { Component } from '@angular/core';
import { ImageService } from '../service/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent {
  imageData: any;
  loader: boolean = true;

  constructor(private image_list_service: ImageService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getImageListData();
  }

  getImageListData() {
    this.image_list_service.getImageListData().subscribe((res) => {
      console.log(res);
      this.imageData = res;
      setTimeout(() => (this.loader = false), 500);
    });
  }
}
