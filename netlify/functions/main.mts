import type { Context, Config } from '@netlify/functions'

export const config: Config = {
  path: '/get-anon-key/:passkey'
}

export default async (req: Request, ctx: Context) => {
  const { passkey } = ctx.params
  const correctPasskey = Netlify.env.get('PASSKEY')
  const anonKey = Netlify.env.get('ANON_KEY')
  const dbUrl = Netlify.env.get('DB_URL')
  if(passkey === correctPasskey)
    return new Response(JSON.stringify({
      anon: anonKey,
      url: dbUrl
    }))
  return new Response(JSON.stringify({
    anon: 'Wrong Passkey'
  }))
}
