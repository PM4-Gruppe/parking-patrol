import { gql } from '@apollo/client'

it('The ok query should return true', async () => {
    const mockClient = {
        query: jest.fn().mockResolvedValue({
            data: { ok: true },
            errors: undefined
        })
    }

    const response = await mockClient.query({ query: gql`
            query {
                ok
            }
        `})
    
    expect(response.errors).toBeUndefined()
    expect(response.data.ok).toBe(true)
});