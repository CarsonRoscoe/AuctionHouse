import styled from "@emotion/styled";
import { CONTRACT_ADDRESSES, NETWORK_ID, APP_TITLE, CURATOR_ID } from '../utils/env-vars'
import { GetStaticProps } from "next";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { AuctionsList } from "../components/AuctionsList";

import {
  FetchStaticData,
  MediaFetchAgent,
  NetworkIDs,
  Networks,
} from "@zoralabs/nft-hooks";

export default function Home({ tokens }: { tokens: any }) {
  return (
    <IndexWrapper>
      <Head />
      <h1>{APP_TITLE}</h1>
      <AuctionsList tokens={tokens} />
    </IndexWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchAgent = new MediaFetchAgent(Networks.RINKEBY);

  console.info(await fetchAgent.loadNFTData('0xD9E08ae6Abc04Ba379cC23F3949C69EEf226A5cf', '0'))

  const contractAddress = CONTRACT_ADDRESSES as string;
  const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    curatorAddress: CURATOR_ID as any,
    collectionAddresses: contractAddress ? contractAddress.split(',') : undefined,
    limit: 100,
    offset: 0,
  });

  console.info('Hit', tokens)

  return {
    props: {
      tokens,
    },
    revalidate: 60,
  };
};

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;