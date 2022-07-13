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
