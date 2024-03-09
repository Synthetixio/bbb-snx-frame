import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
//import { neynar } from 'frog/hubs'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const amount = inputText || buttonValue
  const snxPrice = 21.92 * (1 + 0.01) // snxPrice * 1 + getPremimum()
  const totalSnxBurned = 42069 // getBalance of 0xDEAD
  
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response' && Number(amount) > 0
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
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response' && Number(amount) > 0
            ? `You burned ${amount ? `${amount.toUpperCase()} SNX!` : ''}`
            : '🔥 SNX Buyback & Burn 🔥'}
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 42,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response' && Number(amount) > 0
            ? `You got $${(snxPrice * Number(amount)).toFixed(2)}!`
            : `Buyback price: $${snxPrice.toFixed(2)}\nTotal SNX burned: ${totalSnxBurned}`}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter amount to burn..." />,
      <Button value="burn">BURN SNX</Button>,
      status === 'response' && Number(amount) > 0 && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})
