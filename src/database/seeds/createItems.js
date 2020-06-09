
exports.seed = async function (knex) {
  const exists = async ({ title, image }) => {
    const counter = (await knex('items').where({ title, image }).count({ count: '*' }).first()).count
    return counter > 0
  }

  const data = [
    { title: 'Lâmpadas', image: 'lampadas.svg' },
    { title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { title: 'Papeis e Papelão', image: 'papeis-papelao.svg' },
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
    { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' }
  ]
  
  for(item of data) {
    if (!(await exists(item))) {
      console.log(`[SEED] Inserting data: ${item.title}, ${item.image}`)
      await knex('items').insert(item)
    }
  }
}