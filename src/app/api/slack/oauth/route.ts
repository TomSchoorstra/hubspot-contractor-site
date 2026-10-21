import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const clientId = process.env.SLACK_CLIENT_ID
  if (!clientId || !process.env.SLACK_CLIENT_SECRET) {
    return NextResponse.redirect(new URL('/hubspot-enablement?error=unavailable', request.url))
  }
  const origin = new URL(request.url).origin
  const redirectUri = `${origin}/api/slack/callback`
  const state = randomBytes(16).toString('hex')

  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'chat:write,incoming-webhook,channels:join',
    redirect_uri: redirectUri,
    state,
  })

  const response = NextResponse.redirect(`https://slack.com/oauth/v2/authorize?${params}`)
  response.cookies.set('slack_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 10, // 10 minuten
    path: '/',
  })

  return response
}
