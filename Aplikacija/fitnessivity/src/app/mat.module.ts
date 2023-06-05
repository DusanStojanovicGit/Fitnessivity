import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule, MatIconModule],
  exports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule, MatIconModule],
})
export class MaterialModule {}