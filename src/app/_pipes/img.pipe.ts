import { PipeTransform, Pipe } from "@angular/core";
import { environment } from 'src/environments/environment';

@Pipe({ name: 'imgPipe' })
export class ImagePipe implements PipeTransform {
  transform(value) {
    const s = value.split('uploads/');

    return s[1];
  }
}