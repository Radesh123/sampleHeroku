import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiddenDirective } from "./hidden.directive";
import { UnderlineDirective } from "./underline.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HiddenDirective,
    UnderlineDirective
  ],
  exports: [
    HiddenDirective,  
    UnderlineDirective
  ]
})
export class SharedModule { }
