import { PrismaClient, QuestionsTag } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        
        const questionsData = [
            {
                question: "Digite pelo menos 3 jogos que você gosta de jogar",
                required: true,
                tag: QuestionsTag.FAVORITE_GAMES
            },
            {
                question: "Qual seu Sistema Operacional?",
                required: true,
                tag: QuestionsTag.OPERATIONAL_SYSTEMS
            },
            {
                question: "Em relação ao idioma do jogo, você prefere:",
                required: true,
                tag: QuestionsTag.GAME_LANGUAGE
            },
            {
                question: "Selecione alguns gêneros de jogos que você gosta",
                required: false,
                tag: QuestionsTag.GENRES
            },
            {
                question: "Selecione algumas categorias de jogos que você gosta",
                required: false,
                tag: QuestionsTag.CATEGORIES
            },
            {
                question: "Quais as principais desenvolvedoras que você gosta?",
                required: false,
                tag: QuestionsTag.PUBLISHERS
            },
            {
                question: "Qual seu estilo de jogo preferido?",
                required: false,
                tag: QuestionsTag.MODE
            },
            {
                question: "Em relação à perspectiva de câmera do jogo, você prefere:",
                required: false,
                tag: QuestionsTag.CAMERA
            },
            {
                question: "Em relação ao estilo de arte do jogo, você prefere:",
                required: false,
                tag: QuestionsTag.STYLE
            },
        ]

        await prisma.questions.deleteMany();
        await prisma.questions.createMany({ data: questionsData });
        const questions = await prisma.questions.findMany();

    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });