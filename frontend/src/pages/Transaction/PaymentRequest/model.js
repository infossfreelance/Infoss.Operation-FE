export class PaymentRequestFormModel {
  IsGeneralPayment = 'P'
  CTCType = true

  ShipmentId = ''
  PrincipleBy = ''
  etd = ''
  eta = ''

  PaymentRequestNo = ''
  ReferenceId = ''
  PaymentTo = 'SSLine'
  KursDate = ''
  KursKMK = ''
  Currency = ''

  PrintingL = ''
  PrintingR = ''
  DNVendor = ''
  CustomerId = 0
  CustomerName = ''
  PersonalId = 0
  PersonalName = ''

  IncShipperList = []
  paidUSD = false
  paidIDR = false
  paidDate = ''
  totalUSD = 0
  totalIDR = 0
  taxUSD = 0
  taxIDR = 0
  taxPercent = 0

  Id = 0  // PaymentRequestId
  ContactTypeId = 2

  static convertFromJson(json) {
    let value = new PaymentRequestFormModel()
    const parsedJSON = json ? JSON.parse(json.toString()) : {}

    if (parsedJSON && parsedJSON['paymentRequest']) {
      value.IsGeneralPayment = parsedJSON['paymentRequest']['isGeneralPR']
      value.CTCType = parsedJSON['paymentRequest']['isCostToCost']
      value.DNVendor = parsedJSON['paymentRequest']['vendorDN']
      value.shipmentId = parsedJSON['paymentRequest']['shipmentId']
      value.etd = parsedJSON['paymentRequest']['etd']
      value.eta = parsedJSON['paymentRequest']['eta']
      value.principleBy = parsedJSON['paymentRequest']['agentName']
    }
    if (parsedJSON && parsedJSON['paymentRequestDetails']) {
      value.IncShipperList = parsedJSON['paymentRequestDetails']
    }
    if (parsedJSON && parsedJSON['contactTypeId']) {
      value.ContactTypeId = parsedJSON['contactTypeId']
    }
    return value
  }

  static convertToJson(value = new PaymentRequestFormModel()) {
    return {
      "paymentRequest": {
        "rowStatus": "ACT",
            "countryId": 101,
            "companyId": 32,
            "branchId": 12,
            "id": 10,
            "ticketId": 10,
            "prNo": 10,
            "debetCredit": "C",
            "shipmentId": 10,
            "shipmentNo": "string",
            "etd": "21022-11-108T110:16:29.831Z",
            "eta": "21022-11-108T110:16:29.831Z",
            "reference": "string",
            "prStatus": 10,
            "isGeneralPR": true,
            "customerId": 10,
            "customerTypeId": 10,
            "personalId": 10,
            "paymentUSD": 10,
            "paymentIDR": 10,
            "prContraStatus": "string",
            "prContraNo": 10,
            "paidUSD": true,
            "datePaidUSD": "21022-11-108T110:16:29.831Z",
            "paidIDR": true,
            "datePaidIDR": "21022-11-108T110:16:29.831Z",
            "deleted": true,
            "deletedOn": "21022-11-108T110:16:29.831Z",
            "approveOpr": true,
            "approveOprOn": "21022-11-108T110:16:29.831Z",
            "approveAcc": true,
            "approveAccOn": "21022-11-108T110:16:29.831Z",
            "rate": 10,
            "exRateDate": "21022-11-108T110:16:29.831Z",
            "printing": 10,
            "printedOn": "21022-11-108T110:16:29.831Z",
            "prNo2": "string",
            "exRateId": 10,
            "deletedRemarks": "string",
            "idLama": 10,
            "isCostToCost": true,
            "totalPpnUSD": 10000,
            "totalPpnIDR": 10000,
            "uniqueKeyPR": "string",
            "packingListNo": "string",
            "siCustomerNo": "string",
            "vendorDN": "string",
            "approved": true,
            "approvedOn": "21022-11-108T110:16:29.831Z",
            "approvedBy": "string",
            "approvedRemarks": "string",
            "approvedMarketing": true,
            "approvedMarketingOn": "21022-11-108T110:16:29.831Z",
            "approvedMarketingBy": "string",
            "user": "string"
      },
      "paymentRequestDetails": [] // PaymentRequestFormTableModel Data
    }
  }
}

export class PaymentRequestFormTableModel {
  idRow = null
  Code = ''
  SelectedAccountId = ''
  SelectedAccountName = ''
  IsPaid = false

  Desc = ''
  Amount = 20
  IsCostToCost = false
  IsCostTrucking = false
  Currency = ''

  DefShipNo = ''
  QtyUnit = ''
  DifferentCost = ''
  OriginalRate = ''
  PerUnitCost = ''

  OriginalUSD = ''
  SubjectVAT = false
  FakturNo = ''
  NoPolTruck = ''
  Driver = ''

  static convertFromJson(json) {
    let value = new PaymentRequestFormTableModel()
    const parsedJSON = json ? JSON.parse(json.toString()) : {}

    if (parsedJSON && parsedJSON['data']) {
      value.idRow = parsedJSON['data']['idRow']
      value.Code = parsedJSON['data']['code']
      value.SelectedAccountId = parsedJSON['data']['accountId']
      value.SelectedAccountName = parsedJSON['data']['accountName']
      value.IsPaid = parsedJSON['data']['paid']

      value.Desc = parsedJSON['data']['description']
      value.Amount = parsedJSON['data']['amount']
      value.IsCostToCost = parsedJSON['data']['isCostToCost']
      value.IsCostTrucking = parsedJSON['data']['isCostTrucking']
      value.Currency = parsedJSON['data']['currency']

      value.DefShipNo = parsedJSON['data']['defShipNo']
      value.QtyUnit = parsedJSON['data']['qtyUnit']
      value.DifferentCost = parsedJSON['data']['differentCost']
      value.OriginalRate = parsedJSON['data']['originalRate']
      value.PerUnitCost = parsedJSON['data']['perUnitCost']

      value.OriginalUSD = parsedJSON['data']['originalUSD']
      value.SubjectVAT = (parsedJSON['data']['persenPpn'] && parsedJSON['data']['persenPpn'] === 10)
      value.FakturNo = parsedJSON['data']['fakturNo']
      value.NoPolTruck = parsedJSON['data']['noPolTruck']
      value.Driver = parsedJSON['data']['driver']
    }
    return value
  }

  static convertToJson(value = new PaymentRequestFormTableModel()) {
    return {
      idRow: value.idRow,

      paid: value.IsPaid,
      description: value.Desc,
      amount: value.Amount,
      type: 0,
      isCostToCost: value.IsCostToCost,
      isCostTrucking: value.IsCostTrucking,
      originalUsd: value.OriginalUSD,
      originalRate: value.OriginalRate,
      quantity: value.QtyUnit,
      perQty: value.PerUnitCost,
      fakturNo: value.FakturNo,
      kendaraanNopol: value.NoPolTruck,
      employeeName: value.Driver,
      countryId: 101,
      companyId: 32,
      branchId: 12,
      accountId: value.SelectedAccountId,
      persenPpn: value.SubjectVAT ? 10 : 0,

      rowStatus: "string",
      paymentRequestId: 0,
      sequence: 0,
      debetCredit: "string",
      codingQuantity: true,
      amountCrr: 0,
      paidOn: "2022-10-09T01:25:44.400Z",
      paidPV: true,
      eplDetailId: 0,
      statusMemo: true,
      memoNo: 0,
      idLama: 0,
      isPpn: true,
      fakturDate: "2022-10-09T01:25:44.401Z",
      kendaraanId: 0,
      employeeId: 0,
      mrgId: 0,
      deliveryDate: "2022-10-09T01:25:44.401Z",
      user: "string"
    }
  }
}

export let PaymentHeadersDummy = [
  {
    "column": "id",
    "text": "Id",
    "format": ""
  },
  {
    "column": "code",
    "text": "Code",
    "format": ""
  },
  {
    "column": "paid",
    "text": "Paid",
    "format": ""
  },
  {
    "column": "description",
    "text": "Description",
    "format": ""
  },
  {
    "column": "amountUSD",
    "text": "Amount USD",
    "format": ""
  },
  {
    "column": "amountIDR",
    "text": "Amount IDR",
    "format": ""
  },
  {
    "column": "ctc",
    "text": "Cost To Cost",
    "format": ""
  },
  {
    "column": "ppn",
    "text": "PPn / VAT",
    "format": ""
  },
  {
    "column": "fakturId",
    "text": "Faktur No",
    "format": ""
  },
  {
    "column": "nopol",
    "text": "NoPol Truck",
    "format": ""
  },
  {
    "column": "driver",
    "text": "Driver",
    "format": ""
  }
]
