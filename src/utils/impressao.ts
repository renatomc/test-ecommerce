import { TDocumentDefinitions } from '../dtos/types';

interface ImpressaoDTO {
  id: number;
  title: string;
  amount: number;
  image: string;
  price: number;
  priceFormated: string;
  priceTotal: string;
}

export class Impressao {
  dataPrinter: ImpressaoDTO[];

  total: string;

  user: string;

  documentBody: any;

  constructor(data: ImpressaoDTO[], total: string, user: string) {
    this.user = user;
    this.dataPrinter = data;
    this.total = total;
  }

  public async prepareDocument(): Promise<TDocumentDefinitions> {
    this.documentBody = this.documentBodyGenerate();
    const document = this.documentGenerate();
    return document;
  }

  public documentBodyGenerate(): any {
    const headerClient = [
      { text: 'Cliente', fontSize: 8 },
      { text: this.user, fontSize: 8, colSpan: 2 },
      {},
    ];

    const header = [
      { text: 'Nome Produto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Qtd.', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Valor', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
    ];

    const body = this.dataPrinter.map(prod => {
      return [
        { text: prod.title, fontSize: 8 },
        { text: prod.amount, fontSize: 8 },
        { text: prod.price, fontSize: 8 },
      ];
    });

    const lineHeader = [
      {
        text: '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
        alignment: 'center',
        fontSize: 5,
        colSpan: 3,
      },
      {},
      {},
    ];

    const total = [
      { text: 'Total', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      {},
      { text: this.total, bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
    ];

    const lineTotal = [
      {
        text: '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
        alignment: 'center',
        fontSize: 5,
        colSpan: 3,
      },
      {},
      {},
    ];

    const content = [headerClient, header, lineHeader];
    return [...content, ...body, lineTotal, total];
  }

  public documentGenerate(): any {
    const documento = {
      pageSize: 'A4',
      pageMargins: [14, 53, 14, 48],
      header() {
        return {
          margin: [14, 12, 14, 0],
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [[{ text: 'Comprovante de compra', style: 'reportName' }]],
          },
        };
      },
      content: [
        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: ['*', 55, 55],

            body: this.documentBody,
          },
        },
      ],
      footer(currentPage: number, pageCount: number) {
        return {
          layout: 'noBorders',
          margin: [14, 0, 14, 22],
          table: {
            widths: ['auto'],
            body: [
              [
                {
                  text: '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                  alignment: 'center',
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: 'right',
                    margin: [3, 0],
                  },
                  {
                    text: '© Framework',
                    fontSize: 7,
                    alignment: 'center',
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [0, 4, 0, 0],
        },
      },
    };
    return documento;
  }
}
