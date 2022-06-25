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
    context('Validar os campos obrigatórios para o cadastro do personagem', () => {
        it('Validar a obrigatoriedade do nome', () => {
            const character = {
                alias: 'Homem de Ferro',
                team: ['Vingadores'],
                active: true,
            }

        });

        it('Validar a obrigatoriedade do alias', () => {
            const character = {
                name: 'Tony Stark',
                team: ['Vingadores'],
                active: true,
            };

            cy.postCharacter(character)
                .then((response) => {
                    expect(response.status).to.eql(400);
                    expect(response.body.validation.body.message).to.eql('\"alias\" is required');
                });
        });

        it('Validar a obrigatoriedade do team', () => {
            const character = {
                name: 'Tony Stark',
                alias: 'Homem de Ferro',
                active: true,
            };

            cy.postCharacter(character)
                .then((response) => {
                    expect(response.status).to.eql(400);
                    expect(response.body.validation.body.message).to.eql('\"team\" is required');
                });
        });

        it('Validar a obrigatoriedade do active', () => {
            const character = {
                name: 'Tony Stark',
                alias: 'Homem de Ferro',
                team: ['Vingadores'],
            };

            cy.postCharacter(character)
                .then((response) => {
                    expect(response.status).to.eql(400);
                    expect(response.body.validation.body.message).to.eql('\"active\" is required');
                });
        });
    });
});






