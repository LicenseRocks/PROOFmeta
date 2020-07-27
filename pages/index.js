import { ExplorerLayout, H4, OutlineButton } from 'rockskit'

const headerRight = (
  <OutlineButton content="Action Button" color="secondary" size="sm" />
);

const sidebar = (
  <>
    <H4 mb={6}>Share this license</H4>
  </>
);

export default function Home() {
  return <ExplorerLayout headerRight={headerRight} sidebar={sidebar}>Welcome</ExplorerLayout>
}
