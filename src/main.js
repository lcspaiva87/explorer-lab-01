import "./css/index.css"
import IMask from "imask"

const creditCardBgColor01 = document.querySelector(
  ".cc-bg-mask-color-1 ellipse"
)
const creditCardBgColor02 = document.querySelector(
  ".cc-bg-mask-color-2 ellipse"
)
const creditCardBgColor03 = document.querySelector(
  ".cc-bg-mask-color-3 ellipse"
)
const creditCardBgColor04 = document.querySelector(".cc-bg-mask-color-4 path")
const creditCardBgColor05 = document.querySelector(".cc-bg-mask-color-5 path")
const creditCardLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#DFA43B", "#1248FF", "#2051FE", "#244FEA", "#121212"],
    mastercard: ["#F79E1B", "#CC0018", "#EB001B", "#FF334B", "#121212"],
    elo: ["#ef4123", "#00a4e0", "#00bbff", "#4dcfff", "#121212"],
    amex: ["#ffffff", "#00374D", "#005B80", "#0077A6", "#121212"],
    hipercard: ["#822124", "#822124", "#A3292D", "#CC3338", "#121212"],
    diners: ["#1C3163", "#00374D", "#2D4F9E", "#9CB1E3", "#121212"],
    default: ["#ffffff", "#999797", "#5e5e5e", "#424242", "#121212"],
  }

  creditCardBgColor01.setAttribute("fill", colors[type][0])
  creditCardBgColor02.setAttribute("fill", colors[type][1])
  creditCardBgColor03.setAttribute("fill", colors[type][2])
  creditCardBgColor04.setAttribute("fill", colors[type][3])
  creditCardBgColor05.setAttribute("fill", colors[type][4])

  creditCardLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4[0-9]{12}(?:[0-9]{3})?$/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|50(9[0-9][0-9][0-9])|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|05([7-9])|06([0-9])|07([0-9])|08([0-9])|4([0-3][0-9]|8[5-9]|9[0-9])|5([0-9][0-9]|3[0-8])|9([0-6][0-9]|7[0-8])|7([0-2][0-9])|541|700|720|727|901)|65165([2-9])|6516([6-7][0-9])|65500([0-9])|6550([0-5][0-9])|655021|65505([6-7])|6516([8-9][0-9])|65170([0-4]))/,
      cardType: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^3[47][0-9]{13}$/,
      cardType: "amex",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^606282|^3841(?:[0|4|6]{1})0/,
      cardType: "hipercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      cardType: "diners",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const creditCardHolder = document.querySelector(".cc-holder .value")
  creditCardHolder.innerText =
    cardHolder.value.length === 0 ? "SEU NOME AQUI" : cardHolder.value
})

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const creditCardSecurity = document.querySelector(".cc-security .value")

  creditCardSecurity.innerText = code.length === 0 ? "123" : code
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardType
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const creditCardNumber = document.querySelector(".cc-number")
  creditCardNumber.innerText =
    number.length === 0 ? "1234 5678 9012 3456" : number
}

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date) {
  const creditCardExpirationDate = document.querySelector(
    ".cc-expiration .value"
  )

  creditCardExpirationDate.innerText = date.length === 0 ? "00/00" : date
}

function luhnCheckSum(val) {
  let checksum = 0
  let j = 1

  for (let i = val.length - 1; i >= 0; i--) {
    let calc = 0
    calc = Number(val.charAt(i)) * j

    if (calc > 9) {
      checksum = checksum + 1
      calc = calc - 10
    }

    checksum = checksum + calc

    if (j == 1) {
      j = 2
    } else {
      j = 1
    }
  }

  return checksum % 10 == 0
}

function validateCardNumber(number) {
  const regex = new RegExp("^[0-9]{13,19}$")
  if (!regex.test(number)) {
    return false
  }
  return luhnCheckSum(number)
}

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  validateCardNumber(cardNumberMasked.masked.unmaskedValue) === true
    ? alert("Cartão salvo com sucesso!")
    : alert("Cartão inválido!")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})
