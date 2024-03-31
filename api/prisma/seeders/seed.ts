import eventSeeder from './event.seeder'
import exampleSeeder from './example.seeder'
import gameLogSeeder from './game-log.seeder'
import gameStackSeeder from './game-stack.factory'
import gameSeeder from './game.seeder'
import kanjiSeeder from './kanji.seeder'
import prisma from './prism-client'
import stackSeeder from './stack.seeder'
import topicSeeder from './topic.seeder'
import userSeeder from './user.seeder'
import wordSeeder from './word.seeder'

async function seed() {
  const users = await userSeeder()

  const kanjis = await kanjiSeeder()

  const words = await wordSeeder(kanjis)

  await exampleSeeder(words)

  const topics = await topicSeeder()

  const stacks = await stackSeeder(users, words, topics)

  const games = await gameSeeder()

  const gameStacks = await gameStackSeeder(games, stacks)

  await eventSeeder(users, gameStacks)

  await gameLogSeeder(users, gameStacks)
}

seed()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
