import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { t, Trans } from '@lingui/macro'

import { currencyEquals, WETH } from '@dynamic-amm/sdk'
import { AddRemoveTabs } from 'components/NavigationTabs'
import { MinimalPositionCard } from 'components/PositionCard'
import LiquidityProviderMode from 'components/LiquidityProviderMode'
import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'
import { useCurrencyConvertedToNative } from 'utils/dmm'
import ZapOut from './ZapOut'
import TokenPair from './TokenPair'
import { useDerivedBurnInfo } from 'state/burn/hooks'
import { PageWrapper, Container, TopBar, LiquidityProviderModeWrapper, PoolName } from './styled'
import useMixpanel, { MIXPANEL_TYPE } from 'hooks/useMixpanel'

export default function RemoveLiquidity({
  match: {
    params: { currencyIdA, currencyIdB, pairAddress },
  },
}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string; pairAddress: string }>) {
  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined]
  const { chainId } = useActiveWeb3React()

  const nativeA = useCurrencyConvertedToNative(currencyA)
  const nativeB = useCurrencyConvertedToNative(currencyB)

  const { pair } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined, pairAddress)

  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(WETH[chainId], currencyA)) ||
        (currencyB && currencyEquals(WETH[chainId], currencyB))),
  )

  const [activeTab, setActiveTab] = useState(0)
  const { mixpanelHandler } = useMixpanel()
  useEffect(() => {
    mixpanelHandler(MIXPANEL_TYPE.REMOVE_LIQUIDITY_INITIATED, { token_1: nativeA?.symbol, token_2: nativeB?.symbol })
  }, [])

  return (
    <>
      <PageWrapper>
        <Container>
          <AddRemoveTabs creating={false} adding={false} />

          <TopBar>
            <LiquidityProviderModeWrapper>
              <LiquidityProviderMode
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                singleTokenInfo={t`We will automatically remove your liquidity and convert it into your desired token (either token from the token pair), all in a single transaction.`}
              />
            </LiquidityProviderModeWrapper>
            <PoolName>
              {nativeA?.symbol} - {nativeB?.symbol} <Trans>pool</Trans>
            </PoolName>
          </TopBar>

          {activeTab === 0 ? (
            <TokenPair currencyIdA={currencyIdA} currencyIdB={currencyIdB} pairAddress={pairAddress} />
          ) : (
            <ZapOut currencyIdA={currencyIdA} currencyIdB={currencyIdB} pairAddress={pairAddress} />
          )}
        </Container>

        {pair ? (
          <Container style={{ marginTop: '24px', padding: '0' }}>
            <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
          </Container>
        ) : null}
      </PageWrapper>
    </>
  )
}
