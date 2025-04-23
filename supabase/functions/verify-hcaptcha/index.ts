
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { token } = await req.json()
    const SECRET_KEY = Deno.env.get('HCAPTCHA_SECRET_KEY')

    if (!token) {
      throw new Error('Token is required')
    }

    if (!SECRET_KEY) {
      throw new Error('HCAPTCHA_SECRET_KEY is not configured')
    }

    const verifyUrl = 'https://api.hcaptcha.com/siteverify'
    const formData = new URLSearchParams()
    formData.append('secret', SECRET_KEY)
    formData.append('response', token)

    const verification = await fetch(verifyUrl, {
      method: 'POST',
      body: formData,
    })

    const result = await verification.json()

    return new Response(
      JSON.stringify({ success: result.success }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      },
    )
  }
})
