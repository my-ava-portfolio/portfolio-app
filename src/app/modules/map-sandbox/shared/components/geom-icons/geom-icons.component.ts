import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { strokeWidthCoeff } from '../../globals';

@Component({
  selector: 'app-geom-icons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './geom-icons.component.html',
  styleUrls: ['./geom-icons.component.scss']
})
export class GeomIconsComponent {
  @Input() geomType!: string;
  @Input() strokeColor!: string;
  @Input() fillColor!: string | null;
  @Input() strokeWidth!: number;
  @Input() title!: string;


  _strokeWidthCoeff = strokeWidthCoeff;
  _strokeWidthLineCoeff = strokeWidthCoeff;
}
