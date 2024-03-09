import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
//import { neynar } from 'frog/hubs'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', (c) => {
  const { inputText, status } = c
  const amount = Number(inputText)
  const snxPrice = 21.92 * (1 + 0.01) // snxPrice * 1 + getPremimum()
  const totalSnxBurned = 42069 // snx.balanceOf(0xDEAD)

  // TODO: Get actual values from contracts for price, premium & total sent to dead address
  // TODO: Check snx.balanceOf(interactor) >= amount
  // TODO: Check approval/allowance
  // TODO: Invoke txn to TrustedMulticallForwarder -> snxPrice update + processBuyback
  // TODO: Error handling and input validation
  // TODO: Add images & animations

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response' && amount > 0
              ? 'linear-gradient(to right, #0984e3, #4834d4)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: '#74b9ff',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.01337em',
            lineHeight: 1.25,
            marginTop: 25,
            padding: '0 100px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response' && amount > 0
            ? `You burned ${amount} SNX!`
            : '🔥 SNX Buyback & Burn 🔥'}
        </div>
        <div
          style={{
            color: '#efefef',
            fontSize: 42,
            fontStyle: 'normal',
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            marginTop: 25,
            padding: '0 100px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response' && amount > 0
            ? `You got $${(snxPrice * amount).toFixed(2)}!`
            : `Estimated Buyback price: $${snxPrice.toFixed(2)}\nTotal SNX burned: ${totalSnxBurned.toFixed(0)}`}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter amount to burn..." />,
      <Button value="approve">Approve SNX</Button>,
      <Button value="burn">Burn SNX</Button>,
      status === 'response' && amount > 0 && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})
