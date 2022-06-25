Cypress.Commands.add('setToken', () => {
    cy.request({
        method: 'POST',
        url: '/sessions',
        body: {
            "email": "wgt_tere@hotmail.com",
            "password": "qa-cademy"
        }

    }).then(function (response) {
        expect(response.status).to.eql(200)
        //cy.log(response.body.token)
        Cypress.env('token', response.body.token)

    })

})

Cypress.Commands.add('back2ThePast', () => {
    cy.request({
        method: 'DELETE',
        url: '/back2thepast/62b6fc3e988a94001601802f',
    }).then(function (response) {
        expect(response.status).to.eql(200)
    })

})

Cypress.Commands.add('postCharacter', (payload) => {
    cy.api({
        method: 'POST',
        url: '/characters',
        body: payload,
        headers: {
            Authorization: Cypress.env('token')

        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })

})

Cypress.Commands.add('getCharacters', (payload) => {
    cy.api({
        method: 'GET',
        url: '/characters',
        body: payload,
        headers: {
            Authorization: Cypress.env('token')

        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })

})

Cypress.Commands.add('populateCharacters', (characters) => {
    characters.forEach(function(c) {
        cy.postCharacter(c)

    });

})


Cypress.Commands.add('searchCharacters', (charactersName) => {
    cy.api({
        method: 'GET',
        url: '/characters',
        qs: {name: charactersName},
        body: charactersName,
        headers: {
            Authorization: Cypress.env('token')

        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })

})


Cypress.Commands.add('getCharactersById', function (charactersId)  {
    cy.api({
        method: 'GET',
        url: '/characters/' + charactersId,
        headers: {
            Authorization: Cypress.env('token')

        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })

})


Cypress.Commands.add('deleteCharactersById', function (charactersId)  {
    cy.api({
        method: 'DELETE',
        url: '/characters/' + charactersId,
        headers: {
            Authorization: Cypress.env('token')

        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })

})