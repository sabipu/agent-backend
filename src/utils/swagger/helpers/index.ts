import path from 'path'

type ParamDefinition = {
  type: 'string' | 'number',
  description?: string
}

type HeaderDefinition = {
  type: 'string' | 'number',
  required?: boolean
  description?: string
}

type QueryDefinition = {
  type: 'string' | 'number' | 'date',
  required: boolean
  description?: string
}

type BodyDefinition = {
  type: 'string' | 'number' | 'date' | 'object' | 'array' | 'boolean',
  required: boolean
  properties?: { [key: string]: BodyDefinition },
  items?: BodyDefinition,
  description?: string
}

export type APIDefinition = {
  path: string,
  method: 'post' | 'get' | 'put' | 'delete' | 'path' | 'patch',
  tag: string
  params?: { [key: string]: ParamDefinition },
  headers?: { [key: string]: HeaderDefinition }
  queries?: { [key: string]: QueryDefinition },
  body?: { [key: string]: BodyDefinition },
  authorization?: 'bearer'
}

export function generateSwaggerSpec(apis: APIDefinition[]) {

  if (!apis.length) {
    return { }
  }

  const swaggerSpec: any = { }

  apis.forEach(api => {
    const paramsSpec: any[] = []
    const headerSpec: any[] = []
    const queriesSpec: any[] = []
    let bodySpec: any = { }
    const security: any[] = []

    if (api.authorization && api.authorization === 'bearer') {
      security.push({
        bearerAuth: []
      })
    }

    if (api.params) {
      const keys = Object.keys(api.params)

      keys.forEach(key => {
        paramsSpec.push({
          in: 'path',
          name: key,
          description: api.params && api.params[key]?.description,
          schema: {
            type: api.params && api.params[key]?.type
          },
          required: true
        })
      })
    }

    if (api.headers) {
      const keys = Object.keys(api.headers)

      keys.forEach(key => {
        headerSpec.push({
          in: 'header',
          name: key,
          description: api.headers && api.headers[key]?.description,
          schema: {
            type: api.headers && api.headers[key]?.type
          },
          required: api.headers && !!api.headers[key]?.required ? true : false
        })
      })
    }

    if (api.queries) {
      const keys = Object.keys(api.queries)

      keys.forEach(key => {
        queriesSpec.push({
          in: 'query',
          name: key,
          schema: {
            type: api.queries && api.queries[key].type
          },
          description: api.queries && api.queries[key].description,
          required: api.queries && api.queries[key].required
        })
      })
    }

    if (api.body) {
      const propertiesSpec: any = api.body
      const requiredFields: string[] = []

      const keys = Object.keys(api.body)

      keys.forEach(key => {
        if (api.body && api.body[key].required) {
          requiredFields.push(key)
        }
      })

      bodySpec = {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: propertiesSpec,
              required: requiredFields,
            }
          }
        }
      }
    }

    if (swaggerSpec[api.path]) {
      swaggerSpec[api.path][api.method] = {
        tags: [api.tag],
        security,
        parameters: [
          ...paramsSpec,
          ...queriesSpec,
          ...headerSpec,
        ],
      }

      return
    }

    swaggerSpec[api.path] = {
      [api.method] : {
        tags: [api.tag],
        security,
        parameters: [
          ...paramsSpec,
          ...queriesSpec,
          ...headerSpec
        ],
        requestBody: bodySpec
      }
    }
  })

  return swaggerSpec
}