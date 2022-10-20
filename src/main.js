import "./css/index.css"
import Imask from "imask"
const ccColorCard1 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path"
)
const ccColorCard2 = document.querySelector(
  ".cc-bg svg > g g:nth-child(2) path"
)
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setTypeCard(type) {
  console.log("type:", type)
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    hiperCard: ["#F22D2D", "#000"],
    default: ["#000", "#FFF"],
  }
  ccColorCard1.setAttribute("fill", colors[type][0])
  ccColorCard2.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setTypeCard = setTypeCard
//security code
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = Imask(securityCode, securityCodePattern)
//card number
securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "123" : code
}

//visa starts with 4 followed by another 15
//^4\{0,15}
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    setTypeCard(foundMask.cardtype)
    return foundMask
  },
}

const cardNumberMasked = Imask(cardNumber, cardNumberPattern)
console.log("cardNumberMasked:", cardNumberMasked)

cardNumberMasked.on("accept", () => {
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(cardNumber) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText =
    cardNumber.length === 0 ? "1234 5678 9012 3456" : cardNumber
}

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: Imask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: Imask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}
const expirationDateMasked = Imask(expirationDate, expirationDatePattern)

expirationDateMasked.on("accept", () => {
  updateExpiration(expirationDateMasked.value)
})

function updateExpiration(ccdate) {
  const ccExpiration = document.querySelector(".cc-expiration .value")

  ccExpiration.innerText = ccdate.length === 0 ? "31/12" : ccdate
}
const addButton = document.querySelector("#add-card")

addButton.addEventListener("click", () => {
  console.log("entrei aqui")
})

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")

cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})
