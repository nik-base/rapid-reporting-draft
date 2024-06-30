import { Component, OnInit, inject } from '@angular/core';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  OrderListModule,
  OrderListSelectionChangeEvent,
} from 'primeng/orderlist';
import { Protocol, ReportService, Template } from './report.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    FloatLabelModule,
    OrderListModule,
    SplitterModule,
  ],
  providers: [ReportService],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  private readonly reportService: ReportService = inject(ReportService);

  templates: readonly Template[] = this.reportService.templates;

  protocols: Protocol[] = this.reportService.protocols;

  filteredTemplates: Template[] = [];

  formGroup: FormGroup = new FormGroup({
    template: new FormControl<Template | null>(null),
  });

  ngOnInit() {}

  filterTemplate(event: AutoCompleteCompleteEvent): void {
    this.filteredTemplates = this.templates.filter((t) =>
      t.name.toLowerCase().includes(event.query.toLowerCase()),
    );
  }
}
