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
  readonly protocolId: string;
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
      name: 'MRI Cervical Spine',
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
      id: '6',
      name: 'Protocol',
      order: 1,
      templateId: '2',
    },
    {
      id: '7',
      name: 'Patient Info',
      order: 2,
      templateId: '2',
    },
    {
      id: '8',
      name: 'Disc C4/5',
      order: 3,
      templateId: '2',
    },
    {
      id: '9',
      name: 'Disc C6/7',
      order: 4,
      templateId: '2',
    },
    {
      id: '10',
      name: 'Protocol',
      order: 1,
      templateId: '3',
    },
  ];

  findings: Finding[] = [
    {
      id: '1',
      description:
        'Plain and contrast CT section of the abdomen have been obtained',
      tags: ['protocol', 'liver', 'liver protocol'],
      protocolId: '1',
    },
    {
      id: '2',
      description: 'Patient Name:        Age:            ',
      tags: ['patient', 'patient information'],
      protocolId: '2',
    },
    {
      id: '3',
      description: 'Liver appears normal in size and shape',
      tags: ['normal'],
      protocolId: '3',
    },
    {
      id: '4',
      description:
        'CT demonstrates of hyperechoic lesion with attenuation of the beam suggesting possible fat content',
      tags: ['adenoma', 'hepatic', 'hepatic adenoma'],
      protocolId: '3',
    },
    {
      id: '5',
      description:
        'CT demonstrates central hemorrhagic portions of cavernous hemangiomas remain non-enhancing',
      tags: ['hemangioma', 'hepatic', 'hepatic hemangioma'],
      protocolId: '3',
    },
    {
      id: '6',
      description:
        'Small focal hepatocellular carcinoma appears hypoechoic compared with normal liver',
      tags: ['HCC', 'Hepatocellular carcinoma', 'carcinoma', 'hepato'],
      protocolId: '3',
    },
    {
      id: '7',
      description: 'Predominantly portal venous supply to dysplastic nodules',
      tags: ['cirrhosis'],
      protocolId: '3',
    },
    {
      id: '8',
      description: 'Gall bladder is distended and appears normal',
      tags: ['normal'],
      protocolId: '4',
    },
    {
      id: '9',
      description:
        'The CT features of acute cholecystitis include gallstones, thickening of the gallbladder wall, pericholecystic fluid, stranding of the pericholecystic fat, high-attenuation bile, and blurring of the interface between the gallbladder and the liver',
      tags: ['Cholecystitis', 'stone'],
      protocolId: '4',
    },
    {
      id: '10',
      description:
        'Gallbladder carcinoma is a mass that fills most of an enlarged and deformed',
      tags: ['Carcinoma'],
      protocolId: '4',
    },
    {
      id: '11',
      description: 'Both kidneys appears normal in size',
      tags: ['normal'],
      protocolId: '5',
    },
    {
      id: '12',
      description:
        'Contrast-enhanced CT scan at corticomedullary phase shows fistula ',
      tags: ['Iatrogenic'],
      protocolId: '5',
    },
    {
      id: '13',
      description: 'Sagittal T2W scan of the cervical spine was performed ',
      tags: ['protocol', 'cervical', 'spine', 'cervical spine'],
      protocolId: '6',
    },
    {
      id: '14',
      description: 'Patient Name:        Age:            ',
      tags: ['patient', 'patient information'],
      protocolId: '7',
    },
    {
      id: '15',
      description: 'Appears normal',
      tags: ['normal'],
      protocolId: '8',
    },
    {
      id: '16',
      description: 'Posterior disc bulges are seen at C4/5',
      tags: ['bulges', 'posterior'],
      protocolId: '8',
    },
    {
      id: '17',
      description: 'Appears normal',
      tags: ['normal'],
      protocolId: '9',
    },
    {
      id: '18',
      description: 'Moderate stenosis with compression of spinal cord',
      tags: ['stenosis', 'compression'],
      protocolId: '9',
    },
    {
      id: '19',
      description: 'Some protocol performed',
      tags: ['protocol'],
      protocolId: '10',
    },
  ];
}
