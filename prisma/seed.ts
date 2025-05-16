import { PrismaClient, QuestionsTag, QuestionsType } from "@prisma/client";
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

function parseStringArray(field: string): string[] {
  if (!field || typeof field !== 'string') return [];
  const matches = field.match(/(['"])(.*?)\1/g);
  return matches ? matches.map(s => s.slice(1, -1)) : [];
}

async function main() {
    try {

        await prisma.answers.deleteMany();
        await prisma.questions.deleteMany();
        
        const questions = [
            {
                question: "Digite pelo menos 3 jogos que você gosta de jogar",
                required: true,
                tag: QuestionsTag.FAVORITE_GAMES,
                type: QuestionsType.INPUT_CHECKBOX,
                min_length: 3,
            },
            {
                question: "Qual seu Sistema Operacional?",
                required: true,
                tag: QuestionsTag.OPERATIONAL_SYSTEMS,
                type: QuestionsType.MULTIPLE_CHECKBOX,
                min_length: 1
            },
            {
                question: "Em relação ao idioma do jogo, você prefere:",
                required: true,
                tag: QuestionsTag.GAME_LANGUAGE,
                type: QuestionsType.SINGLE_CHOICE,
                min_length: 0,
            },
            {
                question: "Selecione alguns gêneros de jogos que você gosta",
                required: false,
                tag: QuestionsTag.GENRES,
                type: QuestionsType.MULTIPLE_CHECKBOX,
                min_length: 0,
            },
            {
                question: "Selecione algumas categorias de jogos que você gosta",
                required: false,
                tag: QuestionsTag.CATEGORIES,
                type: QuestionsType.MULTIPLE_CHECKBOX,
                min_length: 0,
            },
            {
                question: "Quais as principais desenvolvedoras que você gosta?",
                required: false,
                tag: QuestionsTag.PUBLISHERS,
                type: QuestionsType.MULTIPLE_CHECKBOX,
                min_length: 0,
            },
            {
                question: "Qual seu estilo de jogo preferido?",
                required: false,
                tag: QuestionsTag.MODE,
                type: QuestionsType.MULTIPLE_CHECKBOX,
                min_length: 0,
            },
            {
                question: "Em relação à perspectiva de câmera do jogo, você prefere:",
                required: false,
                tag: QuestionsTag.CAMERA,
                type: QuestionsType.MULTIPLE_CHECKBOX,
                min_length: 0,
            },
            {
                question: "Em relação ao estilo de arte do jogo, você prefere gráficos:",
                required: false,
                tag: QuestionsTag.STYLE,
                type: QuestionsType.MULTIPLE_CHECKBOX,
                min_length: 0,
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
            { answer: "Apenas jogos que tenham Português", question_id: languageQuestions.id, value: "Portuguese - Brazil" },
            { answer: "Jogos com qualquer idioma", question_id: languageQuestions.id, value: "" },
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
            { answer: "Realistas", question_id: styleQuestions.id, value: "Realistic | Photorealistic | 3D | Cinematic | Beautiful" },
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
            { answer: "Estratégia", value: "Strategy", question_id: genreQuestion.id },
            { answer: "Jogo com Acesso Antecipado", value: "Early Access", question_id: genreQuestion.id },
            { answer: "Esportes", value: "Sports", question_id: genreQuestion.id },
            { answer: "Corrida", value: "Racing", question_id: genreQuestion.id },
            { answer: "Massively Multiplayer", value: "Massively Multiplayer", question_id: genreQuestion.id },
            { answer: "Free To Play", value: "Free To Play", question_id: genreQuestion.id },
            { answer: "Violência", value: "Violent", question_id: genreQuestion.id },
            { answer: "Sanguentos", value: "Gore", question_id: genreQuestion.id },
            { answer: "Nudez", value: "Nudity", question_id: genreQuestion.id },
            { answer: "Conteúdo Sexual", value: "Sexual Content", question_id: genreQuestion.id },
            { answer: "Educativos", value: "Education", question_id: genreQuestion.id },
            { answer: "Utilitários", value: "Utilities", question_id: genreQuestion.id },
            { answer: "Desenvolvimento de Jogos", value: "Game Development", question_id: genreQuestion.id },
            { answer: "Design & Ilustração", value: "Design & Illustration", question_id: genreQuestion.id },
            { answer: "Filmes", value: "Movie", question_id: genreQuestion.id },
            { answer: "Audio Produção", value: "Audio Production", question_id: genreQuestion.id },
            { answer: "Animação & Modelagem", value: "Animation & Modeling", question_id: genreQuestion.id },
            { answer: "Accounting", value: "Accounting", question_id: genreQuestion.id },
            { answer: "Publicação na Web", value: "Web Publishing", question_id: genreQuestion.id },
            { answer: "Qualquer um", value: "", question_id: genreQuestion.id },
            { answer: "Single-player", value: "Single-player", question_id: categoryQuestion.id },
            { answer: "Compartilhamento de Família", value: "Family Sharing", question_id: categoryQuestion.id },
            { answer: "Conquistas da Steam", value: "Steam Achievements", question_id: categoryQuestion.id },
            { answer: "Steam Cloud", value: "Steam Cloud", question_id: categoryQuestion.id },
            { answer: "Cartas Colecionáveis Steam", value: "Steam Trading Cards", question_id: categoryQuestion.id },
            { answer: "Suporte Total a Controle", value: "Full controller support", question_id: categoryQuestion.id },
            { answer: "Multi-player", value: "Multi-player", question_id: categoryQuestion.id },
            { answer: "Suporte Parcial a Controle", value: "Partial Controller Support", question_id: categoryQuestion.id },
            { answer: "Co-op", value: "Co-op", question_id: categoryQuestion.id },
            { answer: "PvP", value: "PvP", question_id: categoryQuestion.id },
            { answer: "Steam Leaderboards", value: "Steam Leaderboards", question_id: categoryQuestion.id },
            { answer: "Online PvP", value: "Online PvP", question_id: categoryQuestion.id },
            { answer: "Online Co-op", value: "Online Co-op", question_id: categoryQuestion.id },
            { answer: "Remote Play Together", value: "Remote Play Together", question_id: categoryQuestion.id },
            { answer: "Tela Compartilhada", value: "Shared/Split Screen", question_id: categoryQuestion.id },
            { answer: "Remote Play on TV", value: "Remote Play on TV", question_id: categoryQuestion.id },
            { answer: "Steam Workshop", value: "Steam Workshop", question_id: categoryQuestion.id },
            { answer: "Estatísticas", value: "Stats", question_id: categoryQuestion.id },
            { answer: "PvP de Tela Compartilhada", value: "Shared/Split Screen PvP", question_id: categoryQuestion.id },
            { answer: "Co-op de Tela Compartilhada", value: "Shared/Split Screen Co-op", question_id: categoryQuestion.id },
            { answer: "Multiplayer Cross-Plataforma", value: "Cross-Platform Multiplayer", question_id: categoryQuestion.id },
            { answer: "Includes level editor", value: "Includes level editor", question_id: categoryQuestion.id },
            { answer: "Remote Play on Tablet", value: "Remote Play on Tablet", question_id: categoryQuestion.id },
            { answer: "Legendas Disponíveis", value: "Captions available", question_id: categoryQuestion.id },
            { answer: "Suporte a Controle Monitorado", value: "Tracked Controller Support", question_id: categoryQuestion.id },
            { answer: "Remote Play on Phone", value: "Remote Play on Phone", question_id: categoryQuestion.id },
            { answer: "Somente VR", value: "VR Only", question_id: categoryQuestion.id },
            { answer: "Compras no APP", value: "In-App Purchases", question_id: categoryQuestion.id },
            { answer: "Suporte a VR", value: "VR Supported", question_id: categoryQuestion.id },
            { answer: "MMO", value: "MMO", question_id: categoryQuestion.id },
            { answer: "LAN Co-op", value: "LAN Co-op", question_id: categoryQuestion.id },
            { answer: "LAN PvP", value: "LAN PvP", question_id: categoryQuestion.id },
            { answer: "HDR Disponível", value: "HDR available", question_id: categoryQuestion.id },
            { answer: "Comentários Disponíveis", value: "Commentary available", question_id: categoryQuestion.id },
            { answer: "Suporte a VR", value: "VR Support", question_id: categoryQuestion.id },
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

        const filePath = path.join(__dirname, './games.csv');
        const BATCH_SIZE = 1000;
        const results: any[] = [];

        console.time('Importação de games via CSV');

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                for (let i = 0; i < results.length; i += BATCH_SIZE) {
                    const batch = results.slice(i, i + BATCH_SIZE).map(game => ({
                        game_id: parseInt(game.appid),
                        name: game.name,
                        short_description: game.short_description,
                        about_the_game: game.about_the_game,
                        header_image: game.header_image,
                        release_date: game.release_date,
                        supported_languages: parseStringArray(game.supported_languages),
                        full_audio_languages: parseStringArray(game.full_audio_languages),
                        publishers: parseStringArray(game.publishers),
                        categories: parseStringArray(game.categories),
                        genres: parseStringArray(game.genres),
                        screenshots: parseStringArray(game.screenshots),
                        tags: parseStringArray(game.tags),
                        operational_systems: parseStringArray(game.operational_systems),
                    }));

                    try {
                        await prisma.games.createMany({
                            data: batch,
                            skipDuplicates: true,
                        });
                        console.log(`Lote inserido: ${i} até ${i + batch.length}`);
                    } catch (error) {
                        console.error(`Erro no lote ${i} - ${i + batch.length}`, error);
                    }
                }
                console.timeEnd('Importação de games via CSV');
            })

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