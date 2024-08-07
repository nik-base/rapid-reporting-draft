import { Component, OnInit, inject } from '@angular/core';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  OrderListModule,
  OrderListSelectionChangeEvent,
} from 'primeng/orderlist';
import { Finding, Protocol, ReportService, Template } from './report.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { EditorModule } from 'primeng/editor';
import {
  PickListModule,
  PickListMoveToTargetEvent,
  PickListSourceFilterEvent,
  PickListTargetFilterEvent,
} from 'primeng/picklist';
import { InputSwitchChangeEvent, InputSwitchModule } from 'primeng/inputswitch';
import Quill from 'quill';

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
    PickListModule,
    InputSwitchModule,
    EditorModule,
  ],
  providers: [ReportService],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  private readonly reportService: ReportService = inject(ReportService);

  templates: readonly Template[] = this.reportService.templates;

  protocols: Protocol[] = [];

  filteredTemplates: Template[] = [];

  findingList: Map<string, Finding[]> = new Map<string, Finding[]>();

  selectedFindings: Map<string, Finding[]> = new Map<string, Finding[]>();

  currentProtocol: Protocol | undefined;

  editor: Quill | undefined;

  formGroup: FormGroup = new FormGroup({
    template: new FormControl<Template | null>(null),
    allowTagSearch: new FormControl<boolean>(true),
    onlyExactTagSearch: new FormControl<boolean>(false),
    report: new FormControl<string>(''),
  });

  ngOnInit() {}

  onEditorCreated(event: any): void {
    console.log(event);
    this.editor = event.editor;
  }

  onReportChange(event: any): void {
    console.log(event);
  }

  onFindingSelect(event: PickListMoveToTargetEvent): void {
    console.log(event);
    console.log(this.selectedFindings.get(this.currentProtocol!.id));

    const protocolIndex = this.protocols.findIndex(
      (f) => f.id === this.currentProtocol!.id,
    );

    const findings = this.selectedFindings.get(this.currentProtocol!.id);

    const findingsParagraph =
      findings?.map((m) => m.description)?.join('. ') ?? '';

    const linkNode = document.querySelector(`#rapid-${protocolIndex}`);

    if (!linkNode) {
    }

    //const linkBlot = Quill.find(linkNode!) as Blot;

    //const index = this.editor?.getIndex(linkBlot);

    //this.editor?.updateContents(new Delt());

    this.editor?.insertText(protocolIndex + 1, findingsParagraph);
  }

  filterTemplate(event: AutoCompleteCompleteEvent): void {
    this.filteredTemplates = this.templates.filter((t) =>
      t.name.toLowerCase().includes(event.query.toLowerCase()),
    );
  }

  onTemplateSelect(event: AutoCompleteSelectEvent): void {
    this.protocols = this.reportService.protocols.filter(
      (f) => f.templateId === event.value.id,
    );
  }

  onProtocolSelect(event: OrderListSelectionChangeEvent): void {
    this.currentProtocol = event.value[0];

    const findings = this.reportService.findings.filter(
      (f) => f.protocolId === event.value[0].id,
    );

    if (!this.findingList.has(this.currentProtocol!.id)) {
      this.findingList.set(this.currentProtocol!.id, findings);
    }

    if (!this.selectedFindings.has(this.currentProtocol!.id)) {
      this.selectedFindings.set(this.currentProtocol!.id, []);
    }
  }

  onAllowTagSearchChange(event: InputSwitchChangeEvent): void {
    this.triggerFindingsSearch();

    event.checked
      ? this.formGroup.controls['onlyExactTagSearch'].enable()
      : this.formGroup.controls['onlyExactTagSearch'].disable();

    if (event.checked) {
      return;
    }

    this.formGroup.controls['onlyExactTagSearch']?.setValue(false);
  }

  onExactTagSearchChange(_: InputSwitchChangeEvent): void {
    this.triggerFindingsSearch();
  }

  private triggerFindingsSearch(): void {
    document
      .querySelector('input[data-pc-section="sourceFilterInput"]')
      ?.dispatchEvent(new Event('keyup'));

    document
      .querySelector('input[data-pc-section="targetFilterInput"]')
      ?.dispatchEvent(new Event('keyup'));
  }

  onAvailableFindingsFilter(event: PickListSourceFilterEvent): void {
    this.findingsFilter(event, this.findingList);
  }

  onSelectedFindingsFilter(event: PickListTargetFilterEvent): void {
    this.findingsFilter(event, this.selectedFindings);
  }

  private findingsFilter(
    event: PickListSourceFilterEvent | PickListTargetFilterEvent,
    findingsMap: Map<string, Finding[]>,
  ) {
    if (
      !event.query ||
      !this.formGroup.controls['allowTagSearch']!.getRawValue()
    ) {
      return;
    }

    const moreFindings = findingsMap
      .get(this.currentProtocol!.id)!
      .filter((f) =>
        f.tags?.some((s) => {
          return this.formGroup.controls['onlyExactTagSearch']!.getRawValue()
            ? s === event.query
            : s.includes(event.query!);
        }),
      );

    if (!moreFindings?.length) {
      return;
    }

    for (const item of moreFindings) {
      if (!event.value?.find((f) => f.id === item.id)) {
        event.value?.push(item);
      }
    }
  }
}
