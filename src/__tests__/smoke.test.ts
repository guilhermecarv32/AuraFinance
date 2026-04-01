import { describe, expect, it } from 'vitest'

describe('ambiente de testes', () => {
  it('smoke: vitest + jsdom respondem', () => {
    const root = document.createElement('div')
    root.id = 'vitest-smoke'
    document.body.append(root)
    expect(document.getElementById('vitest-smoke')).not.toBeNull()
    root.remove()
  })
})
