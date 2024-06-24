import { NextRequest, NextResponse } from "next/server";

//const { AlgebraicCaptcha } = require("algebraic-captcha");

// async function generateCaptcha() {
//   const algebraicCaptcha = new AlgebraicCaptcha({
//     width: 200,
//     height: 200,
//     background: "#ffffff",
//     noise: 1,
//     minValue: 1,
//     maxValue: 10,
//     operandAmount: 1,
//     operandTypes: ["+", "-"],
//     mode: "formula",
//     targetSymbol: "?",
//   });

//   const { image, answer } = await algebraicCaptcha.generateCaptcha();
//   return { image, answer };
// }
export async function GET(request: NextRequest) {
  //const { image, answer } = await generateCaptcha();
  return NextResponse.json({ name: "Karim" });
}
