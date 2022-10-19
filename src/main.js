import "./css/index.css"
import Imask from "imask"
const ccColorCard1 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path"
)
const ccColorCard2 = document.querySelector(
  ".cc-bg svg > g g:nth-child(2) path"
)
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  console.log("type:", type)
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    masterCard: ["#DF6F29", "#C69347"],
    hiperCard: ["#F22D2D", "#000"],
    default: ["#000", "#FFF"],
  }
  ccColorCard1.setAttribute("fill", colors[type][0])
  ccColorCard2.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("hiperCard")
globalThis.setCardType = setCardType
//security code
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = Imask(securityCode, securityCodePattern)
//card number

//visa starts with 4 followed by another 15
//^4\{0,15}
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000 000',
      regex: /^4\d{0,15}/,
      cardType: 'visa'
    },
    {
      mask: '0000 0000 0000 0000 000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: 'masterCard'
    }
  ],
  dispath: function (oppended,) {
    var nuber = 1
  }
}

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: Imask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    },
    MM: {
      mask: Imask.MaskedRange,
      from: 1,
      to: 12
    }
  }
}
const expirationDateMasked = Imask(expirationDate, expirationDatePattern)
