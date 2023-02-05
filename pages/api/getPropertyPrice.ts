// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }
import { JSDOM } from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";
const getPropertyPrice = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestPage = JSON.parse(req.body).input;
  const response = await fetch(requestPage);
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const price = document
    .querySelector("._1gfnqJ3Vtd1z40MlC0MzXu")
    ?.firstChild?.textContent?.replace("£", "");
  const postCode = document
    .querySelector("#mapTitleScrollAnchor")
    ?.textContent?.split(",")
    .pop();

  res.status(200).json({ price, postCode });
};
export default getPropertyPrice;
