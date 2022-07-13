export default function handler(req, res) {
  // get the tokenId from the query params
  const tokenId = req.query.tokenId;
  // As all the images are uploaded on github, we can extract the images from github directly.
  const image_url =
    "https://raw.githubusercontent.com/deerchomp/neighbors-assets/main/img/";
  res.status(200).json({
    name: "Neighbor #" + tokenId,
    description: "The Neighborhood is a DAO to fund public goods",
    image: image_url + tokenId + ".png",
  });
}

https://github.com/deerchomp/commonwealth-capital/blob/main/my-app/public/img/neighbors/1.png?raw=true
https://raw.githubusercontent.com/LearnWeb3DAO/NFT-Collection/main/my-app/public/cryptodevs/