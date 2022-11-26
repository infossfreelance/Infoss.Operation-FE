export class PaymentRequestFormModel {
  IsGeneralPayment = 'P';
  CTCType = true;

  ShipmentId = 0;

  PrincipleBy = '';
  etd = '';
  eta = '';

  PaymentRequestNo = '';
  ReferenceId = '';
  PaymentTo = 'SSLine';
  KursDate = '';
  KursKMK = null;
  Currency = null;

  PrintingL = '';
  PrintingR = '';
  DNVendor = '';
  CustomerId = 0;
  CustomerName = '';
  PersonalId = 0;
  PersonalName = '';

  IncShipperList = [];
  paidUSD = false;
  paidIDR = false;
  paidDate = null;
  totalUSD = 0;
  totalIDR = 0;
  taxUSD = 0;
  taxIDR = 0;
  taxPercent = 0;

  Id = 0; // PaymentRequestId
  ContactTypeId = 2;

  static convertFromJson(json) {
    let value = new PaymentRequestFormModel();
    const parsedJSON = json ? JSON.parse(json.toString()) : {};

    return value;
  }

  static convertToJson(value = new PaymentRequestFormModel()) {
    return {};
  }
}

export class PaymentRequestFormTableModel {
  Code = null;
  Paid = null;
  Description = null;
  AmountUSD = null;
  AmountIDR = null;
  CostToCost = null;
  VAT = null;
  NoFaktur = null;
  NoPol = null;
  Driver = null;

  static convertFromJson(json) {
    let value = new PaymentRequestFormTableModel();
    const parsedJSON = json ? JSON.parse(json.toString()) : {};

    return value;
  }

  static convertToJson(value = new PaymentRequestFormTableModel()) {
    return {};
  }
}

export let PaymentHeadersDummy = [
  {
    column: 'id',
    text: 'Id',
    format: '',
  },
  {
    column: 'code',
    text: 'Code',
    format: '',
  },
  {
    column: 'paid',
    text: 'Paid',
    format: '',
  },
  {
    column: 'description',
    text: 'Description',
    format: '',
  },
  {
    column: 'amountUSD',
    text: 'Amount USD',
    format: '',
  },
  {
    column: 'amountIDR',
    text: 'Amount IDR',
    format: '',
  },
  {
    column: 'ctc',
    text: 'Cost To Cost',
    format: '',
  },
  {
    column: 'ppn',
    text: 'PPn / VAT',
    format: '',
  },
  {
    column: 'fakturId',
    text: 'Faktur No',
    format: '',
  },
  {
    column: 'nopol',
    text: 'NoPol Truck',
    format: '',
  },
  {
    column: 'driver',
    text: 'Driver',
    format: '',
  },
];
