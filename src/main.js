import "./css/index.css"
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
