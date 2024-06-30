import { Injectable } from '@angular/core';

export interface Template {
  readonly id: string;
  readonly name: string;
}

export interface Protocol {
  readonly id: string;
  readonly name: string;
  readonly order: number;
  readonly templateId: string;
}

export interface Finding {
  readonly id: string;
  readonly description: string;
  readonly tags?: string[];
}

@Injectable()
export class ReportService {
  templates: Template[] = [
    {
      id: '1',
      name: 'CECT Abdomen Pelvis',
    },
    {
      id: '2',
      name: 'MRI Brain',
    },
    {
      id: '3',
      name: 'Some other template',
    },
  ];

  protocols: Protocol[] = [
    {
      id: '1',
      name: 'Protocol',
      order: 1,
      templateId: '1',
    },
    {
      id: '2',
      name: 'Patient Info',
      order: 2,
      templateId: '1',
    },
    {
      id: '3',
      name: 'Liver',
      order: 3,
      templateId: '1',
    },
    {
      id: '4',
      name: 'Gall Bladder',
      order: 4,
      templateId: '1',
    },
    {
      id: '5',
      name: 'Kidney',
      order: 5,
      templateId: '1',
    },
    {
      id: '1',
      name: 'Protocol',
      order: 1,
      templateId: '2',
    },
    {
      id: '2',
      name: 'Patient Info',
      order: 2,
      templateId: '2',
    },
    {
      id: '3',
      name: 'Frontal Lobe',
      order: 3,
      templateId: '2',
    },
    {
      id: '4',
      name: 'Temporal Lobe',
      order: 4,
      templateId: '2',
    },
    {
      id: '1',
      name: 'Protocol',
      order: 1,
      templateId: '3',
    },
  ];
}
