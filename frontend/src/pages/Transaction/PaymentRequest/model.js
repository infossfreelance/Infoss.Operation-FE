export class PaymentRequestFormModel {
  IsGeneralPayment = 'P'
  CTCType = true
  DNVendor = ''
  shipmentId = ''
  etd = ''
  eta = ''
  principleBy = ''
  vat = 11
  IncShipperList = []
  ContactTypeId = 50
  paymentTo = 'SSLine'
  contactTypeId = 2
  paymentUSD = 0
  paymentIDR = 0
  totalVATUSD = 0
  totalVATIDR = 0
  paid = false
  paidOn = ''
  rate = 0
  kursKMK = 0
  currency = 1
  idPaymentRequest = 0

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
  Code = null
  Paid = null
  Description = null
  AmountUSD = null
  AmountIDR = null
  CostToCost = null
  VAT = null
  NoFaktur = null
  NoPol = null
  Driver = null

  static convertFromJson(json) {
    let value = new PaymentRequestFormTableModel()
    const parsedJSON = json ? JSON.parse(json.toString()) : {}

    if (parsedJSON && parsedJSON['data']) {
      value.Code = parsedJSON['data']['code']
      value.Paid = parsedJSON['data']['paid']
      value.Description = parsedJSON['data']['description']
      value.AmountUSD = parsedJSON['data']['amountUSD']
      value.AmountIDR = parsedJSON['data']['amountIDR']
      value.CostToCost = parsedJSON['data']['costToCost']
      value.VAT = parsedJSON['data']['vat']
      value.NoFaktur = parsedJSON['data']['noFaktur']
      value.NoPol = parsedJSON['data']['noPol']
      value.Driver = parsedJSON['data']['driver']
    }
    return value
  }

  static convertToJson(value = new PaymentRequestFormTableModel()) {
    return {
      "rowStatus": "string",
      "countryId": 10,
      "companyId": 10,
      "branchId": 10,
      "paymentRequestId": 10,
      "sequence": 10,
      "debetCredit": "string",
      "accountId": 10,
      "description": "string",
      "type": 10,
      "codingQuantity": true,
      "quantity": 10,
      "perQty": 10,
      "amount": 10,
      "amountCrr": 10,
      "paid": true,
      "paidOn": "21022-11-108T110:16:29.831Z",
      "paidPV": true,
      "eplDetailId": 10,
      "statusMemo": true,
      "memoNo": 10,
      "idLama": 10,
      "isCostToCost": true,
      "isPpn": true,
      "persenPpn": 10,
      "fakturNo": "string",
      "fakturDate": "21022-11-108T110:16:29.832Z",
      "isCostTrucking": true,
      "kendaraanId": 10,
      "kendaraanNopol": "string",
      "employeeId": 10,
      "employeeName": "string",
      "mrgId": 10,
      "deliveryDate": "21022-11-108T110:16:29.832Z",
      "originalUsd": 10,
      "originalRate": 10,
      "user": "string"
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
