import { PrismaClient, QuestionsTag } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {

        await prisma.answers.deleteMany();
        await prisma.questions.deleteMany();
        
        const questions = [
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
                question: "Em relação ao estilo de arte do jogo, você prefere gráficos:",
                required: false,
                tag: QuestionsTag.STYLE
            },
        ]
        
        await prisma.questions.createMany({ data: questions });

        const cameraQuestions = await prisma.questions.findFirst({ where: { tag: QuestionsTag.CAMERA } });
        const osQuestions = await prisma.questions.findFirst({ where: { tag: QuestionsTag.OPERATIONAL_SYSTEMS } });
        const languageQuestions = await prisma.questions.findFirst({ where: { tag: QuestionsTag.GAME_LANGUAGE } });
        const modeQuestions = await prisma.questions.findFirst({ where: { tag: QuestionsTag.MODE } });
        const styleQuestions = await prisma.questions.findFirst({ where: { tag: QuestionsTag.STYLE } });
        const genreQuestion = await prisma.questions.findFirst({ where: { tag: QuestionsTag.GENRES } });
        const categoryQuestion = await prisma.questions.findFirst({ where: { tag: QuestionsTag.CATEGORIES } });
        const publisherQuestion = await prisma.questions.findFirst({ where: { tag: QuestionsTag.PUBLISHERS } });

        if (!cameraQuestions || !osQuestions || !languageQuestions || !modeQuestions || !styleQuestions || !genreQuestion || !categoryQuestion || !publisherQuestion) 
            throw new Error("Error: One or more questions not found in the database.");

        const aswersData = [
            { answer: "Windows", question_id: osQuestions.id, value: "windows" },
            { answer: "MacOS", question_id: osQuestions.id, value: "mac" },
            { answer: "Linux", question_id: osQuestions.id, value: "linux" },
            { answer: "Apenas jogos em Português", question_id: languageQuestions.id, value: "Portuguese - Brazil" },
            { answer: "Qualquer idioma", question_id: languageQuestions.id, value: "" },
            { answer: "Single Player", question_id: modeQuestions.id, value: "Singleplayer | Single-player" },
            { answer: "Multi Player", question_id: modeQuestions.id, value: "Multiplayer | Local Multiplayer | Multi-player | Cross-Platform Multiplayer" },
            { answer: "PvP", question_id: modeQuestions.id, value: "PvP | Online PvP | Shared/Split Screen PvP | LAN PvP" },
            { answer: "COOP", question_id: modeQuestions.id, value: "Co-op | Online Co-Op | Local Co-Op | Shared/Split Screen Co-op" },
            { answer: "MMO", question_id: modeQuestions.id, value: "MMO" },
            { answer: "Qualquer um", question_id: modeQuestions.id, value: "" },
            { answer: "Primeira pessoa", question_id: cameraQuestions.id, value: "First-Person | FPS" },
            { answer: "Terceira pessoa", question_id: cameraQuestions.id, value: "Third Person | Third-Person Shooter" },
            { answer: "Top Down", question_id: cameraQuestions.id, value: "Top-Down | Top-Down Shooter" },
            { answer: "Isométrica", question_id: cameraQuestions.id, value: "Isometric" },
            { answer: "2D", question_id: cameraQuestions.id, value: "2D | 2D Platformer | 2D Fighter" },
            { answer: "3D", question_id: cameraQuestions.id, value: "3D | 3D Platformer | 3D Fighter" },
            { answer: "VR", question_id: cameraQuestions.id, value: "VR" },
            { answer: "Qualquer uma", question_id: cameraQuestions.id, value: "" },
            { answer: "Realistas", question_id: styleQuestions.id, value: "Realistic | Photorealistic | 3D | Cinematic| Beautiful" },
            { answer: "Pixelados / Retrô", question_id: styleQuestions.id, value: "Pixel Graphics | Retro | Old School | 2D | 2.5D" },
            { answer: "Estilizados / Cartunescos", question_id: styleQuestions.id, value: "Stylized | Cartoony | Colorful | Anime | Hand-drawn | Comic Book" },
            { answer: "Minimalista", question_id: styleQuestions.id, value: "Minimalist | Abstract | Voxel | Low Poly" },
            { answer: "Surreais / Artísticos", question_id: styleQuestions.id, value: "Surreal | Fantasy | Dark" },
            { answer: "Qualquer um", question_id: styleQuestions.id, value: "" },
            { answer: "Indie", value: "Indie", question_id: genreQuestion.id },
            { answer: "Adventure", value: "Adventure", question_id: genreQuestion.id },
            { answer: "Action", value: "Action", question_id: genreQuestion.id },
            { answer: "Casual", value: "Casual", question_id: genreQuestion.id },
            { answer: "Simulation", value: "Simulation", question_id: genreQuestion.id },
            { answer: "RPG", value: "RPG", question_id: genreQuestion.id },
            { answer: "Strategy", value: "Strategy", question_id: genreQuestion.id },
            { answer: "Early Access", value: "Early Access", question_id: genreQuestion.id },
            { answer: "Sports", value: "Sports", question_id: genreQuestion.id },
            { answer: "Racing", value: "Racing", question_id: genreQuestion.id },
            { answer: "Massively Multiplayer", value: "Massively Multiplayer", question_id: genreQuestion.id },
            { answer: "Free To Play", value: "Free To Play", question_id: genreQuestion.id },
            { answer: "Violent", value: "Violent", question_id: genreQuestion.id },
            { answer: "Gore", value: "Gore", question_id: genreQuestion.id },
            { answer: "Nudity", value: "Nudity", question_id: genreQuestion.id },
            { answer: "Sexual Content", value: "Sexual Content", question_id: genreQuestion.id },
            { answer: "Education", value: "Education", question_id: genreQuestion.id },
            { answer: "Utilities", value: "Utilities", question_id: genreQuestion.id },
            { answer: "Game Development", value: "Game Development", question_id: genreQuestion.id },
            { answer: "Design & Illustration", value: "Design & Illustration", question_id: genreQuestion.id },
            { answer: "Movie", value: "Movie", question_id: genreQuestion.id },
            { answer: "Audio Production", value: "Audio Production", question_id: genreQuestion.id },
            { answer: "Animation & Modeling", value: "Animation & Modeling", question_id: genreQuestion.id },
            { answer: "Accounting", value: "Accounting", question_id: genreQuestion.id },
            { answer: "Web Publishing", value: "Web Publishing", question_id: genreQuestion.id },
            { answer: "Qualquer um", value: "", question_id: genreQuestion.id },
            { answer: "Single-player", value: "Single-player", question_id: categoryQuestion.id },
            { answer: "Family Sharing", value: "Family Sharing", question_id: categoryQuestion.id },
            { answer: "Steam Achievements", value: "Steam Achievements", question_id: categoryQuestion.id },
            { answer: "Steam Cloud", value: "Steam Cloud", question_id: categoryQuestion.id },
            { answer: "Steam Trading Cards", value: "Steam Trading Cards", question_id: categoryQuestion.id },
            { answer: "Full controller support", value: "Full controller support", question_id: categoryQuestion.id },
            { answer: "Multi-player", value: "Multi-player", question_id: categoryQuestion.id },
            { answer: "Partial Controller Support", value: "Partial Controller Support", question_id: categoryQuestion.id },
            { answer: "Co-op", value: "Co-op", question_id: categoryQuestion.id },
            { answer: "PvP", value: "PvP", question_id: categoryQuestion.id },
            { answer: "Steam Leaderboards", value: "Steam Leaderboards", question_id: categoryQuestion.id },
            { answer: "Online PvP", value: "Online PvP", question_id: categoryQuestion.id },
            { answer: "Online Co-op", value: "Online Co-op", question_id: categoryQuestion.id },
            { answer: "Remote Play Together", value: "Remote Play Together", question_id: categoryQuestion.id },
            { answer: "Shared/Split Screen", value: "Shared/Split Screen", question_id: categoryQuestion.id },
            { answer: "Remote Play on TV", value: "Remote Play on TV", question_id: categoryQuestion.id },
            { answer: "Steam Workshop", value: "Steam Workshop", question_id: categoryQuestion.id },
            { answer: "Stats", value: "Stats", question_id: categoryQuestion.id },
            { answer: "Shared/Split Screen PvP", value: "Shared/Split Screen PvP", question_id: categoryQuestion.id },
            { answer: "Shared/Split Screen Co-op", value: "Shared/Split Screen Co-op", question_id: categoryQuestion.id },
            { answer: "Cross-Platform Multiplayer", value: "Cross-Platform Multiplayer", question_id: categoryQuestion.id },
            { answer: "Includes level editor", value: "Includes level editor", question_id: categoryQuestion.id },
            { answer: "Remote Play on Tablet", value: "Remote Play on Tablet", question_id: categoryQuestion.id },
            { answer: "Captions available", value: "Captions available", question_id: categoryQuestion.id },
            { answer: "Tracked Controller Support", value: "Tracked Controller Support", question_id: categoryQuestion.id },
            { answer: "Remote Play on Phone", value: "Remote Play on Phone", question_id: categoryQuestion.id },
            { answer: "VR Only", value: "VR Only", question_id: categoryQuestion.id },
            { answer: "In-App Purchases", value: "In-App Purchases", question_id: categoryQuestion.id },
            { answer: "VR Supported", value: "VR Supported", question_id: categoryQuestion.id },
            { answer: "MMO", value: "MMO", question_id: categoryQuestion.id },
            { answer: "LAN Co-op", value: "LAN Co-op", question_id: categoryQuestion.id },
            { answer: "LAN PvP", value: "LAN PvP", question_id: categoryQuestion.id },
            { answer: "HDR available", value: "HDR available", question_id: categoryQuestion.id },
            { answer: "Commentary available", value: "Commentary available", question_id: categoryQuestion.id },
            { answer: "VR Support", value: "VR Support", question_id: categoryQuestion.id },
            { answer: "Valve Anti-Cheat enabled", value: "Valve Anti-Cheat enabled", question_id: categoryQuestion.id },
            { answer: "Steam Turn Notifications", value: "Steam Turn Notifications", question_id: categoryQuestion.id },
            { answer: "SteamVR Collectibles", value: "SteamVR Collectibles", question_id: categoryQuestion.id },
            { answer: "Steam Timeline", value: "Steam Timeline", question_id: categoryQuestion.id },
            { answer: "Includes Source SDK", value: "Includes Source SDK", question_id: categoryQuestion.id },
            { answer: "Qualquer um", value: "", question_id: categoryQuestion.id },
            { answer: "THQ Nordic", value: "THQ Nordic", question_id: publisherQuestion.id },
            { answer: "Square Enix", value: "Square Enix", question_id: publisherQuestion.id },
            { answer: "Devolver Digital", value: "Devolver Digital", question_id: publisherQuestion.id },
            { answer: "SEGA", value: "SEGA", question_id: publisherQuestion.id },
            { answer: "Electronic Arts", value: "Electronic Arts", question_id: publisherQuestion.id },
            { answer: "Ubisoft", value: "Ubisoft", question_id: publisherQuestion.id },
            { answer: "PlayWay", value: "PlayWay S.A", question_id: publisherQuestion.id },
            { answer: "Koei Tecmo Games", value: "KOEI TECMO GAMES CO., LTD", question_id: publisherQuestion.id },
            { answer: "Tiny Build", value: "tinyBuild", question_id: publisherQuestion.id },
            { answer: "Focus Home", value: "Focus Entertainment", question_id: publisherQuestion.id },
            { answer: "Bandai Namco", value: "BANDAI NAMCO Entertainment", question_id: publisherQuestion.id },
            { answer: "2K Games", value: "2K", question_id: publisherQuestion.id },
            { answer: "Activision", value: "Activision", question_id: publisherQuestion.id },
            { answer: "Disney", value: "Disney", question_id: publisherQuestion.id },
            { answer: "Bethesda", value: "Bethesda Softworks", question_id: publisherQuestion.id },
            { answer: "505 Games", value: "505 Games", question_id: publisherQuestion.id },
            { answer: "CAPCOM", value: "CAPCOM Co., Ltd.", question_id: publisherQuestion.id },
            { answer: "KONAMI", value: "KONAMI", question_id: publisherQuestion.id },
            { answer: "PlayStation Studios", value: "PlayStation Publishing LLC", question_id: publisherQuestion.id },
            { answer: "Xbox Studios", value: "Xbox Game Studios", question_id: publisherQuestion.id },
            { answer: "Crystal Dynamics", value: "Crystal Dynamics", question_id: publisherQuestion.id },
            { answer: "Valve", value: "Valve", question_id: publisherQuestion.id },
            { answer: "Rockstar", value: "Rockstar Games", question_id: publisherQuestion.id },
            { answer: "From Software", value: "FromSoftware, Inc.", question_id: publisherQuestion.id },
            { answer: "CD Projekt Red", value: "CD PROJEKT RED", question_id: publisherQuestion.id },
            { answer: "Qualquer um", value: "", question_id: publisherQuestion.id }
        ];

        await prisma.answers.createMany({ data: aswersData });

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