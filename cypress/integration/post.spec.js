/// <reference types="cypress"/> 
describe('POST / characters', function () {

    it('Deve cadastrar um personagem', function () {

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira',
            team: ['Vingadores'],
            active: true
        }

        cy.postCharacter(character)
        .then(function (response) {
            expect(response.status).to.eql(201)
            expect(response.body.character_id.length).to.eql(24)
        })
    })

    context('Quando o personagem já existe', () => {

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: ['Vingadores da costa oeste'],
            active: true
        }

        before(() => {
            cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)

            })

        });

        it('não deve cadastrar um personagem duplicado', () => {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')

            })

        })

    })

});



