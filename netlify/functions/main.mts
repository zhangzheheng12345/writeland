import type { Context, Config } from '@netlify/functions'

export const config: Config = {
  path: '/get-anon-key/:passkey'
}

export default async (req: Request, ctx: Context) => {
  const { passkey } = ctx.params
  const correctPasskey = Netlify.env.get('PASSKEY')
  const anon_key = Netlify.env.get('ANON_KEY')
  if(passkey === correctPasskey)
    return new Response(JSON.stringify({
      anon: anon_key
    }))
  return new Response(JSON.stringify({
    anon: 'Wrong Passkey'
  }))
}
