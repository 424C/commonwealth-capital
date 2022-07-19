import {
  EmojiHappyIcon,
  ChartSquareBarIcon,
  CursorClickIcon,
  DeviceMobileIcon,
  AdjustmentsIcon,
  SunIcon,
} from "@heroicons/react/outline";

import benefitOneImg from "../public/img/neighbors/1.png";
import benefitTwoImg from "../public/img/teamwork.png";

const benefitOne = {
  image: benefitOneImg,
  title: "The Neighbor Token",
  desc: "Conforms to the ERC721 NFT standard",
  bullets: [
    {
      title: "Be Part of an Inclusive Community",
      desc: "Token holders are the face of our community. Display your neighbor proudly in various media.",
      icon: <EmojiHappyIcon />,
    },
    {
      title: "Creative Rights",
      desc: "Token holders have full commercial and creative rights to their NFT under the cc0 license.",
      icon: <ChartSquareBarIcon />,
    },
    {
      title: "Fully Tradeable",
      desc: "Neighbor tokens are compatible with secondary markets such as OpenSea, or can be exchanged through our in-house decentralized exchange.",
      icon: <CursorClickIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Neighborhood DAO",
  desc: "Community treasury that truly belongs to the people.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Fair & Trustless Governance",
      desc: "Neighbor token holders raise and vote on community proposals.",
      icon: <DeviceMobileIcon />,
    },
    {
      title: "Deploy the Treasury",
      desc: "Holders choose how to deploy treasury funds to best serve the community.",
      icon: <AdjustmentsIcon />,
    },
    {
      title: "Democracy in Action",
      desc: "Equality always rules in the Neighborhood. One neighbor always equals one vote.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
