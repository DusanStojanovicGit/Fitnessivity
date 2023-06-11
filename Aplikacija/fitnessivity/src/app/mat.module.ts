import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion'

@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule, MatIconModule, MatDialogModule, MatButtonModule, MatExpansionModule],
  exports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule, MatIconModule, MatDialogModule, MatButtonModule, MatExpansionModule],
})
export class MaterialModule {}